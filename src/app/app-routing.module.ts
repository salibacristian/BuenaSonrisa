import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AuthGuard } from './helpers/auth.guard';
import { AvailabilityComponent } from './components/availability/availability.component';
import { UsersComponent } from './components/users/users.component';


const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {path: 'home' , component: HomeComponent, canActivate: [AuthGuard]},
 {path: 'register' , component: RegisterComponent},
 {path: 'login' , component: LoginComponent},
 {path: 'newAppointment' , component: AppointmentComponent, canActivate: [AuthGuard]},
 {path: 'availability' , component: AvailabilityComponent, canActivate: [AuthGuard]},
 {path: 'users' , component: UsersComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
