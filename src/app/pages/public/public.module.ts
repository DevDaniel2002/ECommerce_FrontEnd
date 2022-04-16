import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HomeComponent, LoginComponent } from './public.index';
import { HttpClientModule } from '@angular/common/http';
import { PublicRoutingModule } from './public.routing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        PublicRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    exports: [
        HomeComponent,
        LoginComponent
    ],
    declarations: [
        HomeComponent,
        LoginComponent
    ],
    providers: [],
})
export class PublicModule { }
