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
import { PublicProfileComponent } from './public-profile/public-profile.component';
import { UpdateComponent } from './profile/update/update.component';


const routes: Routes = [
{ path: '', redirectTo: 'home', pathMatch: 'full'},
{ path: 'register', component: RegisterComponent },
{ path: 'login', component: LoginComponent },
{ path: 'profile', component: ProfileComponent },
{ path: 'profile/edit', component: UpdateComponent },
{ path: 'home', component: ThreadComponent },
{ path: 'user/:token', component: PublicProfileComponent },
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
