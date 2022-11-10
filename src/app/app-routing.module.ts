import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountPageComponent} from './pages/after-signin/account-page/account-page.component';
import {AfterSigninComponent} from './pages/after-signin/after-signin.component';
import {CourseGeneralPageComponent} from './pages/after-signin/course-general-page/course-general-page.component';
import {CoursesPageComponent} from './pages/after-signin/courses-page/courses-page.component';
import {HomePageComponent} from './pages/after-signin/home-page/home-page.component';
import {AuthComponent} from './pages/auth/auth.component';
import {SigninPageComponent} from './pages/auth/signin-page/signin-page.component';
import {IsAuthenticatedGuard} from './guards/is-authenticated.guard';
import {StartingPageComponent} from './pages/starting-page/starting-page.component';
import {LevelsPageComponent} from "./pages/after-signin/levels-page/levels-page.component";
import {LevelGeneralPageComponent} from "./pages/after-signin/level-general-page/level-general-page.component";
import {FlashcardsPageComponent} from "./pages/after-signin/flashcards-page/flashcards-page.component";
import {TestQuestionsPageComponent} from "./pages/after-signin/test-questions-page/test-questions-page.component";
import {ExercisesPageComponent} from "./pages/after-signin/exercises-page/exercises-page.component";
import {
  FlashcardGeneralPageComponent
} from "./pages/after-signin/flashcard-general-page/flashcard-general-page.component";

const routes: Routes = [
  {path: "", component: StartingPageComponent},
  {path: "home", component: AfterSigninComponent, children: [
    {path: "", component: HomePageComponent},
    {path: 'account', component: AccountPageComponent},
    {path: 'courses', component: CoursesPageComponent},
    {path: 'courses/:courseId', component: CourseGeneralPageComponent},
    {path: 'courses/:courseId/levels', component: LevelsPageComponent},
      {path: 'courses/:courseId/levels/:levelId', component: LevelGeneralPageComponent},
      {path: 'courses/:courseId/levels/:levelId/flashcards', component: FlashcardsPageComponent},
      {path: 'courses/:courseId/levels/:levelId/flashcards/:flashcardId', component: FlashcardGeneralPageComponent},
      {path: 'courses/:courseId/levels/:levelId/exercises', component: ExercisesPageComponent},
      {path: 'courses/:courseId/levels/:levelId/testquestions', component: TestQuestionsPageComponent},
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
