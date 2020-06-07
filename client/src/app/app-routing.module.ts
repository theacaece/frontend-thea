import { Error403Component } from './httpError/error403/error403.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { AuthGuard } from './_helpers/auth.guard';

const routes: Routes = [
	//{path: '', redirectTo: '/login', pathMatch: 'full' },
	//{path: 'login', component: LoginComponent},
	//{path: 'home', component: HomeComponent}
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'user/list', component: UserListComponent, canActivate: [AuthGuard] },
	{ path: 'httpError/403', component: Error403Component, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },

    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
