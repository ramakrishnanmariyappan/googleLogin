import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { EmployeeComponent } from './employee-add/employee.component';
import { EmployeeListComponent } from './employee-list/employee-list.component';
import { AppComponent } from './app.component';
import { DummyComponent } from './dummy/dummy.component';

export const appRoute: Routes = [
    {
        path: 'home', component: HomeComponent
    },
    {
        path: 'employeeadd', component: EmployeeComponent
    },

    { path: '', component: HomeComponent },

    { path: 'dummy', component: DummyComponent },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})

export class AppRoutingModule { }
