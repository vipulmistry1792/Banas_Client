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
  selector: 'app-consumption',
  templateUrl: './consumption.component.html',
  styleUrls: ['./consumption.component.css']
})
export class ConsumptionComponent implements OnInit {

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
  public chartOptions={}
  public chartOptions1={}
  public TableData;
  public Headers=['em1_energy','em2_energy','em3_energy','em4_energy','em5_energy','em6_energy','em7_energy','em8_energy','em9_energy','em10_energy','em11_energy','em12_energy','em13_energy','em14_energy','em15_energy','em16_energy','em17_energy','em18_energy','em19_energy','em20_energy','em21_energy','em22_energy','em23_energy','em24_energy','em25_energy','em26_energy','em27_energy','em28_energy','em29_energy','em30_energy','em31_energy','em32_energy','em33_energy','em34_energy','em35_energy','em36_energy','em37_energy','em38_energy','em39_energy','em40_energy','em41_energy','em42_energy','em43_energy','em44_energy','em45_energy','em46_energy','em47_energy','em48_energy']
  Timedata: EnergyData[];
  highcharts
  highcharts1

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
    this.timeseries.getconsumption(data)
    .pipe(first())
    .subscribe(mqttda => {
      let Data=mqttda[0];
      const values = Object.keys(Data).map(key => Data[key]==null ? 0 : Data[key]);
      const keys =Object.keys(Data).map(key =>key);
      this.TableData=mqttda;
    });

    this.loading      = false;
  }
  init_daterangepicker() {

   // if( typeof ($.fn.daterangepicker) === 'undefined'){ return; }

    let cb = (start, end) => {

    };
    let configStartDate;
    let configEndDate;
    this.selectedStartDate = configStartDate;
    this.selectedEndDate = configEndDate;
    this.completeDate = moment(configStartDate).format('MMMM D, YYYY') + ' - ' + moment(configEndDate).format('MMMM D, YYYY');
};

}
