import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../shared/guards/login.guard';
import { AdminRoutingModule } from './admin/admin.routing';
import { PublicRoutingModule } from './public/public.routing';

const routes: Routes = [
    {   path: 'public', 
        loadChildren: () => import('./public/public.module').then(m => m.PublicModule) 
    },
    { 
        path: 'admin', 
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule),
        canActivate: [LoginGuard],
        canActivateChild: [LoginGuard],
        canLoad: [LoginGuard]
    },
    { path: '', redirectTo: 'public', pathMatch: 'full' },
    { path: '**', redirectTo: 'public', pathMatch: 'full' },
];

@NgModule({
    imports: [
      RouterModule.forChild(routes),
    //   PublicRoutingModule,
    //   AdminRoutingModule
    ],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
