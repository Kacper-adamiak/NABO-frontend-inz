import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AfterSigninComponent} from './after-signin.component';
import {HomePageComponent} from './home-page/home-page.component';
import {RouterModule} from '@angular/router';
import {AccountPageComponent} from './account-page/account-page.component';
import {CoursesPageComponent} from './courses-page/courses-page.component';
import {CourseGeneralPageComponent} from './course-general-page/course-general-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MaterialExampleModule} from 'src/material.module';
import {NewCourseDialogComponent} from './courses-page/new-course-dialog/new-course-dialog.component';
import {LevelsPageComponent} from './levels-page/levels-page.component';
import {NewLevelDialogComponent} from './levels-page/new-level-dialog/new-level-dialog.component';
import {LevelGeneralPageComponent} from "./level-general-page/level-general-page.component";
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
import {TestQuestionGeneralPageComponent} from './test-question-general-page/test-question-general-page.component';
import {AccountEditPageComponent} from './account-page/account-edit-page/account-edit-page.component';
import {
  AddNewCategoryPanelComponent
} from './admin-panel-page/components/add-new-category-panel/add-new-category-panel.component';
import {
  PotentialCategoriesPanelComponent
} from './admin-panel-page/components/potential-categories-panel/potential-categories-panel.component';
import {CategoriesPanelComponent} from './admin-panel-page/components/categories-panel/categories-panel.component';
import {
  EditCourseDialogComponent
} from './admin-panel-page/components/categories-panel/edit-course-dialog/edit-course-dialog.component';
import {UsersPanelComponent} from './admin-panel-page/components/users-panel/users-panel.component';
import {
  AddNewCreatorPanelComponent
} from './admin-panel-page/components/add-new-creator-panel/add-new-creator-panel.component';
import {
  NewPotentialCategoryDialogComponent
} from './courses-page/new-potential-category-dialog/new-potential-category-dialog.component';
import {SharedModule} from "../../shared/shared.module";
import {DelateAccountDialogComponent} from './account-page/delate-account-dialog/delate-account-dialog.component';


@NgModule({
  declarations: [
    AfterSigninComponent,
    HomePageComponent,
    AccountPageComponent,
    CoursesPageComponent,
    CourseGeneralPageComponent,
    NewCourseDialogComponent,
    LevelsPageComponent,
    NewLevelDialogComponent,
    LevelGeneralPageComponent,
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
    AdminPanelPageComponent,
    TestQuestionGeneralPageComponent,
    AccountEditPageComponent,
    AddNewCategoryPanelComponent,
    PotentialCategoriesPanelComponent,
    CategoriesPanelComponent,
    EditCourseDialogComponent,
    UsersPanelComponent,
    AddNewCreatorPanelComponent,
    NewPotentialCategoryDialogComponent,
    DelateAccountDialogComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    FormsModule,
    NgChartsModule,
    SharedModule

  ],
  providers: [
    {provide: NgChartsConfiguration, useValue: {generateColors: true}}
  ]
})
export class AfterSigninModule { }
