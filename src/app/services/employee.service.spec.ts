import { TestBed, inject } from '@angular/core/testing';

import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable, of, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';

const fixtureEmployees = [
  {
    uid: '1',
    name: 'Thomas Hardy',
    designation: 'Developer',
    email: 'thomashardy@mail.com',
    location: '89 Chiaroscuro Rd, Portland, USA',
    salary: 10000
  },
  {
    uid: '2',
    name: 'Dominique Perrier',
    designation: 'Tester',
    email: 'dominiqueperrier@mail.com',
    location: 'Obere Str. 57, Berlin, Germany',
    salary: 20000
  },
  {
    uid: '3',
    name: 'Maria Anders',
    designation: 'Developer',
    email: 'mariaanders@mail.com',
    location: '25, rue Lauriston, Paris, France',
    salary: 15000
  },
  {
    uid: '4',
    name: 'Fran Wilson',
    designation: 'Business Analyst',
    email: 'franwilson@mail.com',
    location: 'C/ Araquil, 67, Madruid, Spain',
    salary: 12000
  },
  {
    uid: '5',
    name: 'Martin Blank',
    designation: 'Scrum Master',
    email: 'martinblank@mail.com',
    location: 'Via Monte Bianco 34, Turin, Italy',
    salary: 18000
  }
];
export class AngularFireDatabaseMock {
  list(query: string): any {
      return {
          valueChanges() {
              return of(fixtureEmployees);
          }
      };
  }
  valueChanges(): any {
    return {
      valueChanges() {
        return of(fixtureEmployees);
    }
    };
  }
}
// let angularFireDatabaseStub = { list: () => {} };
const angularFireDatabaseStub = new AngularFireDatabaseMock();
const mockEmployees$ = of(fixtureEmployees);

describe('EmployeeService', () => {
  beforeEach(() => {
    spyOn(angularFireDatabaseStub, 'list').and.returnValue(mockEmployees$);
    spyOn(angularFireDatabaseStub, 'valueChanges').and.returnValue(mockEmployees$);
    TestBed.configureTestingModule({
      providers: [
        EmployeeService,
        {provide: AngularFireDatabase, useValue: angularFireDatabaseStub}]
    });
  });

  it('should be created', inject([EmployeeService], (service: EmployeeService) => {
    expect(service).toBeTruthy();
  }));

  it('#getEmployees', inject([EmployeeService], (service: EmployeeService) => {
      let employeesRef: AngularFireList<Employee>;
      // let employees: Array<Employee>;
      employeesRef = service.getEmployees();
      console.log(employeesRef);
      expect(employeesRef).not.toBeNull();
      // employeesRef.valueChanges().subscribe(list => {
      //   employees = list;
      //   expect(employees[0].name).toEqual(fixtureEmployees[0].name);
      //   expect(employees[0]).toEqual(jasmine.any(Employee));
      // });

      // employeesRef.snapshotChanges().subscribe(item => {
      //       employees = [];
      //       item.forEach(element => {
      //         let y = element.payload.toJSON();
      //         y['uid'] = element.key;
      //         employees.push(y as Employee);
      //       });
      //       console.log(employees);
      //     });
  }));
});
