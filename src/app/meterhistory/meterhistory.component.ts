import { Component, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Color} from 'highcharts';
import { timer, Subject, range, of, Subscription, } from 'rxjs';
import { delay, takeWhile } from 'rxjs/operators';
import { interval } from 'rxjs';
import { switchMap, catchError } from 'rxjs/operators';
import { map } from 'rxjs/operators/';
import { first } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { takeUntil } from 'rxjs';
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
  selector: 'app-meterhistory',
  templateUrl: './meterhistory.component.html',
  styleUrls: ['./meterhistory.component.scss']
})
export class MeterhistoryComponent implements OnInit {
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
// public datetime                   = '';
  public VoltageLabels
  private display: boolean;
  public chartoption = {};
  public datalabels=[];
  public dataset =[];
  public meter_data
  public chartOptions={}
  Timedata: EnergyData[];
  highcharts
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
    //  console.log(mqttda)
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
    this.timeseries.getMeterHistory(data)
    .pipe(first())
    .subscribe(mqttda => {
      
      var arr     = [];
      var len     = mqttda.length;
      var len1    = mqttda.length - 1;
      for (var i = 0; i < len; i++) {
        arr.push(mqttda[i].datetime.toLocaleString());//prints expected format.);
        console.log(mqttda[i].datetime)
      }
      this.datalabels=arr;

      this.processdatamapperJson=mqttda;
      this.dataset=[
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.volt)), name: 'Voltage' },
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.volt1)), name: 'Voltage1' },
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.volt2)), name: 'Voltage2'},
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.volt3)), name: 'Voltage3'},
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.curr)), name: 'A'},
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.curr1)), name: 'A1'},
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.curr2)), name: 'A2'},
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.curr3)), name: 'A3'},
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.kwh)), name: 'Real Energy'},
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.kw)), name: 'Active Energy'},
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.pf)), name: 'Power Factor'},
        { type: 'line',data: this.processdatamapperJson.map(a => parseFloat(a.kva)), name: 'Apperent Power'}
      ];
      this.highcharts= Highcharts;
      this.chartOptions = {
        chart: {
          zoomType: 'x',
          },
        credits: { enabled: false },
        title: {
          style: {
            fontSize: 15
          }
        },
        xAxis: [{
          categories: this.datalabels,
          crosshair: true
      }],
        tooltip: {
          shared: true
      },
        series:this.dataset,

        responsive: {
          rules: [{
            condition: {
              maxWidth: 500
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom'
              }
            }
          }]
        }

      };
      console.log(this.chartOptions)
    });
    this.loading      = false;
  }
  ngOnDestroy() {
    if (this.id) {
      clearInterval(this.id);
    }
  }
}
