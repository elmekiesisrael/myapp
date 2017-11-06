import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';
import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';
import { FormsModule } from '@angular/forms';

import { DashboardComponent }   from './dashboard/dashboard.component';
import { UserComponent }   from './user/user.component';
import { UserDashboards }   from './usersDashboards/get/user.dashboards.getter.component';

import { TableComponent }   from './table/table.component';
import { TypographyComponent }   from './typography/typography.component';
import { IconsComponent }   from './icons/icons.component';
import { NotificationsComponent }   from './notifications/notifications.component';
import { UpgradeComponent }   from './upgrade/upgrade.component';
import { UsersDashboardCreatorComponent } from "./usersDashboards/create/user.dashboards.creator.component";
import {DashboardsService} from "./services/dashboardsService/dashboardsService";
import { HttpModule } from '@angular/http';
import { AttributesAndPredicatesService } from './services/userAttributesService/attributesAndPredicatesService';
import { Ng2DropdownModule } from 'ng2-material-dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {QuerySegmentComponent} from "./querySegment/query.segment.component";
import {AuthenticationService} from "./services/authenticationService/authenticationService";



@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    UserComponent,
    TableComponent,
    TypographyComponent,
    IconsComponent,
    NotificationsComponent,
    UpgradeComponent,
    UserDashboards,
    UsersDashboardCreatorComponent,
    QuerySegmentComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(AppRoutes),
    SidebarModule,
    NavbarModule,
    FooterModule,
    FixedPluginModule,
    HttpModule,
    Ng2DropdownModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [
    DashboardsService,
    AttributesAndPredicatesService,
    AuthenticationService
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
