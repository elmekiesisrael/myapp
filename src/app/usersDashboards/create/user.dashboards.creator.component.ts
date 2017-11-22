import {Component, OnInit, Input} from '@angular/core'
import {AttributesAndPredicatesService} from "../../services/userAttributesService/attributesAndPredicatesService";
import {PredicateFactory} from "../../model/predicates/predicateFactory";
import {PredicateType} from "../../model/predicates/predicateTypes";
import {MetricsService} from "../../services/metricsService/metricsService";
import {ActivatedRoute} from "@angular/router";
import {IMyDpOptions, IMyDateModel, IMyDate} from "mydatepicker";
import {SpreadMetric} from "../../model/predicates/spreadMetric";
import {Predicate} from "../../model/predicates/predicate";


// ------------------------------- Inner model representing the metric for UI purposes ----------------------------//
export interface IMetric {
    type: string,
    spreadBy: string,
    title: string,
    id: string,
    request: string,
    lastResultDate: string,
    lastResult: string,
    segments: ISegment[],
    opsBetweenSegments: PredicateType[]
}

export interface IPredicate {
    type: PredicateType,
    key: string,
    value: IAttribute
}

export interface IAttribute {
    type: PredicateType,
    value: any
}

export interface IDatePredicate extends IPredicate {
    first: IMyDate,
    second: IMyDate
}


export interface ISegment {
    predicates: IPredicate[],
    operator: PredicateType
}

// jQuery for the popup message.
declare let $:any;


@Component({
    selector: 'users-dashboard-creator',
    templateUrl: 'user.dashboards.creator.component.html',
    styleUrls: ['user.dashboards.creator.component.css']
})

export class UsersDashboardCreatorComponent implements OnInit {
    @Input()
    private dashboardId: string;
    private metric: IMetric;
    private isCalculating: boolean;
    private showResults: boolean;
    private padding: number;
    private metricType: string;
    private metricSpreadBy: string;


    private attributesList;
    private predicateTypes;
    private operationsList;

    // Pre-calculated for convenience
    private attributesAndPredicatesTypesMap;


    public myDatePickerOptions: IMyDpOptions = {
        // other options...
        dateFormat: 'dd/mm/yyyy',
    };

    constructor(private route: ActivatedRoute,
                private attributesService: AttributesAndPredicatesService,
                private metricsService: MetricsService)
    {}


    ngOnInit() {
        this.isCalculating = false;
        this.showResults = false;
        this.metricType = 'regular';
        this.attributesList = this.attributesService.getUserAttributes();
        this.operationsList = PredicateFactory.getOperations();
        this.predicateTypes = PredicateFactory.getAllPredicateTypes();
        this.padding = 0;

        this.attributesAndPredicatesTypesMap = {};

        // Create a mapping between attributes (field names) to their possible predicate types.
        // I.e. If a field is string, we will only show the 'Equals' and 'Is Not' predicates.
        // If int then 'Greater then', 'Less Then' etc...
        this.attributesList.map((attr) => {
            this.attributesAndPredicatesTypesMap[attr.name] = PredicateFactory.getPredicatesByType(attr.type)
        });


        // If we were routed here using an id, fetch the metric from the BE by that id.
        if (this.route.params['value'].id) {
            this.metric = this.metricsService.getMetricById(this.dashboardId);
        }

        // If not routed here by id, or fetch failed, use the empty default metric.
        if (!this.metric) {
            this.metric = this.metricsService.getDefaultMetric();
        }
    }

    removePredicate(segmentId, predicateId) {
        this.metric.segments[segmentId].predicates.splice(predicateId, 1);
    }

    removeSegment(segmentId) {
        this.metric.segments.splice(segmentId + 1, 1);
        this.metric.opsBetweenSegments.splice(segmentId, 1);
    }

    /**
     * Create a new segment.
     * @param segmentId - Where to insert it.
     */
    addSegment(segmentId) {
        let newSegment: ISegment = {
            predicates: [],
            operator: PredicateType.and
        };

        this.metric.segments.splice(segmentId + 1, 0, newSegment);
        this.metric.opsBetweenSegments.push(PredicateType.and);
        this.addPredicate(segmentId + 1, 0);
    }

    /**
     * Add additional predicate. This is done when clicking the '+' button.
     * @param segmentId - Segment index to add the predicate to
     * @param predicateId - The predicate index. Where to insert it inside the segment.
     */
    addPredicate(segmentId, predicateId) {
        let newPredicate: IPredicate = {
            type: undefined,
            key: undefined,
            value: {
                type: undefined,
                value: undefined
            }
        };

        this.metric.segments[segmentId].predicates.splice(predicateId + 1, 0, newPredicate);
    }

    /**
     * Calculation:
     * 1. Validate that the query is valid.
     * 2. Start 'calculating...' animation.
     * 3. Send query to BE and wait for results.
     * 4. Display Results.
     */
    calculate() {
        if (this.isQueryValid()) {
            this.showResults = false;
            this.isCalculating = true;
            let req: Predicate = this.calculateAllSegments(0);
            let res;
            if (this.metricType === 'regular') {
                this.metricsService.calculateMetric(req);
                console.log(this.metric);
            }

            if (this.metricType === 'spread') {
                let spreadMetric = new SpreadMetric(this.metricSpreadBy, req);
                this.metricsService.calculateMetric(spreadMetric);
                console.log(this.metric);
            }

            // if (res) {
            //     setTimeout(() => this.doneCalculating(), 3000);
            // } else {
            //     this.showMsg('danger', 'Failed Creating Dashboard!');
            // }
        }
    }

    /**
     * When done calculation and results are back from the BE,
     * remove 'calculating...' animation and show results.
     */
    doneCalculating() {
        this.isCalculating = false;
        this.showResults = true;
    }

    /**
     * Calculate all segments. Build a predicate that contains all other segments
     * with the correct and / or operators between them.
     * This is done recursively.
     */
    calculateAllSegments(index): Predicate {
        let length = this.metric.opsBetweenSegments.length;
        if (length === 0) {
            return this.calculateSegment(this.metric.segments[index], 0);
        }

        if (length - index === 1) {
            return PredicateFactory.getLogicalOperatorPredicate(
                this.metric.opsBetweenSegments[index],
                this.calculateSegment(this.metric.segments[index], 0),
                this.calculateSegment(this.metric.segments[index + 1], 0)
            )
        }

        if (length - index > 1) {
            return PredicateFactory.getLogicalOperatorPredicate(
                this.metric.opsBetweenSegments[index],
                this.calculateSegment(this.metric.segments[index], 0),
                this.calculateAllSegments(index + 1)
            )
        }
    }

    /**
     * Calculate an entire segment. Build a predicate that contains all other predicates in the
     * segment with the correct and / or operators.
     * This is done recursively.
     */
    calculateSegment(segment, index): Predicate {
        console.log("Calculating segment " + index);

        let length = segment.predicates.length;
        if (length - index > 2) {

            return PredicateFactory.getLogicalOperatorPredicate(
                segment.operator,
                this.createPredicateFromEntry(segment.predicates[index]),
                this.calculateSegment(segment, index + 1)
            );
        }

        if (length - index == 2) {
            return PredicateFactory.getLogicalOperatorPredicate(
                segment.operator,
                this.createPredicateFromEntry(segment.predicates[index]),
                this.createPredicateFromEntry(segment.predicates[index + 1])
            );
        }

        if (length === 1) {
            return this.createPredicateFromEntry(segment.predicates[index]);
        }
    }


    /**
     * Create a predicate object from a given entry in the query (A IPredicate object)
     * @param entry
     * @returns {Predicate}
     */
    createPredicateFromEntry(entry): Predicate {
        return PredicateFactory.getPredicate(
            entry.type,
            entry.key,
            PredicateFactory.getAttribute(entry.value.type, entry.value.value),
            this.dateObjectToNumber(entry.first), // Special Case I - Date Attribute - pass first and second
            this.dateObjectToNumber(entry.second),
            entry.value.value // Special Case II - ID attribute - pass ID directly
        );
    }

    /**
     * Show this message when dashboard was successfully saved.
     */
    showSaveDashboardNotification(){
        let message = "The Metric <b>" + this.metric.title + "</b> Was Created Successfully.";
        this.showMsg('success', message);
    }


