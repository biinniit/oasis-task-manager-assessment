import { Routes } from '@angular/router'
import { authGuard } from './auth/auth.service'
import { LoginComponent } from './auth/login.component'
import { RegisterComponent } from './auth/register.component'
import { DashboardComponent } from './dashboard/dashboard.component'

export const routes: Routes = [
  { path: 'sign-up', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'tasks', component: DashboardComponent, canActivate: [authGuard] },
  {
    path: '',
    redirectTo: 'tasks',
    pathMatch: 'full'
  }
]
