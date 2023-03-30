import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { OutletFrontComponent } from './pages/outlet-front/outlet-front.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: '',
    component: OutletFrontComponent,
    children: [
      { path: 'home', component: HomeComponent, data: { state: 'home' } },
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
