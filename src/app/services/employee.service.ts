import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from './../../environments/environment';
import { Employee } from '../models/employee.model';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employees: Employee[];
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getEmployees(): Observable<Employee[]> {
    return this.http
      .get<Employee[]>(`${this.apiUrl}/employees`);
  }

  addEmployee(employee: Employee): Observable<any> {
    return this.http
      .post<Employee>(`${this.apiUrl}/employee`, employee);
  }

  updateEmployee(employee: Employee): Observable<any> {
    return this.http
      .put(`${this.apiUrl}/employee/${employee.uid}`, employee);
  }

  deleteEmployee(uid: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/employee/${uid}`);
  }
}
