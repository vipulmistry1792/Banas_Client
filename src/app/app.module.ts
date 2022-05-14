import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { JwtInterceptor, ErrorInterceptor } from './_helpers';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {DatePipe} from '@angular/common';
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { DataTablesModule } from "angular-datatables";
import { ChartModule } from 'angular-highcharts';
import * as echarts from 'echarts';
import { NgxEchartsModule } from 'ngx-echarts';
import { HighchartsChartModule } from 'highcharts-angular';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MeterhistoryComponent } from './meterhistory/meterhistory.component';
import { EnergyConsComponent } from './energy-cons/energy-cons.component';
import { MaintenanceComponent } from './maintenance/maintenance.component';
import { FaulthistoryComponent } from './faulthistory/faulthistory.component';
import { FusionChartsModule } from "angular-fusioncharts";
import { Daterangepicker } from 'ng2-daterangepicker';
// Import FusionCharts library and chart modules
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import { EnergyUsedComponent } from './energy-used/energy-used.component';
import { ConsumptionComponent } from './consumption/consumption.component';
import { DghistoryComponent } from './dghistory/dghistory.component';
import { ConsumptionNewComponent } from './consumption-new/consumption-new.component';
import { PowerQuilityComponent } from './power-quility/power-quility.component';
import { DgPowerconsumptionComponent } from './dg-powerconsumption/dg-powerconsumption.component';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme);
@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    ComponentsModule,
    NgbModule,
    RouterModule,
    DataTablesModule,
    AppRoutingModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    ChartModule,
    HighchartsChartModule,
    NgxEchartsModule.forRoot({
      echarts
    }),
    FusionChartsModule,
    Daterangepicker
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthLayoutComponent,
    DashboardComponent,
    MeterhistoryComponent,
    EnergyConsComponent,
    MaintenanceComponent,
    FaulthistoryComponent,
    EnergyUsedComponent,
    ConsumptionComponent,
    DghistoryComponent,
    ConsumptionNewComponent,
    PowerQuilityComponent,
    DgPowerconsumptionComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
