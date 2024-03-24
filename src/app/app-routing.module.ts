import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { BootstrapFormComponent } from './components/bootstrap-form/bootstrap-form.component';

export const routes: Routes = [
  {path:'', redirectTo: '/signin', pathMatch:"full"},
  {path:'signin', component: SigninComponent},
  {path:'BootstrapForm', component: BootstrapFormComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
