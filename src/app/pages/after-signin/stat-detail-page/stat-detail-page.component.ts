import {Component, OnInit} from '@angular/core';
import {StatsService} from "../../../services/stats.service";
import {ActivatedRoute} from "@angular/router";
import {ChartData, ChartOptions} from 'chart.js';
import * as moment from 'moment';
import {finalize} from "rxjs";
import {LoadingState} from "../../../utils/loading-state";
import {NewUsersPerDayResponse} from "../../../models/responses/new-users-per-day-response";
import {SnackbarService} from "../../../services/snackbar.service";

@Component({
  selector: 'app-stat-detail-page',
  templateUrl: './stat-detail-page.component.html',
  styleUrls: ['./stat-detail-page.component.scss']
})
export class StatDetailPageComponent implements OnInit {

  dataLoadingState = new LoadingState()
  data!: NewUsersPerDayResponse
  dataChart!: ChartData<'bar'>;

  maxYValue: number = 0

  options: ChartOptions<'bar'> = {
    scales: {
      y: {
        max: 0,
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      }
    }
  }

  courseId!: number

  constructor(
    private statsService: StatsService,
    private route: ActivatedRoute,
    private snackbarService: SnackbarService
  ) {
  }

  ngOnInit(): void {
    this.getNewUsersPerDay().subscribe({
      next: res => {
        this.data = res
        this.initializeChartData()
      },
      error: err => {
        this.snackbarService.openErrorSnackBar(err.message)
      }
    })
  }

  getNewUsersPerDay() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.dataLoadingState.setLoading()
    return this.statsService.getCourseNewUsersPerDay(this.courseId)
      .pipe(
        finalize(() => {
          this.dataLoadingState.setNotLoading()
        })
      )
  }

  initializeChartData() {
    let dateMap = this.generateDateNumberMapFromNewUsersPerDayResponse(this.data)
    this.data.newUsersPerDay.sort((a, b) => {
      if (a.date > b.date) return 1;
      if (a.date < b.date) return -1;
      return 0
    })

    this.data.newUsersPerDay.forEach((value) => {
      dateMap.set(moment(value.date!).format("YYYY-MM-DD").toString(), value.users!)
    })

    this.maxYValue = Math.max(...this.data.newUsersPerDay.map(item => item.users)) + 10;

    this.dataChart = {
      labels: Array.from(dateMap.keys()),
      datasets: [
        {
          label: 'Liczba użytkowników',
          data: Array.from(dateMap.values()),
          borderColor: '#4F4FB7',
          backgroundColor: '#4F4FB7'
        }
      ]
    }

    this.options = {
      scales: {
        y: {
          max: this.maxYValue,
          beginAtZero: true,
          ticks: {
            stepSize: Math.round((this.maxYValue / 10) + 1),
          }
        }
      }
    }
  }

  generateDateNumberMapFromNewUsersPerDayResponse(data: NewUsersPerDayResponse) {
    let endDate = new Date(Date.now())
    let temp = new Date(data.creationDate)
    let dateMap = new Map<string, number>()
    while (temp.getTime() <= endDate.getTime()) {
      dateMap.set(moment(temp).format("YYYY-MM-DD").toString(), 0)
      temp.setDate(temp.getDate() + 1)
    }
    return dateMap
  }

}
