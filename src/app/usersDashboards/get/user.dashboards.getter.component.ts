import {Component, OnInit, AfterViewInit} from '@angular/core';
import {MetricsService} from "../../services/metricsService/metricsService";
import * as Chartist from 'chartist';
import {Debugger} from "../../services/debugger/debugger";

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

        Debugger.info('Getting list of shallow user metrics');
        this.metricsService.getAllShallowMetricsList().subscribe(
            allMetrics => {
                Debugger.info('Successfully retrieved list of shallow metrics');
                this.allMatrices = allMetrics;
                this.createSpreadMatricesData()
            },

            err => {
                Debugger.error('Failed to get list of shallow metrics. Error - ' + err);
                this.showMsg('danger', 'Failed to load user metrics.')
            }
        );
    }

    createSpreadMatricesData() {
        Debugger.debug('UserDashboards.createSpreadMatricesData() - Creating spread metrics from retrieved shallow metrics list.');
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
}
