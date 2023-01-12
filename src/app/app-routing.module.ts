import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { GuardService } from './services/guard.service';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'home', canActivate: [GuardService], component: HomeComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})

export class AppRoutingModule { }
