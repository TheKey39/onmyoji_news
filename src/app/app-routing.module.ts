import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OutletFrontComponent } from './pages/outlet-front/outlet-front.component';
import { OutletCmsComponent } from './pages/outlet-cms/outlet-cms.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { NewsDetailComponent } from './pages/news-detail/news-detail.component';
import { AddNewsComponent } from './pages/add-news/add-news.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: OutletFrontComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { state: 'home' } },
      {
        path: 'news-detail/:id',
        component: NewsDetailComponent,
        data: { state: 'news-detail' },
      },
      { path: 'news-detail', redirectTo: '/home', pathMatch: 'full' },
      {
        path: 'register',
        component: RegisterComponent,
        data: { state: 'register' },
      },
      {
        path: 'login',
        component: LoginComponent,
        data: { state: 'login' },
      },
      {
        path: 'add-news',
        component: AddNewsComponent,
        data: { state: 'add-news' },
      },
    ],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
