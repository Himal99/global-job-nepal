import { Routes } from '@angular/router';
import { UserDashboard } from './pages/dashboard/user-dashboard/user-dashboard';
import { ProfileComponent } from './pages/profile/profile.component';
import { FormElementsComponent } from './pages/forms/form-elements/form-elements.component';
import { BasicTablesComponent } from './pages/tables/basic-tables/basic-tables.component';
import { BlankComponent } from './pages/blank/blank.component';
import { NotFoundComponent } from './pages/other-page/not-found/not-found.component';
import { AppLayoutComponent } from './shared/layout/app-layout/app-layout.component';
import { InvoicesComponent } from './pages/invoices/invoices.component';
import { LineChartComponent } from './pages/charts/line-chart/line-chart.component';
import { BarChartComponent } from './pages/charts/bar-chart/bar-chart.component';
import { AlertsComponent } from './pages/ui-elements/alerts/alerts.component';
import { AvatarElementComponent } from './pages/ui-elements/avatar-element/avatar-element.component';
import { BadgesComponent } from './pages/ui-elements/badges/badges.component';

import { VideosComponent } from './pages/ui-elements/videos/videos.component';
import { SignInComponent } from './pages/auth-pages/sign-in/sign-in.component';
import { SignUpComponent } from './pages/auth-pages/sign-up/sign-up.component';
import { CalenderComponent } from './pages/calender/calender.component';
import {JobsComponent} from "./pages/jobs/jobs.component";
import {authGuard} from "./guards/auth.guard";
import {logoutGuard} from "./guards/logout.guard";
import {JobDescComponent} from "./pages/job-desc/job-desc.component";
import {AiComponent} from "./pages/ai/ai.component";
import {PrepareLoksewaComponent} from "./loksewa/prepare-loksewa/prepare-loksewa.component";
import {FaqComponent} from "./pages/faq/faq.component";
import {LoksewaNewsComponent} from "./loksewa/loksewa-news/loksewa-news.component";
import {UserDetailComponent} from "./pages/user-detail/user-detail.component";
import {CvComponent} from "./pages/cv/cv.component";
import {Cv3Component} from "./pages/cv/cv3/cv3.component";
import {CvGeneratorComponent} from "./pages/cv/cv-generator/cv-generator.component";
import {MyFilesComponent} from "./pages/my-files/my-files.component";
import {QuizComponent} from "./loksewa/quiz/quiz.component";
import {LoksewaExamComponent} from "./loksewa/loksewa-exam/loksewa-exam.component";
import {LoksewaMcqComponent} from "./loksewa/loksewa-mcq/loksewa-mcq.component";
import {BlogDashboardComponent} from "./my-blog/blog-dashboard/blog-dashboard.component";

export const routes: Routes = [
  {
    path:'',
    component:AppLayoutComponent,
    children:[
      {
        path: '',
       redirectTo:'/signin',
        pathMatch: 'full',
        title:
            'Udaan | Signin',
      },
      {
        path: 'home',
        component: UserDashboard,
        pathMatch: 'full',
        title:
          'Udaan | Dashboard',
        canActivate:[authGuard]
      },
      {
        path: 'loksewa-exam',
        component: LoksewaExamComponent,
        pathMatch: 'full',
        title:
            'Udaan | Dashboard',
        canActivate:[authGuard]
      },
      {
        path: 'loksewa-mcq',
        component: LoksewaMcqComponent,
        pathMatch: 'full',
        title:
            'Udaan | Dashboard',
        canActivate:[authGuard]
      },
      {
        path: 'quiz',
        component: QuizComponent,
        pathMatch: 'full',
        title:
            'Udaan | Dashboard',
        canActivate:[authGuard]
      },

      {
        path: 'cv',
        component: CvComponent,
        pathMatch: 'full',
        title:
            'Udaan | Dashboard',
        canActivate:[authGuard]
      },
      {
        path: 'my-files',
        component: MyFilesComponent,
        pathMatch: 'full',
        title:
            'Udaan | Dashboard',
        canActivate:[authGuard]
      },
      {
        path: 'cv-generator/:id',
        component: CvGeneratorComponent,
        pathMatch: 'full',
        title:
            'Udaan | Dashboard',
        canActivate:[authGuard]
      },
      {
        path: 'jobs',
        component: JobsComponent,
        title:
            'Udaan | Jobs',
        canActivate:[authGuard]
      },
      {
        path: 'jobs-desc',
        component: JobDescComponent,
        title:
            'Udaan | Jobs Description',
        canActivate:[authGuard]
      },
      {
        path:'calendar',
        component:CalenderComponent,
        title:'Angular Calender | TailAdmin - Angular Admin Dashboard Template',
        canActivate:[authGuard]
      },
      {
        path:'profile',
        component:ProfileComponent,
        title:'Udaan | User Profile',
        canActivate:[authGuard]
      },
      {
        path:'form-elements',
        component:FormElementsComponent,
        title:'Angular Form Elements Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate:[authGuard]
      },
      {
        path:'basic-tables',
        component:BasicTablesComponent,
        title:'Angular Basic Tables Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate:[authGuard]
      },
      {
        path:'blank',
        component:BlankComponent,
        title:'Angular Blank Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate:[authGuard]
      },
      // support tickets
      {
        path:'invoice',
        component:InvoicesComponent,
        title:'Angular Invoice Details Dashboard | TailAdmin - Angular Admin Dashboard Template',
        canActivate:[authGuard]
      },
      {
        path:'ai',
        component:AiComponent,
        title:'Udaan | AI',
        canActivate:[authGuard]
      },
      {
        path:'loksewa-prep',
        component:PrepareLoksewaComponent,
        title:'Udaan | Loksewa',
        canActivate:[authGuard]
      },
      {
        path:'faq',
        component:FaqComponent,
        title:'Udaan | Frequently asked quiestions',
        canActivate:[authGuard]
      },
      {
        path:'line-chart',
        component:LineChartComponent,
        title:'Angular Line Chart Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'bar-chart',
        component:BarChartComponent,
        title:'Angular Bar Chart Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'alerts',
        component:AlertsComponent,
        title:'Angular Alerts Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'avatars',
        component:AvatarElementComponent,
        title:'Angular Avatars Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
          path:'badge',
        component:BadgesComponent,
        title:'Angular Badges Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },

      // {
      //   path:'images',
      //   component:ImagesComponent,
      //   title:'Angular Images Dashboard | TailAdmin - Angular Admin Dashboard Template'
      // },
      {
        path:'videos',
        component:VideosComponent,
        title:'Angular Videos Dashboard | TailAdmin - Angular Admin Dashboard Template'
      },
      {
        path:'loksewa-notice',
        component:LoksewaNewsComponent,
        title:'Udaan | Loksewa Notice'
      },
      {
        path:'profile-detail/:id',
        component:UserDetailComponent,
        title:'Udaan | User Profile'
      },
      {
        path:'blog',
        component:BlogDashboardComponent,
        title:'Blog'
      },
    ]
  },
  // auth pages
  {
    path:'signin',
    component:SignInComponent,
    title:'Angular Sign In Dashboard | TailAdmin - Angular Admin Dashboard Template',
    canActivate:[logoutGuard]
  },
  {
    path:'signup',
    component:SignUpComponent,
    title:'Angular Sign Up Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
  // error pages
  {
    path:'**',
    component:NotFoundComponent,
    title:'Angular NotFound Dashboard | TailAdmin - Angular Admin Dashboard Template'
  },
];
