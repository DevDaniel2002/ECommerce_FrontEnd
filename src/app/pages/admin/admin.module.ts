import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { AdminHomeComponent } from './admin.index';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        AdminRoutingModule
    ],
    exports: [
        AdminHomeComponent
    ],
    declarations: [
        AdminHomeComponent
    ],
    providers: [],
})
export class AdminModule { }
