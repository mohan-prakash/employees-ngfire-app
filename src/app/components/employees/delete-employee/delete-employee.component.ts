import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';

import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';

@Component({
  selector: 'app-delete-employee',
  templateUrl: './delete-employee.component.html',
  styleUrls: ['./delete-employee.component.css']
})
export class DeleteEmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @ViewChild('closeBtn') closeBtn: ElementRef;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
  }

  onDelete() {
    this.employeeService.deleteEmployee(this.employee.uid);
    this.notify.emit('deleted!');
    this.closeModal();
    return true;
  }

  private closeModal(): void {
    this.closeBtn.nativeElement.click();
  }
}
