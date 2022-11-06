import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './pages/after-signin/account-page/account-page.component';
import { AfterSigninComponent } from './pages/after-signin/after-signin.component';
import { CourseGeneralPageComponent } from './pages/after-signin/course-general-page/course-general-page.component';
import { CoursesPageComponent } from './pages/after-signin/courses-page/courses-page.component';
import { HomePageComponent } from './pages/after-signin/home-page/home-page.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './pages/auth/auth.component';
import { SigninPageComponent } from './pages/auth/signin-page/signin-page.component';
import { IsAuthenticatedGuard } from './guards/is-authenticated.guard';
import { StartingPageComponent } from './pages/starting-page/starting-page.component';
import {LevelsPageComponent} from "./pages/after-signin/levels-page/levels-page.component";

const routes: Routes = [
  {path: "", component: StartingPageComponent},
  {path: "home", component: AfterSigninComponent, children: [
    {path: "", component: HomePageComponent},
    {path: 'account', component: AccountPageComponent},
    {path: 'courses', component: CoursesPageComponent},
    {path: 'courses/:courseId', component: CourseGeneralPageComponent},
    {path: 'courses/:courseId/levels', component: LevelsPageComponent},
  ], canActivate: [IsAuthenticatedGuard]},
  {path: "auth", component: AuthComponent, children: [
    {path: "signin", component: SigninPageComponent}
  ]},
  // {path: "**", redirectTo: '/'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
