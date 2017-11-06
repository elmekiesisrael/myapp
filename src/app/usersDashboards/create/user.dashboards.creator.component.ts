import {Component, OnInit} from '@angular/core'
import {AttributesAndPredicatesService} from "../../services/userAttributesService/attributesAndPredicatesService";



@Component({
    selector: 'users-dashboard-creator',
    moduleId: module.id,
    templateUrl: 'user.dashboards.creator.component.html',
    styleUrls: ['user.dashboards.creator.component.css']
})



export class UsersDashboardCreatorComponent implements OnInit {

    private predicates;
    private attributes;
    private userAttributes;


    constructor(private attributesAndPredicatesService: AttributesAndPredicatesService) {}

    ngOnInit() {
        let all = this.attributesAndPredicatesService.getAttributesAndPredicatesTypes();
        this.predicates = all.predicates;
        this.attributes = all.attributes;
        this.userAttributes = this.attributesAndPredicatesService.getUserAttributes();
    }




}