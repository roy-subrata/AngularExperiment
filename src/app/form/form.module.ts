import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FormComponent } from './form.component';

import { SharedModule } from '../shared/shared.module';
import { FormNavComponent } from './formnav/formnav.component';
import { ReactiveformComponent } from './reactiveform/reactiveform.component';


const routePath: Routes = [
    {
        path: '', component: FormComponent, children: [
            { path: 'reactive', component: ReactiveformComponent }
        ]
    },

]

@NgModule({
    declarations: [FormComponent, FormNavComponent, ReactiveformComponent],
    exports: [SharedModule, RouterModule],
    imports: [SharedModule, RouterModule.forChild(routePath)]
})
export class FormModule {

}