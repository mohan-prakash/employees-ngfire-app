import { Component, OnInit, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';


@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('closeBtn') closeBtn: ElementRef;
  employee: Employee;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    if (this.employee == null) {
      this.employee = {
        uid: null,
        name: '',
        designation: '',
        email: '',
        location: '',
        salary: 0
      };
    }
  }

  onSubmit() {
    this.employeeService.addEmployee(this.employee);
    this.notify.emit('added!');
    this.closeModal();
    this.onAddComplete();
    return true;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }

  private onAddComplete() {
    this.employee = {
      uid: null,
      name: '',
      designation: '',
      email: '',
      location: '',
      salary: 0
    };
  }
}
