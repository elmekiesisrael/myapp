import { Routes } from '@angular/router';

import { UserComponent }   from './user/user.component';
import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { UserDashboards } from "./usersDashboards/get/user.dashboards.getter.component";
import { UsersDashboardCreatorComponent } from "./usersDashboards/create/user.dashboards.creator.component";
import {UserDashboardsLoaderComponent} from "./usersDashboards/load/user.dashboards.loader.component";
import {DashboardComponent} from "./dashboard/dashboard.component";

export const AppRoutes: Routes = [
    {
        path: 'dashboard',
        component: DashboardComponent,
    },
    {
        path: 'users/dashboards/get',
        component: UserDashboards
    },
    {
        path: 'events/dashboards/get',
        component: UserComponent
    },
    {
        path: 'table',
        component: TableComponent
    },
    {
        path: 'typography',
        component: TypographyComponent
    },
    {
        path: 'icons',
        component: IconsComponent
    },
    {
        path: 'notifications',
        component: NotificationsComponent
    },
    {
        path: 'upgrade',
        component: UpgradeComponent
    },
    {
        path: 'users/dashboards/create/:id',
        component: UsersDashboardCreatorComponent
    },
    {
        path: 'users/dashboards/load',
        component: UserDashboardsLoaderComponent
    }
];
