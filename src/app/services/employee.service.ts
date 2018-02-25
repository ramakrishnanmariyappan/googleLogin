import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';

@Injectable()
export class EmployeeService {
  employees: any = null;
  constructor(private http: Http, private router: Router) {
  }
  public viewEmployees(): Observable<EmployeeList> {
    return this.http.get('http://localhost:3000/viewEmployees')
      .map((data) => {
        console.log('employee data' + data.json());
        return <EmployeeList>data.json();
      }, error => {
        console.log(error.json());
      });
  }
}
export class EmployeeList {
    name: String;
    email: String;
    dob: Date;
    department: String;
    gender: String;
    age: Number;
}
