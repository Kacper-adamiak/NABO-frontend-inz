import {Component, OnInit} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LevelService} from "../../../services/level.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Level} from "../../../models/level";
import {NewLevelDialogComponent} from "./new-level-dialog/new-level-dialog.component";
import {LoadingState} from "../../../utils/loading-state";
import {finalize} from "rxjs";

@Component({
  selector: 'app-levels-page',
  templateUrl: './levels-page.component.html',
  styleUrls: ['./levels-page.component.scss']
})
export class LevelsPageComponent implements OnInit {

  dataLoadingState = new LoadingState()

  displayedColumns: string[] = ["name", "difficulty", "statusName" ];
  data: Level[] = []
  courseId!: number

  constructor(
    private levelService: LevelService,
    public dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router,
    private activeRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.getLevels();
  }

  getLevels() {
    this.courseId = Number(this.route.snapshot.paramMap.get('courseId'))
    this.dataLoadingState.setLoading()
    this.levelService.getAllLevels(this.courseId)
      .pipe(
        finalize(() => {
          this.dataLoadingState.setNotLoading()
        })
      )
      .subscribe({
      next: res => {
        this.data = res
      },
      error: err => {
      },
      complete: () => {
      }
    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(NewLevelDialogComponent, {
      width: '90%',
      height: '90%',
      data: {courseId: this.courseId}
    });

  }

  rowClicked(event: any) {
    this.router.navigate([`${event.id}`], {relativeTo: this.activeRoute})
  }

}
