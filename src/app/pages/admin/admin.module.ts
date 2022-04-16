import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin.routing';
import { AdminHomeComponent } from './admin.index';

@NgModule({
    imports: [
        HttpClientModule,
        RouterModule,
        CommonModule,
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
