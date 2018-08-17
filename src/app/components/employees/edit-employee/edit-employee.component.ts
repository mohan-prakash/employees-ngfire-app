import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private employeeService: EmployeeService) {
  }

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
    this.employeeService.updateEmployee(this.employee);
    this.notify.emit('edited!');
    this.closeModal();
    return true;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
