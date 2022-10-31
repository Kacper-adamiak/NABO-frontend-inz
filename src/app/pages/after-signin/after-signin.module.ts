import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterSigninComponent } from './after-signin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseGeneralPageComponent, DialogOverviewExampleDialog } from './course-general-page/course-general-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialExampleModule } from 'src/material.module';



@NgModule({
  declarations: [
    AfterSigninComponent,
    HomePageComponent,
    AccountPageComponent,
    CoursesPageComponent,
    CourseGeneralPageComponent,
    DialogOverviewExampleDialog
  ],
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
  ]
})
export class AfterSigninModule { }
