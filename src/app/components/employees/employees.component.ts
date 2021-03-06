import { Component, OnInit } from '@angular/core';
import { NotifierService } from 'angular-notifier';
import { map } from 'rxjs/operators';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee.model';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  employees: Array<Employee>;
  selectedEmployee: Employee;

  constructor(
    private employeeService: EmployeeService,
    private readonly notifier: NotifierService) {
  }

  ngOnInit() {
    this.getEmployees();
  }

  getEmployees() {
    this.employeeService.getEmployees().snapshotChanges().pipe(
      map(changes =>
        changes.map(e => ({ uid: e.payload.key, ...e.payload.val() }))
      )
    ).subscribe(employees => {
      this.employees = employees;
      if (this.employees.length > 0) {
        this.notifier.notify('success', 'Employees list loaded | refreshed!');
      }
    });
  }

  onRowSelected(employee: Employee) {
    this.selectedEmployee = {
      uid: employee.uid,
      name: employee.name,
      designation: employee.designation,
      email: employee.email,
      location: employee.location,
      salary: employee.salary
    };
  }

  onNotify(message: string): void {
    if (message === 'added!') {
      this.notifier.notify('success', `Employee successfully ${message}`);
    } else {
      let messageType = 'warning';
      if (message === 'deleted!') {
        messageType = 'error';
      }
      this.notifier.notify(messageType, `Employee "${this.selectedEmployee.name}" record successfully ${message}`);
    }
  }
}
