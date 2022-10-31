import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './after-signin/account-page/account-page.component';
import { AfterSigninComponent } from './after-signin/after-signin.component';
import { CourseGeneralPageComponent } from './after-signin/course-general-page/course-general-page.component';
import { CoursesPageComponent } from './after-signin/courses-page/courses-page.component';
import { HomePageComponent } from './after-signin/home-page/home-page.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SigninPageComponent } from './auth/signin-page/signin-page.component';
import { IsAuthenticatedGuard } from './is-authenticated.guard';
import { StartingPageComponent } from './starting-page/starting-page/starting-page.component';

const routes: Routes = [
  {path: "", component: StartingPageComponent},
  {path: "home", component: AfterSigninComponent, children: [
    {path: "", component: HomePageComponent},
    {path: 'account', component: AccountPageComponent},
    {path: 'courses', component: CoursesPageComponent},
    {path: 'courses/animals', component: CourseGeneralPageComponent},
  ], canActivate: [IsAuthenticatedGuard]},
  {path: "auth", component: AuthComponent, children: [
    {path: "signin", component: SigninPageComponent}
  ]},
  {path: "**", redirectTo: '/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
