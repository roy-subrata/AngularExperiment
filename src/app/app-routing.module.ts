import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [

  { path: 'dom', loadChildren: () => import('./dom/dom.module').then(m => m.DomModule) },
  { path: 'form', loadChildren: () => import('./form/form.module').then(m => m.FormModule) },
  {
    path: '**',
    redirectTo: "/"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
