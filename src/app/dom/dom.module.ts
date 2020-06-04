import { NgModule } from "@angular/core";
import { DomComponent } from './dom.component';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';



const routePath: Routes = [
    {
        path: '', component: DomComponent
    }
];

@NgModule(
    {
        declarations: [DomComponent],
        exports: [SharedModule, RouterModule],
        imports: [
            SharedModule, RouterModule.forChild(routePath)
        ]
    }
)

export class DomModule {

}