import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './pages/main/main.component';
import { AddItemComponent } from './pages/add-item/add-item.component';
import { ResultComponent } from './pages/result/result.component';

const routes: Routes = [
  { path: '', component: MainComponent },
  { path: 'manage-set', component: MainComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'result', component: ResultComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
