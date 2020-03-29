import { ErrorInterceptor } from './_helpers/error.interceptor';

import { NgModule } from '@angular/core';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCardModule, MatInputModule, MatListModule, MatToolbarModule, MatIconModule, MatProgressSpinnerModule, MatGridListModule } from '@angular/material';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';

import { UserAddComponent } from './user/user-add/user-add.component';
import { UserEditComponent } from './user/user-edit/user-edit.component';
import { UserListComponent } from './user/user-list/user-list.component';

import { PersonAddComponent } from './person/person-add/person-add.component';
import { PersonEditComponent } from './person/person-edit/person-edit.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { PhotoComponent } from './person/photo/photo.component';

import { CamaraComponent } from './register/camara/camara.component';

import { IngresoListComponent } from './configuration/ingreso-list/ingreso-list.component';

import { ConfigurationComponent } from './configuration/configuration/configuration.component';
import { ModalComponent } from './modal/modal.component';

const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user-add', component: UserAddComponent},
  { path: 'user-edit/:id', component: UserEditComponent},
  { path: 'user-list', component: UserListComponent},
  { path: 'person-add', component: PersonAddComponent},
  { path: 'person-edit/:id', component: PersonEditComponent},
  { path: 'person-list', component: PersonListComponent},
  { path: 'photo/:dni', component: PhotoComponent},
  { path: 'camara', component: CamaraComponent},
  { path: 'ingreso-list', component: IngresoListComponent},
  { path: 'configuration', component: ConfigurationComponent},
  { path: 'modal', component: ModalComponent},
  { path: '**', redirectTo: '' } // otherwise redirect to home
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UserAddComponent,
    UserEditComponent,
    UserListComponent,
    PersonAddComponent,
    PersonEditComponent,
    PersonListComponent,
    PhotoComponent,
    IngresoListComponent,
    CamaraComponent,
    ConfigurationComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatButtonModule,
    MatCardModule,
    MatInputModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatGridListModule,
    FormsModule,
    ReactiveFormsModule,
    NgbModule,
    NgbPaginationModule, 
    NgbAlertModule,
    MatDialogModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
