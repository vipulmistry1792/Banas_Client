import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Chart } from 'angular-highcharts';
import { Color} from 'highcharts';
import { timer, Subject, range, of, Subscription, } from 'rxjs';
import { first } from 'rxjs/operators';
import * as Highcharts from 'highcharts';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
highcharts3D(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
import { MeterMasterService,TimeseriesService } from '../_services';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dateValue                         = new Date();
  dateValue1                        = new Date();
  public runningmonthdata;
  subscription: Subscription;
  public main_66kv;
  public  main_11kv;
  public  main_pcc1;
  public  main_pcc2;
  public main_pcc3;
  metername="em1";
  public meter_data
  public id
  custom                            = 0;
  public chartOptions2={};
  public chartOptions1={};
  highcharts = Highcharts;
 
  public highcharts2;
  public highcharts1;
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
         ['66kv Breaker FDR Panel',   45.0],
         ['66kv Breaker CRP Panel',       26.8],
         {
            name: 'CRP Panel',
            y: 12.8,
            sliced: true,
            selected: true
         },
         ['11kv Breaker (VCB)',    8.5]
      ]
   }]
};

 constructor(private datepipe: DatePipe, private timeseries: TimeseriesService,private MeterMasterService:MeterMasterService) { }

  ngOnInit(): void {
    this.getMeterData()
     this.showData();
     this.id = setInterval(this.showData, 5000); 
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
    var fDate         = this.dateValue.toISOString();
    var tDate         = this.dateValue1.toISOString();
    const data = {
      machineno             : this.metername,
      start_date            : fDate,
      end_date              : tDate
    };
    this.timeseries.runningmonthData(data)
    .pipe(first())
    .subscribe(mqttda => {
       //console.log(mqttda)
       var arr     = [];
       var arr1     = [];
       var data     = [];
       var seriesdata=[];
       this.main_66kv=[];
       this.main_11kv=[];
       this.main_pcc1=[];
       this.main_pcc2=[];
       this.main_pcc3=[];
       let meter=""
       var len     = mqttda.length;
       var len2     = this.meter_data.length;
       var len1    = mqttda.length - 1;
       this.main_66kv.push(parseFloat(mqttda[len1].em2_energy)+parseFloat(mqttda[len1].em3_energy))
       this.main_66kv.push(parseFloat(mqttda[len-2].em2_energy)+parseFloat(mqttda[len-2].em3_energy))
       this.main_11kv.push(parseFloat(mqttda[len1].em4_energy)+parseFloat(mqttda[len1].em5_energy)+parseFloat(mqttda[len1].em7_energy)+parseFloat(mqttda[len1].em8_energy)+parseFloat(mqttda[len1].em9_energy)+parseFloat(mqttda[len1].em11_energy)+parseFloat(mqttda[len1].em12_energy)+parseFloat(mqttda[len1].em13_energy))
       this.main_11kv.push(parseFloat(mqttda[len-2].em4_energy)+parseFloat(mqttda[len-2].em5_energy)+parseFloat(mqttda[len-2].em7_energy)+parseFloat(mqttda[len-2].em8_energy)+parseFloat(mqttda[len-2].em9_energy)+parseFloat(mqttda[len-2].em11_energy)+parseFloat(mqttda[len-2].em12_energy)+parseFloat(mqttda[len-2].em13_energy))       
       this.main_pcc1.push(parseFloat(mqttda[len1].em14_energy)+parseFloat(mqttda[len1].em15_energy)+parseFloat(mqttda[len1].em16_energy)+parseFloat(mqttda[len1].em17_energy)+parseFloat(mqttda[len1].em18_energy)+parseFloat(mqttda[len1].em19_energy)+parseFloat(mqttda[len1].em20_energy)+parseFloat(mqttda[len1].em21_energy)+parseFloat(mqttda[len1].em22_energy)+parseFloat(mqttda[len1].em23_energy)+parseFloat(mqttda[len1].em24_energy)+parseFloat(mqttda[len1].em25_energy))
       this.main_pcc1.push(parseFloat(mqttda[len-2].em14_energy)+parseFloat(mqttda[len-2].em15_energy)+parseFloat(mqttda[len-2].em16_energy)+parseFloat(mqttda[len-2].em17_energy)+parseFloat(mqttda[len-2].em18_energy)+parseFloat(mqttda[len-2].em19_energy)+parseFloat(mqttda[len-2].em20_energy)+parseFloat(mqttda[len-2].em21_energy)+parseFloat(mqttda[len-2].em22_energy)+parseFloat(mqttda[len-2].em23_energy)+parseFloat(mqttda[len-2].em24_energy)+parseFloat(mqttda[len-2].em25_energy))
       this.main_pcc2.push(parseFloat(mqttda[len1].em28_energy)+parseFloat(mqttda[len1].em29_energy)+parseFloat(mqttda[len1].em30_energy)+parseFloat(mqttda[len1].em31_energy)+parseFloat(mqttda[len1].em32_energy)+parseFloat(mqttda[len1].em33_energy)+parseFloat(mqttda[len1].em36_energy)+parseFloat(mqttda[len1].em37_energy)+parseFloat(mqttda[len1].em38_energy))
       this.main_pcc2.push(parseFloat(mqttda[len-2].em28_energy)+parseFloat(mqttda[len-2].em29_energy)+parseFloat(mqttda[len-2].em30_energy)+parseFloat(mqttda[len-2].em31_energy)+parseFloat(mqttda[len-2].em32_energy)+parseFloat(mqttda[len-2].em33_energy)+parseFloat(mqttda[len-2].em36_energy)+parseFloat(mqttda[len-2].em37_energy)+parseFloat(mqttda[len-2].em38_energy))
       this.main_pcc3.push(parseFloat(mqttda[len1].em40_energy)+parseFloat(mqttda[len1].em41_energy)+parseFloat(mqttda[len1].em42_energy)+parseFloat(mqttda[len1].em45_energy)+parseFloat(mqttda[len1].em46_energy)+parseFloat(mqttda[len1].em47_energy)+parseFloat(mqttda[len1].em48_energy))
       this.main_pcc3.push(parseFloat(mqttda[len-2].em40_energy)+parseFloat(mqttda[len-2].em41_energy)+parseFloat(mqttda[len-2].em42_energy)+parseFloat(mqttda[len-2].em45_energy)+parseFloat(mqttda[len-2].em46_energy)+parseFloat(mqttda[len-2].em47_energy)+parseFloat(mqttda[len-2].em48_energy))
      // console.log(this.meter_data)
       for (var i = 0; i < len; i++) {
         arr.push(this.datepipe.transform(mqttda[i].em_date, 'dd-MM-yy'));
         if(len1==i || (len-2)==i)
         {
            arr1.push(this.datepipe.transform(mqttda[i].em_date, 'dd-MM-yy'));
         }
       }
       //console.log(arr)
       for (var j = 0; j < len2; j++) {
         meter=this.meter_data[j].tablename;
         data     = [];
         meter=meter+"_energy";
        // console.log(meter)
        mqttda.map((currElement)=>{
        // console.log(currElement[meter])
         data.push(currElement[meter]);
        })       
         seriesdata.push({name:this.meter_data[j].meter_name,data:data})
       }
      // console.log(seriesdata);
      //
      this.highcharts2 = Highcharts;
       this.chartOptions2 = {
         chart: {
           type: 'column',
           zoomType: 'x',
         },
         title: {
           text: 'Daily consumption Energy'
         },
         xAxis: {
           categories: arr,
           crosshair: true
         },
         yAxis: {
           min: 0,
           title: {
             text: 'consumption (mwh)'
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
         credits:{
            enabled: false
         },
         series: seriesdata
       };
       this.highcharts1 = Highcharts;
       this.chartOptions1 = {
         chart: {
           type: 'column'
         },
         title: {
           text: 'Today And Yesterday Used Energy'
         },
         xAxis: {
           categories: arr1,
           crosshair: true
         },
         yAxis: {
           min: 0,
           title: {
             text: 'consumption (mwh)'
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
         credits:{
            enabled: false
         },
         series: [
            {
               name: '66KV',
               data: this.main_66kv
            }, 
            {
               name: '11KV',
               data: this.main_11kv
            }, 
            {
               name: 'PCC1',
               data: this.main_pcc1      
            }
            , 
            {
               name: 'PCC2',
               data: this.main_pcc2      
            }
            , 
            {
               name: 'PCC3',
               data: this.main_pcc3      
            }
         ]
       };
     
      console.log(this.chartOptions1)
    })
  }
  ngOnDestroy() {
    clearInterval(this.id);
  }
}
