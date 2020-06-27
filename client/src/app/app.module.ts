import { ErrorInterceptor } from './_helpers/error.interceptor';

import { NgModule } from '@angular/core';
import {NgbPaginationModule, NgbAlertModule} from '@ng-bootstrap/ng-bootstrap';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule, MatCardModule, MatInputModule,
  MatListModule, MatToolbarModule, MatIconModule,
  MatProgressSpinnerModule, MatGridListModule, MatDialogModule, MatDividerModule,
  MatSelectModule
} from '@angular/material';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule} from '@angular/forms';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Route } from '@angular/router';
import { MatDialogModule} from '@angular/material/dialog';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { JwtInterceptor } from './_helpers/jwt.interceptor';

import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { PersonListComponent } from './person/person-list/person-list.component';
import { CamaraComponent } from './register/camara/camara.component';
import { IngresoListComponent } from './configuration/ingreso-list/ingreso-list.component';
import { ConfigurationComponent } from './configuration/configuration/configuration.component';
import { ModalComponent } from './modal/modal.component';
import { ErrorComponent } from './error/error.component';
//import { fakeBackendProvider } from './_helpers/fake-backend';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { Error403Component } from './httpError/error403/error403.component';
import { Error500Component } from './httpError/error500/error500.component';
import { ExitButtonComponent } from './buttons/exit-button/exit-button.component';
import { BackButtonComponent } from './buttons/back-button/back-button.component';
import { UserShowComponent } from './users/user-show/user-show.component';
import { UserDeleteComponent } from './users/user-delete/user-delete.component';


const routes: Route[] = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
	{ path: 'home', component: HomeComponent},
  { path: 'login', component: LoginComponent},
  { path: 'user-list', component: UserListComponent},
  { path: 'person-list', component: PersonListComponent},
  { path: 'camara', component: CamaraComponent},
  { path: 'ingreso-list', component: IngresoListComponent},
  { path: 'registro-ingresos', component: ConfigurationComponent},
  { path: 'modal', component: ModalComponent},
  { path: '**', redirectTo: '' } // otherwise redirect to home
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    HomeComponent,
    UserListComponent,
    PersonListComponent,
    IngresoListComponent,
    CamaraComponent,
    ConfigurationComponent,
    ModalComponent,
    ErrorComponent
    UserEditComponent,
    Error403Component,
    Error500Component,
    ExitButtonComponent,
    BackButtonComponent,
    UserShowComponent,
    UserDeleteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'}),    
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
    MatPaginatorModule,
    MatSortModule,
    MatTableModule,
    MatDividerModule,
    MatSelectModule
  ],
  entryComponents: [
    UserEditComponent,
    UserShowComponent,
    UserDeleteComponent
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true }
    // provider used to create fake backend
    //fakeBackendProvider
],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]
})
export class AppModule { }
