import {Component, OnInit} from '@angular/core'
import {AttributesAndPredicatesService} from "../services/userAttributesService/attributesAndPredicatesService";

declare interface QuerySegment {
    attributeName: string,
    attributeValue: string
    logicalOperator: string
}


@Component({
    selector: 'query-segment',
    moduleId: module.id,
    templateUrl: 'query.segment.component.html',
    styleUrls: ['query.segment.component.css']
})
export class QuerySegmentComponent {//implements OnInit {
    // constructor(private userAttributesService: AttributesAndPredicatesService) {}
    //
    // ngOnInit() {
    //     this.attributesList = this.userAttributesService.getAttributesAndPredicates();
    // }
}