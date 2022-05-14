import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart } from 'angular-highcharts';
import { Color} from 'highcharts';
import { timer, Subject, range, of, Subscription, } from 'rxjs';
import { delay, takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators/';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
import { EnergyData } from '../energy-data';
import { MeterMasterService,TimeseriesService } from '../_services';
highcharts3D(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
import {
  ColDef,
  ColGroupDef,
  GridApi,
  GridReadyEvent,
} from 'ag-grid-community';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-alpine.css';

@Component({
  selector: 'app-dg-status-history',
  templateUrl: './dg-status-history.component.html',
  styleUrls: ['./dg-status-history.component.css']
})
export class DgStatusHistoryComponent implements OnInit {

  public processdatamapperJson: EnergyData[];
  public datasets                   : any;
  public data                       : any;
  public salesChart;
  private gridApi!: GridApi;
  dateValue                         = new Date();
  dateValue1                        = new Date();
  public id ;
  metername="DG-1"
  public univarsalDateFormat        = 'yyyy-MM-dd HH:mm:ss';
  public machine_data               = [];
  public loading                    : boolean;
  public datetime                   = '';
  public VoltageLabels
  private display: boolean;
  public chartoption = {};
  public datalabels=[];
  public dataset =[];
  public  meter_data
  public faultdata
  public rowData
  //public chartOptions={}
  Timedata: EnergyData[];
  //highcharts
  columnDefs: ColDef[] = [
    { headerName: "DGName", field: 'DGName', sortable: true, filter: true, resizable: true },
    { headerName: "Status",field: 'Status' , sortable: true, filter: true, resizable: true},
    { headerName: "TimeStamp",field: 'TimeStamp', sortable: true, filter: true, resizable: true},
    { headerName: "EndTime",field: 'EndTime', sortable: true, filter: true, resizable: true},
    { headerName: "Duration",field: 'Duration', sortable: true, filter: true, resizable: true}
];


  subscription: Subscription;
  constructor(private datepipe: DatePipe, private timeseries: TimeseriesService,private MeterMasterService:MeterMasterService) { }
  ngOnInit(): void {
    this. getMeterData();
  }

  getMeterData()
  {
    this.meter_data=[];
    this.MeterMasterService.getAll()
    .pipe(first())
    .subscribe(mqttda => {
      this.meter_data=mqttda;
    })

  }
  onBtExport() {
    this.gridApi.exportDataAsExcel();
  }

  showData()
  {
    this.machine_data = [];
    this.datalabels   = [];
    this.dataset      = [];
    this.data         = [];
    this.rowData      = [];
    var fDate         = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd HH:mm:ss');
    var tDate         = this.datepipe.transform(this.dateValue1, 'yyyy-MM-dd HH:mm:ss');
    this.loading      = true;
    const data = {
      machineno             : this.metername,
      start_date            : fDate,
      end_date              : tDate
    };
    this.timeseries.getDGstatus(data)
    .pipe(first())
    .subscribe(mqttda => {
      var arr     = [];
      var len     = mqttda.length;
      var len1    = mqttda.length - 1;
      for (var i = 0; i < len; i++) {
        arr.push(mqttda[i].datetime);
      }
      this.datalabels=arr;
      this.faultdata=mqttda
      this.rowData = mqttda;
      console.log(this.rowData)
       this.loading      = false;
    });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }

}
