import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomePageComponent } from '../components/home-page/home-page.component';
import { AboutPageComponent } from '../components/about-page/about-page.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomePageComponent
    },
    {
        path: 'about',
        component: AboutPageComponent
    }
];

//export const appRoutingProviders: any[] = [];

//export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes, { useHash: true });

export const routing = RouterModule.forRoot(appRoutes, { useHash: true });