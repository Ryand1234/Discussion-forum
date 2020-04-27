import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegisterComponent } from './register/register.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { LoginComponent } from './login/login.component';
import { ThreadComponent } from './thread/thread.component';
import { SearchComponent } from './search/search.component';
import { ProfileComponent } from './profile/profile.component';
import { LogoutComponent } from './logout/logout.component';
import { ReactiveFormsModule } from '@angular/forms';
import { NewThreadComponent } from './thread/new-thread/new-thread.component';
import { SingleThreadComponent } from './thread/single-thread/single-thread.component';
import { PublicProfileComponent } from './public-profile/public-profile.component';

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LoginComponent,
    ThreadComponent,
    SearchComponent,
    ProfileComponent,
    LogoutComponent,
    NewThreadComponent,
    SingleThreadComponent,
    PublicProfileComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    MatToolbarModule, 
    MatFormFieldModule,
    FormsModule,
    MatCardModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
