import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { LoadFileComponent } from './pages/load-file/load-file.component';
import { UserComponent } from './pages/user/user.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'load-file', component: LoadFileComponent, canActivate: [authGuard] },
    { path: 'user', component: UserComponent, canActivate: [authGuard] },
    { path: '**', redirectTo: 'login' }
];
