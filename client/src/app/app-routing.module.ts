import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';

import { UserListComponent } from './user/user-list/user-list.component';

import { PersonListComponent } from './person/person-list/person-list.component';

import { IngresoListComponent } from './configuration/ingreso-list/ingreso-list.component';
import { CamaraComponent } from './register/camara/camara.component';

import { ConfigurationComponent } from './configuration/configuration/configuration.component';
import { ModalComponent } from './modal/modal.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'user-list', component: UserListComponent},
	{ path: 'person-list', component: PersonListComponent},
	{ path: 'camara', component: CamaraComponent},
	{ path: 'ingreso-list', component: IngresoListComponent},
	{ path: 'registro-ingresos', component: ConfigurationComponent},
	{ path: 'modal', component: ModalComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
