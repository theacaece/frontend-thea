import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';

import { UserListComponent } from './user/user-list/user-list.component';
import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';

import { PersonListComponent } from './person/person-list/person-list.component';
import { PersonAddComponent } from './person/person-add/person-add.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';

import { IngresoListComponent } from './configuration/ingreso-list/ingreso-list.component';
import { CamaraComponent } from './register/camara/camara.component';

import { ConfigurationComponent } from './configuration/configuration/configuration.component';

import { ModalComponent } from './modal/modal.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
	{ path: '', component: LoginComponent, canActivate: [AuthGuard] },
	{ path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'user-list', component: UserListComponent, canActivate: [AuthGuard] },
	{ path: 'user-add', component: UserAddComponent, canActivate: [AuthGuard] } ,
	{ path: 'user-edit/:id', component: UserEditComponent, canActivate: [AuthGuard] },
	{ path: 'person-list', component: PersonListComponent, canActivate: [AuthGuard] },
	{ path: 'person-add', component: PersonAddComponent, canActivate: [AuthGuard] },
	{ path: 'person-edit/:id', component: PersonEditComponent, canActivate: [AuthGuard] },
	{ path: 'camara', component: CamaraComponent, canActivate: [AuthGuard] },
	{ path: 'ingreso-list', component: IngresoListComponent, canActivate: [AuthGuard] },
	{ path: 'registro-ingresos', component: ConfigurationComponent, canActivate: [AuthGuard] },
	{ path: 'modal', component: ModalComponent, canActivate: [AuthGuard] },
    { path: '**', component: ErrorComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
