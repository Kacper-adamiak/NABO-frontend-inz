import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterSigninComponent } from './after-signin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseGeneralPageComponent, DialogOverviewExampleDialog } from './course-general-page/course-general-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MaterialExampleModule } from 'src/material.module';
import { NewCourseDialogComponent } from './courses-page/new-course-dialog/new-course-dialog.component';



@NgModule({
  declarations: [
    AfterSigninComponent,
    HomePageComponent,
    AccountPageComponent,
    CoursesPageComponent,
    CourseGeneralPageComponent,
    DialogOverviewExampleDialog,
    NewCourseDialogComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    MaterialExampleModule,
    FormsModule
  ]
})
export class AfterSigninModule { }
