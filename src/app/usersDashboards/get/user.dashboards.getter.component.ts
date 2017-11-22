import {Component, OnInit, AfterViewInit} from '@angular/core';
import {MetricsService} from "../../services/metricsService/metricsService";
import * as Chartist from 'chartist';

declare var $:any;


@Component({
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'user.dashboards.getter.component.html',
    styleUrls: ['user.dashboards.getter.component.css']
})

export class UserDashboards implements OnInit {

    private pathToCreatorComponent: string;
    private pathToLoaderComponent: string;
    private allMatrices;

    private spreadMatrices;

    constructor(private metricsService: MetricsService) {}

    ngOnInit() {
        this.pathToCreatorComponent = "/users/dashboards/create/";
        this.pathToLoaderComponent = "/users/dashboards/load";
        this.allMatrices = this.metricsService.getAllShallowMetricsList();
        this.createSpreadMatricesData();
    }

    createSpreadMatricesData() {
        this.spreadMatrices = [];

        this.allMatrices.forEach((metric) => {
            if (metric.type === 'spread') {
                let series = [];
                let labels = [];

                for (let key in metric.lastResult.spread) {
                    series.push(metric.lastResult.spread[key]);
                    labels.push(key);
                }

                this.spreadMatrices.push({
                    title: metric.title,
                    spreadBy: metric.spreadBy,
                    id: metric.id,
                    data: [{
                        data: series,
                        label: ''
                    }],
                    labels: labels
                });
            }
        });
    }
}
