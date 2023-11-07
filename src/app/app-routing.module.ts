import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SigninComponent } from '../app/auth/components/signin/signin.component';
import { SignupComponent } from './auth/components/signup/signup.component';

const routes: Routes = [
  { path: 'signin', component: SigninComponent },
  { path: 'admin', component: SignupComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
