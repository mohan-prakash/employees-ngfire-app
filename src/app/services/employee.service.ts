import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

import { Employee} from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: AngularFireList<any>;

  constructor(private firebase: AngularFireDatabase) { }

  getEmployees() {
    this.employees = this.firebase.list('employees');
    return this.employees;
  }

  addEmployee(employee: Employee) {
    this.employees.push({
      name: employee.name,
      designation: employee.designation,
      email: employee.email,
      location: employee.location,
      salary: employee.salary
    });
  }

  updateEmployee(employee: Employee) {
    this.employees.update(employee.uid, {
      name: employee.name,
      designation: employee.designation,
      email: employee.email,
      location: employee.location,
      salary: employee.salary
    });
  }

  deleteEmployee(uid: string) {
    this.employees.remove(uid);
  }
}
