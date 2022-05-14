import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard', title: 'Dashboard',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/dashboard-overview', title: 'Dashboard Overview',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/Consumption_All', title: 'All Meters Consumption',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/history', title: 'Meter History',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/energyconsumption', title: 'Energy Consumption',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/maintenace', title: 'Fault Summary',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/faulthistory', title: 'Fault History',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/Consumption', title: 'Consumption',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/dgstatus', title: 'Dg OprationalReport',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/dghistory', title: 'DG-History',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/meterpowerquilty', title: 'MeterWise Power Quality',  icon: 'ni-tv-2 text-primary', class: '' },
    { path: '/dgconsumption', title: 'Dg Power Consumption',  icon: 'ni-tv-2 text-primary', class: '' }
   
    
    // Consumption
    // { path: '/Dash', title: 'SampleDash',  icon: 'ni-tv-2 text-primary', class: '' },
    // { path: '/icons', title: 'Icons',  icon:'ni-planet text-blue', class: '' },
    // { path: '/maps', title: 'Maps',  icon:'ni-pin-3 text-orange', class: '' },
    // { path: '/user-profile', title: 'User profile',  icon:'ni-single-02 text-yellow', class: '' },
    // { path: '/tables', title: 'Tables',  icon:'ni-bullet-list-67 text-red', class: '' },
    // { path: '/login', title: 'Login',  icon:'ni-key-25 text-info', class: '' },
    // { path: '/register', title: 'Register',  icon:'ni-circle-08 text-pink', class: '' }
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  public menuItems: any[];
  public isCollapsed = true;

  constructor(private router: Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
   });
  }
  goToLink(url:string){
    window.open(url,"_blank");
  }
}
