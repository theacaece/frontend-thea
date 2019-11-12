import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './_helpers/auth.guard';

import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';

import { PersonAddComponent } from './person/person-add/person-add.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PhotoComponent } from './person/photo/photo.component';

import { CamaraComponent } from './register/camara/camara.component';

const routes: Routes = [
	{ path: '', component: HomeComponent, canActivate: [AuthGuard] },
	{ path: 'login', component: LoginComponent },
	{ path: 'user-add', component: UserAddComponent},
	{ path: 'user-edit/:id', component: UserEditComponent},
	{ path: 'user-list', component: UserListComponent},
	{ path: 'person-add', component: PersonAddComponent},
	{ path: 'person-edit/:id', component: PersonEditComponent},
	{ path: 'person-list', component: PersonListComponent},
	{ path: 'photo/:id', component: PhotoComponent},
	{ path: 'camara', component: CamaraComponent},
    { path: '**', redirectTo: '' }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
