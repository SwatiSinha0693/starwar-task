import { Routes, RouterModule } from '@angular/router';

import { PlanetComponent } from './planet/planet.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './_guards/auth.guard';

const appRoutes: Routes = [
    { path: 'planet', component: PlanetComponent, canActivate: [AuthGuard] },
    {
        path: '', //default 
        pathMatch: 'prefix',
        redirectTo: 'login'
    },
    { path: 'login', component: LoginComponent },
    { path: '**', redirectTo: 'login', pathMatch: 'full'}
];

export const routing = RouterModule.forRoot(appRoutes);
