import {Injectable} from "@angular/core";
import {Http, Headers, RequestOptions} from "@angular/http";
import {PredicateType} from "../../model/predicates/predicateTypes";
import 'rxjs/add/operator/map';
import {Predicate} from "../../model/predicates/predicate";

@Injectable()
export class MetricsService {

    constructor(private http: Http) { }

    calculateMetric(predicate: Predicate) {
        console.log(JSON.stringify(predicate.toJson()));
        return {};
    }


    getAllShallowMetricsList() {
        return [
            { title: 'My Metric', type: 'regular', lastResult: '4123', id:'2r3f4jnvl4dsld' },
            { title: 'Churn Risk', type: 'regular', lastResult: '13%', id:'2r3f4jnvl4dsld' },
            { title: 'Containment After 30 Days', type: 'regular', lastResult: '32%', id: '49sjf0vdn3p3'  },
            { title: 'Churn Rate In Decline?', type: 'regular', lastResult: 'true', id: '49sjf0vdn3p3'  },
            { title: 'My Metric 3', type: 'regular', lastResult: '2.234', id: '99234099239'  },
            { title: 'Spread Example',
                type: 'spread',
                spreadBy: 'Age',
                lastResult: {
                    numOfEntities: 4,
                    spread: {
                        "23": 1,
                        "17": 1,
                        "19": 2,
                        "14": 34,
                        "67": 2,
                        "15": 44
                    }
                },
                id: 'spread-example'
            },
            { title: 'Spread Example 2',
                type: 'spread',
                spreadBy: 'Country',
                lastResult: {
                    numOfEntities: 4,
                    spread: {
                        "Israel": 1,
                        "USA": 1,
                        "France": 2
                    }
                },
                id: 'spread-example-2'
            }
        ]
    }

    getMetricById(id) {
        return {
            type: 'regular',
            spreadBy: undefined,
            title: 'My Metric',
            request: '',
            lastResult: '40',
            lastResultDate: '',
            id: '9vss234fs0sdf99239',
            segments: [
                {
                    predicates: [
                        { type: PredicateType.lessThen, key: 'siblings', value: { type: PredicateType.intAttr,  value: 5 }},
                        { type: PredicateType.equals, key: 'userName', value: { type: PredicateType.strAttr,  value: 'BlaBla' } },
                        { type: PredicateType.greaterThen, key: 'id', value: { type: PredicateType.id,  value: '2342342325' } },
                        { type: PredicateType.date, key: undefined, value: {type: undefined, value: undefined },
                            first: {
                                date: {
                                    year: 2017,
                                    month: 3,
                                    day: 12
                                }
                            },
                            second: {
                                date: {
                                    year: 2017,
                                    month: 6,
                                    day: 22
                                }
                            }
                        }
                    ],
                    operator: PredicateType.and
                },
                {
                    predicates: [
                        { type: PredicateType.lessThen, key: 'siblings', value: { type: PredicateType.intAttr,  value: 5 }},
                        { type: PredicateType.equals, key: 'userName', value: { type: PredicateType.strAttr,  value: 'vlalba' } },
                        { type: PredicateType.greaterThen, key: 'id', value: { type: PredicateType.id,  value: '2342342325' } }
                    ],
                    operator: PredicateType.or
                }
            ],
            opsBetweenSegments: [PredicateType.and]
        };
    }

    getDefaultMetric() {
        return {
            type: 'regular',
            spreadBy: undefined,
            title: 'Enter Your Metric Name Here',
            request: '',
            lastResult: '',
            lastResultDate: '',
            id: '99234099fg44f343239', //generate ID here
            segments:
                [
                    {
                        predicates: [
                            {type: undefined, key: undefined, value: {type: undefined, value: undefined} }
                        ],
                        operator: PredicateType.or
                    }
                ],
            opsBetweenSegments: []
        };
    }

}