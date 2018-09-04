import { TestBed, inject, async } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Observable, of, from } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { EmployeeService } from './employee.service';
import { Employee } from '../models/employee.model';
import { environment } from '../../environments/environment';

const fixtureEmployees: Employee[] = [
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

const mockEmployees$ = of(fixtureEmployees);

describe('EmployeeService', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        EmployeeService
      ]
    });
  });

  afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
    httpMock.verify();
  }));

  it('#service should be created', inject([EmployeeService], (employeeService: EmployeeService) => {
    expect(employeeService).toBeTruthy();
  }));

  it('#should get employees', async(inject([EmployeeService, HttpTestingController],
    (
      employeeService: EmployeeService,
      httpMock: HttpTestingController
    ) => {
      employeeService.getEmployees().subscribe(
        (result) => {
          expect(result).toEqual(fixtureEmployees);
          expect(result.length).toBe(5);
          expect(result[0].designation).toEqual('Developer');
        },
        (error: any) => {
          console.log(`error on get: ${error}`);
        }
      );
      const mockReq = httpMock.expectOne(`${environment.apiUrl}/employees`);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('GET');
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(fixtureEmployees);
      httpMock.verify();
    }))
  );

  it('#should add employee', async(inject([EmployeeService, HttpTestingController],
    (
      employeeService: EmployeeService,
      httpMock: HttpTestingController
    ) => {
      const newEmployee: Employee = {
        uid: null,
        name: 'Mohan',
        designation: 'Developer',
        email: 'mohan@mail.com',
        location: 'Aegonplein 50, 2591 TV, Den Haag',
        salary: 16000
      };
      employeeService.addEmployee(newEmployee).subscribe(
        (data) => {
          expect(data).toEqual(jasmine.any(Object));
          expect(data.result).toEqual('6');
        },
        (error: any) => {
          console.log(`error on post: ${error}`);
        }
      );
      const mockReq = httpMock.expectOne(`${environment.apiUrl}/employee`);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('POST');
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush({result: '6'});
      httpMock.verify();
    }))
  );

  it('#should update employee', async(inject([EmployeeService, HttpTestingController],
    (
      employeeService: EmployeeService,
      httpMock: HttpTestingController
    ) => {
      const employee: Employee = {
        uid: '6',
        name: 'Mohan',
        designation: 'Developer',
        email: 'mohan@mail.com',
        location: 'Aegonplein 50, 2591 TV, Den Haag',
        salary: 17000
      };
      employeeService.updateEmployee(employee).subscribe(
        (data) => {
          expect(data).toBeNull();
          expect(data).toBeFalsy();
        },
        (error: any) => {
          console.log(`error on update: ${error}`);
        }
      );
      const mockReq = httpMock.expectOne(`${environment.apiUrl}/employee/${employee.uid}`);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('PUT');
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(null, { status: 204, statusText: 'No Content' });
      httpMock.verify();
    }))
  );

  it('#should delete employee', async(inject([EmployeeService, HttpTestingController],
    (
      employeeService: EmployeeService,
      httpMock: HttpTestingController
    ) => {
      const employeeUid = '5';
      employeeService.deleteEmployee(employeeUid).subscribe(
        (data) => {
          expect(data).toBeNull();
          expect(data).toBeFalsy();
        },
        (error: any) => {
          console.log(`error on delete: ${error}`);
        }
      );
      const mockReq = httpMock.expectOne(`${environment.apiUrl}/employee/${employeeUid}`);
      expect(mockReq.cancelled).toBeFalsy();
      expect(mockReq.request.method).toEqual('DELETE');
      expect(mockReq.request.responseType).toEqual('json');
      mockReq.flush(null, { status: 204, statusText: 'No Content' });
      httpMock.verify();
    }))
  );
});
