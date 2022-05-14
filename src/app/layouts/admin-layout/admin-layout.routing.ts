import { Routes } from '@angular/router';
import { AuthGuard } from '../../_helpers';
//import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { MeterhistoryComponent } from '../../meterhistory/meterhistory.component';
import { EnergyConsComponent } from '../../energy-cons/energy-cons.component';
import { MaintenanceComponent } from '../../maintenance/maintenance.component';
import { FaulthistoryComponent } from '../../faulthistory/faulthistory.component';
import { EnergyUsedComponent } from '../../energy-used/energy-used.component';
import { ConsumptionComponent } from '../../consumption/consumption.component';
import { DghistoryComponent } from '../../dghistory/dghistory.component';
import { ConsumptionNewComponent } from '../../consumption-new/consumption-new.component';
import { PowerQuilityComponent } from '../../power-quility/power-quility.component';
import { DgPowerconsumptionComponent } from 'src/app/dg-powerconsumption/dg-powerconsumption.component';
import { DgStatusHistoryComponent } from 'src/app/dg-status-history/dg-status-history.component';

export const AdminLayoutRoutes: Routes = [
   // { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path:'dashboard-overview',component:DashboardComponent,canActivate: [AuthGuard]},
    { path:'history',component:MeterhistoryComponent,canActivate: [AuthGuard]},
    { path:'energyconsumption',component:EnergyConsComponent,canActivate: [AuthGuard]},
    { path:'maintenace',component:MaintenanceComponent,canActivate: [AuthGuard]},
    { path:'faulthistory',component:FaulthistoryComponent,canActivate: [AuthGuard]},
    { path:'Consumption',component:ConsumptionComponent,canActivate: [AuthGuard]},
    { path:'dghistory',component:DghistoryComponent,canActivate: [AuthGuard]},
    { path:'Consumption_All',component:ConsumptionNewComponent,canActivate: [AuthGuard]},
    { path:'meterpowerquilty',component:PowerQuilityComponent,canActivate: [AuthGuard]},
    { path:'dgconsumption',component:DgPowerconsumptionComponent,canActivate: [AuthGuard]},
    { path:'dgstatus',component:DgStatusHistoryComponent,canActivate: [AuthGuard]}

    // { path:'Dash',component:EnergyUsedComponent /meterpowerquilty}
];
