import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from '../components/home-page/home-page.component';
import { AboutPageComponent } from '../components/about-page/about-page.component';

const appRoutes: Routes = [
    {
        path: '',
        component: HomePageComponent
    },
    {
        path: 'about',
        component: AboutPageComponent
    },
    {   // not found pages redirected to home
        path: '**',
        redirectTo: '/',
    } 
];

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });