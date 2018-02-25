import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { Http, RequestOptions } from '@angular/http';
import { ActivatedRoute, Params, Router} from '@angular/router';
import { IMyDpOptions, IMyDateModel } from 'mydatepicker';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd.mm.yyyy',
};
year: any;
month: any;
day: any;
todayDate = new Date();
todayYear: any;
todayMonth: any;
todayDay: any;
ageCalc: any = '';
ageCount: any;
employeeId: any;
operation: String = 'Add';
public model: any = { date: '' };
name = new FormControl('', [Validators.required, Validators.nullValidator]);
email = new FormControl('', [Validators.required, Validators.nullValidator]);
dob = new FormControl('', [Validators.required, Validators.nullValidator]);
department = new FormControl('', [Validators.required, Validators.nullValidator]);
gender = new FormControl('', [Validators.required, Validators.nullValidator]);
age = new FormControl('', [Validators.required, Validators.nullValidator]);
postAdd: FormGroup;

  constructor(private fb: FormBuilder, private http: Http, private activatedRoute: ActivatedRoute, private router: Router) {
    this.createForm();
   }
   getErrorName() {
    return this.name.hasError('required') ? '' :
        this.name.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorEmail() {
    return this.email.hasError('required') ? '' :
        this.email.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorDOB() {
    return this.dob.hasError('required') ? '' :
        this.dob.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorGender() {
    return this.gender.hasError('required') ? '' :
        this.gender.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorDepartment() {
    return this.department.hasError('required') ? '' :
        this.department.hasError('nullValidator') ? 'empty input' :
            '';
  }
  getErrorAge() {
    return this.age.hasError('required') ? '' :
        this.age.hasError('nullValidator') ? 'empty input' :
            '';
  }
  ageCalculation(date: IMyDateModel) {
    if (date !== null) {
      this.year = date.date.year;
      this.month = date.date.month;
      this.day = date.date.day;
      this.todayYear = this.todayDate.getFullYear();
      this.todayMonth = this.todayDate.getMonth();
      this.todayDay = this.todayDate.getDate();
      this.ageCalc = this.todayYear - this.year;
      if (this.todayMonth < this.month - 1) {
        this.ageCalc--;
      }
    if (this.month - 1 === this.todayMonth && this.todayDay < this.day) {
        this.ageCalc--;
    }
      console.log(this.ageCalc);
      this.postAdd.patchValue({dob: date.jsdate});
      return this.ageCalc;
    }
}
  createForm() {
    this.postAdd = this.fb.group({
      name: [null,  Validators.required],
      email: [null,  Validators.required ],
      dob: [null,  Validators.required ],
      department: [null,  Validators.required ],
      gender: [null, Validators.required],
      age: [null, Validators.required]
    });
   }
   OnSubmit() {
     if (this.operation === 'Add') {
     console.log('post add value ' + JSON.stringify(this.postAdd.value));
     this.http.post('http://localhost:3000/addEmployee', this.postAdd.value).subscribe((data) => {
       console.log('Data added successfully');
       alert('Data Added Successfully');
       this.router.navigateByUrl('/dummy', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/home'] );
     });
     },
    (error) => {
     console.log('Error Found' + error.json());
    });
     } else {
      this.http.post('http://localhost:3000/updateEmployee/' + this.employeeId, this.postAdd.value).subscribe((data) => {
        console.log('Data updated successfully');
        alert('Data Updated Successfully');
        this.router.navigate(['/home']);
      },
    (error) => {
      console.log('Not updated data' + error.json());
    });
     }
   }
   getEmployee(id) {
    this.http.get('http://localhost:3000/getEmployee/' + id).subscribe((data) => {
      console.log('return particular data for this Employee' + JSON.stringify(data));
      const employee = data.json();
      this.fetchData(employee);
    });
  }
  fetchData(employee) {
    this.operation = 'Update';
    console.log(employee);
   this.postAdd.patchValue({
     name: employee.name,
      email: employee.email,
      dob: employee.dob,
      department: employee.department,
      gender: employee.gender,
      age: employee.age
   });
  }

  ngOnInit() {
    this.createForm();
    this.activatedRoute.queryParams.subscribe((params: Params) => {
     console.log('moved to employee add');
      this.employeeId = params['id'];
      if (this.employeeId != null) {
        this.getEmployee(this.employeeId);
      }
    });
  }
}

