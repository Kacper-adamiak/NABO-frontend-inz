import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AfterSigninComponent } from './after-signin.component';
import { HomePageComponent } from './home-page/home-page.component';
import { RouterModule } from '@angular/router';
import { AccountPageComponent } from './account-page/account-page.component';
import { CoursesPageComponent } from './courses-page/courses-page.component';
import { CourseGeneralPageComponent } from './course-general-page/course-general-page.component';



@NgModule({
  declarations: [
    AfterSigninComponent,
    HomePageComponent,
    AccountPageComponent,
    CoursesPageComponent,
    CourseGeneralPageComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ]
})
export class AfterSigninModule { }
