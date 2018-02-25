import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';
import { EmployeeService } from '../services/employee.service';
@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: any = [];
  constructor(private service: EmployeeService, private http: Http, private router: Router) { }
  getEmployees() {
    this.service.viewEmployees().subscribe((employee) => {
      this.employees = employee;
    });
  }
  deleteEmployee(id) {
    this.http.get('http://localhost:3000/deleteEmployee/' + id).subscribe(
      (res) => {
        this.getEmployees();
      },
      (error) => {
        console.log('some error happend on delete' + error.json());
      }
    );
  }
  ngOnInit() {
    this.getEmployees();
  }
}
