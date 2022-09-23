import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountPageComponent } from './after-signin/account-page/account-page.component';
import { AfterSigninComponent } from './after-signin/after-signin.component';
import { CoursesPageComponent } from './after-signin/courses-page/courses-page.component';
import { HomePageComponent } from './after-signin/home-page/home-page.component';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { SigninPageComponent } from './auth/signin-page/signin-page.component';

const routes: Routes = [
  {path: "", component: AppComponent, children: [
    {path: "", component: AfterSigninComponent, children: [
      {path: "home", component: HomePageComponent},
      {path: 'account', component: AccountPageComponent},
      {path: 'courses', component: CoursesPageComponent},
      {path: '',   component: HomePageComponent},
    ]},
    {path: "auth", component: AuthComponent, children: [
      {path: "signin", component: SigninPageComponent}
    ]}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