    /**
     * Display a popup message
     * @param status - one of these string values: ['','info','success','warning','danger'];
     * @param message
     */
    showMsg(status, message) {
       // var type = ['','info','success','warning','danger'];

        let icon = 'ti-check';
        if (status === 'danger') {
            icon = 'ti-na';
        }

        $.notify({
            icon: icon,
            message: message
        },{
            type: status,
            timer: 5000,
            placement: {
                from: 'top',
                align: 'center'
            }
        });
    }


    /**
     * Validate that the entire query is valid.
     * Go over all segments and on every predicate in them and check.
     * @returns {boolean} - valid query or not.
     */
    isQueryValid() {
        if (!this.metric.title || this.metric.title === '') {
            this.showMsg('danger', "Dashboard Name Cannot Be Empty.");
            return false;
        }

        for (let i = 0; i < this.metric.segments.length; i++) {
            for (let j = 0; j < this.metric.segments[i].predicates.length; j++) {

                let predicate = this.metric.segments[i].predicates[j];

                // Check that attribute was selected
                if (!predicate.key) {
                    this.showMsg('danger', 'One or more of the attributes are empty.');
                    return false;
                }

                // Check that predicate type was selected
                if (!predicate.type) {
                    this.showMsg('danger', 'One or more of the predicates are empty.');
                    return false;
                }

                // If 'Any' was select -> No input to check.
                if (predicate.type === PredicateType.true) {
                    return true;
                }


                // If Date was selected
                if (predicate.type === PredicateType.date) {
                    let datePredicate = <IDatePredicate>predicate;
                    if (datePredicate.first.year === 0 || datePredicate.second.year === 0) {
                        this.showMsg('danger', 'Missing one or more of the values of attribute <b>' + predicate.key + '</b>.');
                        return false;
                    }
                } else {
                    // Regular type check
                    if (!this.isTypeMatchingValue(predicate)) {
                        return false;
                    }
                }
            }
        }
        return true;
    }


    /**
     * Validate that the predicate's value object is correct. I.e. that the value
     * matches its type. If not, return an error message
     */
    isTypeMatchingValue(predicate) {
        let type = predicate.value.type;
        let value = predicate.value.value;


        if ((type === PredicateType.strAttr && typeof value !== 'string') || value === '') {
            this.showMsg('danger', 'Missing <b>text</b> value');
            return false;
        }

        if ((type === PredicateType.intAttr || type === PredicateType.floatAttr) && isNaN(parseInt(value))) {
            this.showMsg('danger', 'Missing <b>numerical</b> value');
            return false;
        }

        if (type === PredicateType.boolAttr && typeof value !== 'boolean') {
            this.showMsg('danger', 'Missing <b>boolean</b> value');
            return false;
        }

        return true;
    }


    /**
     * On date picker date change event, set the date to the relevant date predicate
     */
    onDateChanged(event: IMyDateModel, i: number, j: number, first: boolean) {
        let datePredicate: IDatePredicate = <IDatePredicate>this.metric.segments[i].predicates[j];
        if (first) {
            datePredicate.first = event.date;
        } else {
            datePredicate.second = event.date;
        }
    }

    /**
     * Get date object from the date picker and transform it to dateId in the format yyyyMMdd
     */
    dateObjectToNumber(dateObject) {
        console.log(this.metric);
        if (dateObject) {
            let res = dateObject.year * 10000;
            res += dateObject.month * 100;
            res += dateObject.day;

            return res;
        }
    }


    getPredicatesByAttributeName(attrName) {
        if (attrName) {
            return this.attributesAndPredicatesTypesMap[attrName];
        } else {
            return [];
        }
    }

    getInputTypeByKey(i, j) {
        let keyType;
        this.attributesList.forEach((attr) => {
            if (attr.name === this.metric.segments[i].predicates[j].key) {
                keyType = attr.type;
            }
        });

        if (keyType) {
            this.metric.segments[i].predicates[j].value.type = keyType;
            if (keyType === PredicateType.id || keyType === PredicateType.strAttr) {
                return 'text';
            } else {
                return 'number';
            }
        }
    }
}