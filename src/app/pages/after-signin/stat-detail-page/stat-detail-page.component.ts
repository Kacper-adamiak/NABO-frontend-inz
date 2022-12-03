import {Component, OnInit} from '@angular/core';
import {StatsService} from "../../../services/stats/stats.service";
import {ActivatedRoute} from "@angular/router";
import {ChartData, ChartOptions} from 'chart.js';
import * as moment from 'moment';

@Component({
  selector: 'app-stat-detail-page',
  templateUrl: './stat-detail-page.component.html',
  styleUrls: ['./stat-detail-page.component.scss']
})
export class StatDetailPageComponent implements OnInit {

  dataChart!: ChartData<'bar'>;

  maxYValue: number = 0

  options: ChartOptions<'bar'> = {
    scales: {
      y: {
        max: this.maxYValue,
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
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
     this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.statsService.getCourseNewUsersPerDay(this.courseId).subscribe({
      next: res => {
        let labels = [] as string[]
        let data = [] as number[]
        let creationDate: Date = res.creationDate!
        let newUsersPerDay = res.newUsersPerDay! as any[]

        newUsersPerDay.sort((a,b) => {
          if(a.date > b.date) return 1;
          if(a.date < b.date) return -1;
          return 0
        })

        console.log(`Data:`, labels)

        let endDate = new Date(Date.now())
        let temp = new Date(creationDate)
        let dateMap = new Map<string, number>()
        while(temp.getTime() <= endDate.getTime()){
          dateMap.set(moment(temp).format("YYYY-MM-DD").toString(), 0)
          temp.setDate(temp.getDate() + 1)
        }
        console.log(`DataMap: `, dateMap)

        newUsersPerDay.forEach((value) => {
          dateMap.set(moment(value.date!).format("YYYY-MM-DD").toString(), value.users!)
        })
        console.log(`DataMap: `, dateMap)

        this.maxYValue = Math.max(...newUsersPerDay.map(item => item.users)) + 10;
        console.log(this.maxYValue)


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
                stepSize: Math.round((this.maxYValue/10)+1),

              }
            }
          }
        }


      },
      error: err => {
      }
    })
  }

}
