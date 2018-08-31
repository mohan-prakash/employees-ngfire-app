import { Component, OnInit, Input, ElementRef, Output, EventEmitter, ViewChildren, QueryList } from '@angular/core';

import { EmployeeService } from '../../../services/employee.service';
import { Employee } from '../../../models/employee.model';
import { ActionType } from '../../../models/enums.model';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  @Input() employee: Employee;
  @Output() notify: EventEmitter<string> = new EventEmitter<string>();
  @ViewChildren('closeBtn') closeBtn: QueryList<ElementRef>;
  @Input() action: ActionType;
  actionType = ActionType;

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
    if (this.action === ActionType.Add) {
      this.employeeService.addEmployee(this.employee).subscribe(_ => {
        this.onSaveComplete();
        this.onAddOrEditComplete();
      });
    } else if (this.action === ActionType.Edit) {
      this.employeeService.updateEmployee(this.employee).subscribe(_ => {
        this.onSaveComplete();
        this.onAddOrEditComplete();
      });
    }
    return true;
  }

  private onSaveComplete() {
    let notificationMessage = '';
    if (this.action === ActionType.Add) {
      notificationMessage = 'added!';
    } else if (this.action === ActionType.Edit) {
      notificationMessage = 'edited!';
    } else if (this.action === ActionType.Delete) {
      notificationMessage = 'deleted!';
    }
    this.notify.emit(notificationMessage);
    this.closeModal();
  }

  private onAddOrEditComplete() {
    this.employee = {
      uid: null,
      name: '',
      designation: '',
      email: '',
      location: '',
      salary: 0
    };
  }

  onDelete() {
    this.employeeService.deleteEmployee(this.employee.uid).subscribe(_ => {
      this.onSaveComplete();
    });
    return true;
  }

  private closeModal(): void {
    this.closeBtn.forEach(btn => {
      btn.nativeElement.click();
    });
  }
}
