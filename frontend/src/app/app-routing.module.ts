import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ThreadComponent } from './thread/thread.component';
import { SearchComponent } from './search/search.component';
import { LogoutComponent } from './logout/logout.component';
import { ProfileComponent } from './profile/profile.component';
import { NewThreadComponent } from './thread/new-thread/new-thread.component';
import { SingleThreadComponent } from './thread/single-thread/single-thread.component';

const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full'},
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'home', component: ThreadComponent },
{ path: 'thread/new', component: NewThreadComponent },
{ path: 'thread/:id', component: SingleThreadComponent },
{ path: 'search', component: SearchComponent },
{ path: 'logout', component: LogoutComponent },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
