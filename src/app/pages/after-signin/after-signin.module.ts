import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AfterSigninComponent} from './after-signin.component';
import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule} from '@angular/router';
import {AccountPageComponent} from './account-page/account-page.component';
import {CoursesPageComponent} from './courses-page/courses-page.component';
import {
  CourseGeneralPageComponent,
  DialogOverviewExampleDialog
} from './course-general-page/course-general-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialExampleModule} from 'src/material.module';
import {NewCourseDialogComponent} from './courses-page/new-course-dialog/new-course-dialog.component';
import {LevelsPageComponent} from './levels-page/levels-page.component';
import {NewLevelDialogComponent} from './levels-page/new-level-dialog/new-level-dialog.component';
import {LevelGeneralPageComponent} from "./level-general-page/level-general-page.component";
import {EditedLevelDialogComponent} from './level-general-page/edited-level-dialog/edited-level-dialog.component';
import {FlashcardsPageComponent} from './flashcards-page/flashcards-page.component';
import {TestQuestionsPageComponent} from './test-questions-page/test-questions-page.component';
import {ExercisesPageComponent} from './exercises-page/exercises-page.component';
import {NewFlashcardDialogComponent} from './flashcards-page/new-flashcard-dialog/new-flashcard-dialog.component';
import {FlashcardGeneralPageComponent} from './flashcard-general-page/flashcard-general-page.component';
import {NewExerciseDialogComponent} from './exercises-page/new-exercise-dialog/new-exercise-dialog.component';
import {ExerciseGeneralPageComponent} from './exercise-general-page/exercise-general-page.component';
import {
  NewTestQuestionDialogComponent
} from './test-questions-page/new-test-question-dialog/new-test-question-dialog.component';
import {StatsPageComponent} from './stats-page/stats-page.component';
import {StatDetailPageComponent} from './stat-detail-page/stat-detail-page.component';
import {NgChartsConfiguration, NgChartsModule} from "ng2-charts";
import {AdminPanelPageComponent} from './admin-panel-page/admin-panel-page.component';


@NgModule({
  declarations: [
    AfterSigninComponent,
    HomePageComponent,
    AccountPageComponent,
    CoursesPageComponent,
    CourseGeneralPageComponent,
    DialogOverviewExampleDialog,
    NewCourseDialogComponent,
    LevelsPageComponent,
    NewLevelDialogComponent,
    LevelGeneralPageComponent,
    EditedLevelDialogComponent,
    FlashcardsPageComponent,
    TestQuestionsPageComponent,
    ExercisesPageComponent,
    NewFlashcardDialogComponent,
    FlashcardGeneralPageComponent,
    NewExerciseDialogComponent,
    ExerciseGeneralPageComponent,
    NewTestQuestionDialogComponent,
    StatsPageComponent,
    StatDetailPageComponent,
    AdminPanelPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    FormsModule,
    NgChartsModule

  ],
  providers: [
    { provide: NgChartsConfiguration, useValue: { generateColors: true }}
  ]
})
export class AfterSigninModule { }
