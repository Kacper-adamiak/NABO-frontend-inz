import {Component, OnInit} from '@angular/core';
import {StatsService} from "../../../services/stats/stats.service";
import {ActivatedRoute} from "@angular/router";


@Component({
  selector: 'app-stat-detail-page',
  templateUrl: './stat-detail-page.component.html',
  styleUrls: ['./stat-detail-page.component.scss']
})
export class StatDetailPageComponent implements OnInit {

  courseId!: number
  data = []
  constructor(
    private statsService: StatsService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
     this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.statsService.getCourseNewUsersPerDay(this.courseId).subscribe({
      next: res => {
        this.data = res
      },
      error: err => {

      }
    })
  }

}
