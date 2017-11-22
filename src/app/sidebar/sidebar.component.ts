import { Component, OnInit } from '@angular/core';

declare var $:any;

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    displayInSidebar: boolean;
}

export const ROUTES: RouteInfo[] = [
    { path: 'users/dashboards/get', title: 'Users Metrics',  icon:'fa fa-id-card-o', class: '', displayInSidebar: true},
    { path: 'users/dashboards/create/', title: 'Create a User Metric',  icon:'ti-panel', class: '',displayInSidebar: false },
    { path: 'users/dashboards/create/spread', title: 'Create a spreeded User Metric',  icon:'ti-panel', class: '',displayInSidebar: false },
    { path: 'users/dashboards/create/*', title: 'Edit Metric',  icon:'ti-panel', class: '',displayInSidebar: false },
    { path: 'events/dashboards/get', title: 'Events Matrices',  icon: 'ti-panel', class: '', displayInSidebar: true },
    { path: 'dashboard', title: 'Dashboard',  icon: 'ti-panel', class: '', displayInSidebar: false },
    { path: 'table', title: 'Table List',  icon:'ti-view-list-alt', class: '', displayInSidebar: false },
    { path: 'typography', title: 'Typography',  icon:'ti-text', class: '', displayInSidebar: false },
    { path: 'icons', title: 'Icons',  icon:'ti-pencil-alt2', class: '', displayInSidebar: false },
    { path: 'maps', title: 'Maps',  icon:'ti-map', class: '', displayInSidebar: false },
    { path: 'notifications', title: 'Notifications',  icon:'ti-bell', class: '', displayInSidebar: false },

];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem.displayInSidebar);
    }
    isNotMobileMenu(){
        if($(window).width() > 991){
            return false;
        }
        return true;
    }

}
