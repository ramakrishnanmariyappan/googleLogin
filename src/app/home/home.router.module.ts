import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home.component';
import { EmployeeComponent } from '../employee-add/employee.component';
import { EmployeeListComponent } from '../employee-list/employee-list.component';
// Card routing using id based here
export const HomeRoute: Routes = [

 { path: 'home', component: HomeComponent,
    children: [
        { path: 'employeeadd', component: EmployeeComponent },
        { path: 'employeelist', component: EmployeeListComponent },
    ]
 }
];

@NgModule({
    imports: [RouterModule.forChild(HomeRoute)],
    exports: [RouterModule],
})
export class HomeRoutingModule { }
