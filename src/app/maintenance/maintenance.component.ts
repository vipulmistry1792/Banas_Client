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
@Component({
  selector: 'app-maintenance',
  templateUrl: './maintenance.component.html',
  styleUrls: ['./maintenance.component.scss']
})
export class MaintenanceComponent implements OnInit {
  public processdatamapperJson: EnergyData[];
  public datasets                   : any;
  public data                       : any;
  public salesChart;
  dateValue                         = new Date();
  dateValue1                        = new Date();
  public id ;
  metername="em1"
  public univarsalDateFormat        = 'yyyy-MM-dd HH:mm:ss';
  public machine_data               = [];
  public loading                    : boolean;
  public datetime                   = '';
  public VoltageLabels
  private display: boolean;
  public chartoption = {};
  public datalabels=[];
  public dataset =[];
  //public chartOptions={}

  Timedata: EnergyData[];
  public faultdata
  public faultdataequipment
  public meter_data
  //highcharts

  subscription: Subscription;
  constructor(private datepipe: DatePipe, private timeseries: TimeseriesService,private MeterMasterService:MeterMasterService) { }
  highcharts = Highcharts;
  chartOptions = {
     chart : {
        type:'pie',
        options3d: {
           enabled: true,
           alpha: 45,
           beta: 0
        }
     },
     tooltip : {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
     },
     plotOptions : {
        pie: {
           allowPointSelect: true,
           cursor: 'pointer',
           depth: 35,
           dataLabels: {
              enabled: true,
              format: '<b>{point.name}%</b>: {point.percentage:.1f} %',
           }
        }
     },
     credits:{
      enabled: false
   },
     series : [{
        type: 'pie',
        name: 'Browser share',
        data: [
           ['Motor1 trip',  16.66],
           ['Motor2 trip',       33],
           ['Motor3 trip',    50]
        ]
     }]
  };
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


  showData()
  {
    this.machine_data = [];
    this.datalabels   = [];
    this.dataset      = [];
    this.data         = [];
    var fDate         = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd HH:mm:ss');
    var tDate         = this.datepipe.transform(this.dateValue1, 'yyyy-MM-dd HH:mm:ss');
    this.loading      = true;
    const data = {
      machineno             : this.metername,
      start_date            : fDate,
      end_date              : tDate
    };
    this.timeseries.getfaultsummary(data)
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
      this.showData1()
    this.loading      = false;
    });
  }
  showData1()
  {
    this.machine_data = [];
    this.datalabels   = [];
    this.dataset      = [];
    this.data         = [];
    var fDate         = this.datepipe.transform(this.dateValue, 'yyyy-MM-dd HH:mm:ss');
    var tDate         = this.datepipe.transform(this.dateValue1, 'yyyy-MM-dd HH:mm:ss');
    this.loading      = true;
    const data = {
      machineno             : this.metername,
      start_date            : fDate,
      end_date              : tDate
    };
    this.timeseries.getfaultsummarybyequipment(data)
    .pipe(first())
    .subscribe(mqttda => {
      var arr     = [];
      var len     = mqttda.length;
      var len1    = mqttda.length - 1;
      for (var i = 0; i < len; i++) {
        arr.push(mqttda[i].datetime);
      }
      this.datalabels=arr;
      this.faultdataequipment=mqttda
    this.loading      = false;
    });
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
