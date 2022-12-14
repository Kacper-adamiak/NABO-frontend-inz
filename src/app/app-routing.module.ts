import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccountPageComponent} from './pages/after-signin/account-page/account-page.component';
import {AfterSigninComponent} from './pages/after-signin/after-signin.component';
import {CourseGeneralPageComponent} from './pages/after-signin/course-general-page/course-general-page.component';
import {CoursesPageComponent} from './pages/after-signin/courses-page/courses-page.component';
import {HomePageComponent} from './pages/after-signin/home-page/home-page.component';
import {AuthComponent} from './pages/auth/auth.component';
import {SigninPageComponent} from './pages/auth/signin-page/signin-page.component';
import {StartingPageComponent} from './pages/starting-page/starting-page.component';
import {LevelsPageComponent} from "./pages/after-signin/levels-page/levels-page.component";
import {LevelGeneralPageComponent} from "./pages/after-signin/level-general-page/level-general-page.component";
import {FlashcardsPageComponent} from "./pages/after-signin/flashcards-page/flashcards-page.component";
import {TestQuestionsPageComponent} from "./pages/after-signin/test-questions-page/test-questions-page.component";
import {ExercisesPageComponent} from "./pages/after-signin/exercises-page/exercises-page.component";
import {
  FlashcardGeneralPageComponent
} from "./pages/after-signin/flashcard-general-page/flashcard-general-page.component";
import {StatsPageComponent} from "./pages/after-signin/stats-page/stats-page.component";
import {StatDetailPageComponent} from "./pages/after-signin/stat-detail-page/stat-detail-page.component";
import {AdminPanelPageComponent} from "./pages/after-signin/admin-panel-page/admin-panel-page.component";
import {
  TestQuestionGeneralPageComponent
} from "./pages/after-signin/test-question-general-page/test-question-general-page.component";
import {ExerciseGeneralPageComponent} from "./pages/after-signin/exercise-general-page/exercise-general-page.component";
import {
  AccountEditPageComponent
} from "./pages/after-signin/account-page/account-edit-page/account-edit-page.component";
import {ResetPasswordPageComponent} from "./pages/reset-password-page/reset-password-page.component";
import {Role} from "./enums/role";
import {LoginGuard} from "./guards/login.guard";
import {RoleGuard} from "./guards/role.guard";

const routes: Routes = [
  {path: "", component: StartingPageComponent},
  {path: "reset", component: ResetPasswordPageComponent},
  {path: "home", component: AfterSigninComponent, children: [
    {path: "", component: HomePageComponent},
    {path: 'account', component: AccountPageComponent},
    {path: 'account/edit', component: AccountEditPageComponent},
    {path: 'courses', component: CoursesPageComponent},
    {path: 'courses/:courseId', component: CourseGeneralPageComponent},
    {path: 'courses/:courseId/levels', component: LevelsPageComponent},
    {path: 'courses/:courseId/levels/:levelId', component: LevelGeneralPageComponent},
    {path: 'courses/:courseId/levels/:levelId/flashcards', component: FlashcardsPageComponent},
    {path: 'courses/:courseId/levels/:levelId/flashcards/:flashcardId', component: FlashcardGeneralPageComponent},
    {path: 'courses/:courseId/levels/:levelId/exercises', component: ExercisesPageComponent},
    {path: 'courses/:courseId/levels/:levelId/exercises/:exerciseId', component: ExerciseGeneralPageComponent},
    {path: 'courses/:courseId/levels/:levelId/testquestions', component: TestQuestionsPageComponent},
    {path: 'courses/:courseId/levels/:levelId/testquestions/:testQuestionId', component: TestQuestionGeneralPageComponent},
    {path: 'stats', component: StatsPageComponent},
    {path: 'stats/:courseId', component: StatDetailPageComponent},
    {path: 'adminpanel', component: AdminPanelPageComponent, canActivate: [RoleGuard], data: {role: Role.ROLE_SUPERADMIN}},
  ], canActivate: [LoginGuard]},
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
