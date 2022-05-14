import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import * as moment from 'moment';
import axios from 'axios';
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
  selector: 'app-energy-cons',
  templateUrl: './energy-cons.component.html',
  styleUrls: ['./energy-cons.component.css']
})
export class EnergyConsComponent implements OnInit {
  public processdatamapperJson: EnergyData[];
  public datasets                   : any;
  public data                       : any;
  public salesChart;
  completeDate = '';
  dateValue                         = new Date();
  dateValue1                        = new Date();
  selectedStartDate = '';
  selectedEndDate = '';
  public id ;
  metername="em1"
  public meter_data
  public univarsalDateFormat        = 'yyyy-MM-dd HH:mm:ss';
  public machine_data               = [];
  public loading                    : boolean;
  public datetime                   = '';
  public VoltageLabels
  private display: boolean;
  public chartoption = {};
  public datalabels=[];
  public dataset =[];
  dtOptions: any = {};
  public chartOptions={}
  public chartOptions1={}
  Timedata: EnergyData[];
  highcharts
  highcharts1

  subscription: Subscription;
  constructor(private datepipe: DatePipe, private timeseries: TimeseriesService,private MeterMasterService:MeterMasterService) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 25,
      processing: true ,
      dom: 'Bfrtip',
      buttons: ['copy', 'print', 'csv','colvis','pdf','excel']
    };
    this. getMeterData();
  }

  getMeterData()
  {
    this.meter_data=[];
    this.MeterMasterService.getAll()
    .pipe(first())
    .subscribe(mqttda => {
    // console.log(mqttda)
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
    var result = this.meter_data.filter(function(v,i) {
      console.log(v[i])
    //  return v[3] === this.metername;
  });

      this.highcharts= Highcharts;
    this.timeseries.getMeterconsuptionDay(data)
    .pipe(first())
    .subscribe(mqttda => {
      let Data=mqttda[0];
      const values = Object.keys(Data).map(key => Data[key]==null ? 0 : Data[key]);
      const keys =Object.keys(Data).map(key =>key);
      this.dataset=values.slice(0,values.length-2);
      this.datalabels=keys.slice(0,values.length-2);
      this.chartOptions ={
        chart: {
          type: 'column'
        },
        title: {
          text: 'Datewise Energy Used'
        },
        xAxis: {
          categories: [
            '1',
            '2',
            '3',
            '4',
            '5',
            '6',
            '7',
            '8',
            '9',
            '10',
            '11',
            '12',
            '13',
            '14',
            '15',
            '16',
            '17',
            '18',
            '19',
            '20',
            '21',
            '22',
            '23',
            '24',
            '25',
            '26',
            '27',
            '28',
            '29',
            '30',
            '31'
          ],
          crosshair: true
        },
        yAxis: {
          min: 0,
          title: {
            text: 'Used (kwh)'
          }
        },
        credits: { enabled: false },
        tooltip: {
          headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
          pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.1f} kwh</b></td></tr>',
          footerFormat: '</table>',
          shared: true,
          useHTML: true
        },
        plotOptions: {
          column: {
            pointPadding: 0.2,
            borderWidth: 0
          }
        },
        series: [{
          name: 'Meter1',
          data: this.dataset
        },
      ]
      }
    })

      this.highcharts1= Highcharts;
      this.timeseries.getMeterconsuptionmonth(data)
      .pipe(first())
      .subscribe(mqttda => {
        let Data=mqttda[0];
        console.log(mqttda)
        const values = Object.keys(Data).map(key => Data[key]==null ? 0 : Data[key]);
        const commaJoinedValues = values.join(",");
        //console.log();
        this.dataset=values.slice(0,values.length-1);
        this.chartOptions1 = {
          chart: {
            type: 'column'
          },
          title: {
            text: 'Monthly Used Energy'
          },
          xAxis: {
            categories: [
              'Jan',
              'Feb',
              'Mar',
              'Apr',
              'May',
              'Jun',
              'Jul',
              'Aug',
              'Sep',
              'Oct',
              'Nov',
              'Dec'
            ],
            crosshair: true
          },
          credits: { enabled: false },
          yAxis: {
            min: 0,
            title: {
              text: 'Energy Used (kwh)'
            }
          },
          tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
              '<td style="padding:0"><b>{point.y:.1f} kwh</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
          },
          plotOptions: {
            column: {
              pointPadding: 0.2,
              borderWidth: 0
            }
          },
          series: [{
            name: 'Meter1',
            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]

          }
        ]
        }
      })

    this.loading      = false;
  }
  init_daterangepicker() {

    //if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }

    let cb = (start, end) => {

    };
    let configStartDate;
    let configEndDate;
    this.selectedStartDate = configStartDate;
    this.selectedEndDate = configEndDate;
    this.completeDate = moment(configStartDate).format('MMMM D, YYYY') + ' - ' + moment(configEndDate).format('MMMM D, YYYY');
};
}
