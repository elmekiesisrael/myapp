import { Component, OnInit } from '@angular/core';
import {DashboardsService} from "../../services/dashboardsService/dashboardsService";


@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'user.dashboards.getter.component.html'
})

export class UserDashboards implements OnInit {
    public dashboards: any;


    private pathToCreatorComponent: string;

    constructor(private dashboardsService: DashboardsService) {}

    ngOnInit() {
        this.pathToCreatorComponent = "/users/dashboards/create";
        this.dashboards = this.dashboardsService.getUserDashboards();
    }

    createNewDashboard() {

    }
}
