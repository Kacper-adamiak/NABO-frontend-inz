import {Component, OnInit} from '@angular/core';
import {StatsService} from "../../../services/stats/stats.service";
import {ActivatedRoute} from "@angular/router";
import {ChartData, ChartOptions} from 'chart.js';

@Component({
  selector: 'app-stat-detail-page',
  templateUrl: './stat-detail-page.component.html',
  styleUrls: ['./stat-detail-page.component.scss']
})
export class StatDetailPageComponent implements OnInit {

  dataChart!: ChartData<'line'>;

  options: ChartOptions<'line'> = {
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1
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
        res.sort((a,b) => {
          if(a.date > b.date) return 1;
          if(a.date < b.date) return -1;
          return 0
        })
        res.forEach((item) => {
          labels.push(item.date)
          data.push(item.users)
        })
        this.dataChart = {
          labels: labels,
          datasets: [
            {
              label: 'Liczba użytkowników',
              data: data,
              borderColor: '#4F4FB7',
              backgroundColor: '#4F4FB7'
            }
          ]
        }

      },
      error: err => {
      }
    })
  }

}
