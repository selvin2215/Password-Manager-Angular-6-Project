import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AngularWebStorageModule } from 'angular-web-storage';
import { HttpClientModule } from '@angular/common/http';

import { ApiService } from './common/db/api.service';
import { AuthService } from './common/authentication/auth.service';
import { AuthGuard } from './common/authentication/auth.guard';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { NewPasswordComponent } from './new-password/new-password.component';
import { PasswordDetailComponent } from './password-detail/password-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ListPasswordComponent } from './dashboard/list-password/list-password.component';
import { PageTitleComponent } from './common/page-title/page-title.component';
import { AddUpdateFormComponent } from './common/add-update-form/add-update-form.component';
import { LoginComponent } from './login/login.component';


import { IconPipe } from './pipes/icon.pipe';
import { environment } from '../environments/environment';
import { LoginFormComponent } from './login/login-form/login-form.component';
import { RegisterFormComponent } from './login/register-form/register-form.component';
import { FilterPipe } from './pipes/filter.pipe';



const routes : Routes = [
	{ path : 'login', component : LoginComponent},
  { path : 'dashboard', component : DashboardComponent, canActivate : [AuthGuard] },
	{ path : 'new/password', component : NewPasswordComponent, canActivate : [AuthGuard]  },
	{ path : 'password/:id', component : PasswordDetailComponent, canActivate : [AuthGuard]  },
	{ path : '', redirectTo : '/dashboard', pathMatch : 'full'},
	{ path : '**', component : PageNotFoundComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    NewPasswordComponent,
    PasswordDetailComponent,
    PageNotFoundComponent,
    ListPasswordComponent,
    IconPipe,
    PageTitleComponent,
    AddUpdateFormComponent,
    LoginComponent,
    LoginFormComponent,
    RegisterFormComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes),
    AngularWebStorageModule
  ],
  providers: [AuthService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
