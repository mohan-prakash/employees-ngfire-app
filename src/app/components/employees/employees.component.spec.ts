import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { RouterModule} from '@angular/router';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestoreModule } from 'angularfire2/firestore';

import { EmployeesComponent } from './employees.component';
import { EmployeeService } from '../../services/employee.service';
import { NotifierService, NotifierModule } from 'angular-notifier';
import { NavbarComponent } from '../navbar/navbar.component';
import { AddEmployeeComponent } from './add-employee/add-employee.component';
import { EditEmployeeComponent } from './edit-employee/edit-employee.component';
import { DeleteEmployeeComponent } from './delete-employee/delete-employee.component';

let angularFireDatabaseStub = { list: () => {} };

describe('EmployeesComponent', () => {
  let component: EmployeesComponent;
  let fixture: ComponentFixture<EmployeesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EmployeesComponent,
        NavbarComponent,
        AddEmployeeComponent,
        EditEmployeeComponent,
        DeleteEmployeeComponent
      ],
      imports: [
        FormsModule,
        Ng2SearchPipeModule,
        RouterModule,
        NotifierModule,
        AngularFireAuthModule
      ],
      providers: [
        EmployeeService,
        NotifierService,
        {provide: AngularFireDatabase, useValue: angularFireDatabaseStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployeesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
