import { NgModule } from '@angular/core';
import { AdminModule } from './admin/admin.module';
import { PublicModule } from './public/public.module';


@NgModule({
    imports: [
        PublicModule,
        AdminModule
    ],
    exports: [
        PublicModule,
        AdminModule
    ],
    declarations: [
    ],
    providers: [],
})
export class PagessModule { }
