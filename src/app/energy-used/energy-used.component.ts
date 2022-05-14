import { Component, OnInit } from '@angular/core';
import { DatePipe } from '@angular/common';
import * as Highcharts from 'highcharts';
declare var require: any;
const More = require('highcharts/highcharts-more');
More(Highcharts);

import Histogram from 'highcharts/modules/histogram-bellcurve';
Histogram(Highcharts);

import highcharts3D from 'highcharts/highcharts-3d';
import { EnergyData } from '../energy-data';
import { TimeseriesService } from '../_services/timeseries.service';
highcharts3D(Highcharts);

const Exporting = require('highcharts/modules/exporting');
Exporting(Highcharts);

const ExportData = require('highcharts/modules/export-data');
ExportData(Highcharts);

const Accessibility = require('highcharts/modules/accessibility');
Accessibility(Highcharts);
@Component({
  selector: 'app-energy-used',
  templateUrl: './energy-used.component.html',
  styleUrls: ['./energy-used.component.css']
})
export class EnergyUsedComponent implements OnInit {
  dateValue                         = new Date();
  dateValue1                        = new Date();
  dataSource
  dataSource1
  theme="candy";
 
  data = {
    chart: {
      // caption: "Energy Used by Applience",
      yaxisname: "Kwh",
      creditLabel: false,
      numvisibleplot: "6",
      showvalues: "1",
      decimals: "1",
      stack100percent: "1",
      valuefontcolor: "#FFFFFF",
      theme: this.theme
    },
    data: [
      {
        label: "66kv Incomer1",
        value: "1010000"
      },
      {
        label: "66kv Incomer2",
        value: "1010000"
      },
      {
        label: "11kv Incomer 1",
        value: "101000"
      },
      {
        label: "11kv Incomer 2",
        value: "92000"
      },
      {
        label: "11kv Tarfo1",
        value: "82600"
      },
      {
        label: "11kv Tarfo2",
        value: "70400"
      },
      {
        label: "11kv Banas1",
        value: "68152"
      }
      ,
      {
        label: "11kv Banas2",
        value: "70500"
      },
      {
        label: "11kv Banas3",
        value: "70400"
      },
      {
        label: "11kv Spare1",
        value: "68152"
      }
      ,
      {
        label: "11kv Spare2",
        value: "70500"
      }
      ,
      {
        label: "11kv Capacitor1",
        value: "70500"
      },
      {
        label: "11kv Capacitor2",
        value: "68152"
      }
    ]
  };
  data1 = {
    chart: {
      caption: "App Publishing Trend",
      subcaption: "2012-2016",
      xaxisname: "Years",
      yaxisname: "Total number of apps in store",
      formatnumberscale: "1",
      plottooltext:
        "<b>$dataValue</b> apps were available on <b>$seriesName</b> in $label",
      theme: "candy",
      drawcrossline: "1"
    },
    categories: [
      {
        category: [
          {
            label: "2012"
          },
          {
            label: "2013"
          },
          {
            label: "2014"
          },
          {
            label: "2015"
          },
          {
            label: "2016"
          }
        ]
      }
    ],
    dataset: [
      {
        seriesname: "iOS App Store",
        data: [
          {
            value: "125000"
          },
          {
            value: "300000"
          },
          {
            value: "480000"
          },
          {
            value: "800000"
          },
          {
            value: "1100000"
          }
        ]
      },
      {
        seriesname: "Google Play Store",
        data: [
          {
            value: "70000"
          },
          {
            value: "150000"
          },
          {
            value: "350000"
          },
          {
            value: "600000"
          },
          {
            value: "1400000"
          }
        ]
      },
      {
        seriesname: "Amazon AppStore",
        data: [
          {
            value: "10000"
          },
          {
            value: "100000"
          },
          {
            value: "300000"
          },
          {
            value: "600000"
          },
          {
            value: "900000"
          }
        ]
      }
    ]
  };
  constructor(private datepipe: DatePipe) { }
  //width = auto;
 // height = 400;
  type = "bar3d";
  type1 = "column3d";
  dataFormat = "json";
  
  ngOnInit(): void {
    this.dataSource = this.data;
    this.dataSource1 = this.data1;
  }

}
