import { Component, OnInit } from '@angular/core';
import {MetricsService} from "../../services/metricsService/metricsService";


@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'user.dashboards.loader.component.html'
})

export class UserDashboardsLoaderComponent implements OnInit {
    private dashboard: any;

    constructor(private dashboardsService: MetricsService) {}

    ngOnInit() {
        // this.dashboard = this.metricsService.getUserDashboards()[0];
    }
}
