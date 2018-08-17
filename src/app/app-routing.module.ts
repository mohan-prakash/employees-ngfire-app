import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/auth/login/login.component';
import { EmployeesComponent } from './components/employees/employees.component';
import { AuthGuard } from './guards/auth.guard';

const appRoutes: Routes = [
  { path: '', redirectTo: '/login', pathMatch : 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'home', redirectTo: '/employees', pathMatch : 'full' },
  { path: 'employees', component: EmployeesComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
