import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Employee} from 'src/app/models/Employee-model';
import {Observable, Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }

  public formData: Employee;
  
  readonly APIUrl = "http://localhost:34823/api";

  getEmpList() : Observable<Employee[]>{
    return this.http.get<Employee[]>(this.APIUrl+'/Department')
    
  }

  addEmployee(emp: Employee){
    return this.http.post(this.APIUrl+'/Employee', emp)
  }

  deleteEmployee(id: number){
      return this.http.delete(this.APIUrl+'/Employee/'+id);
  }

  updateEmployee(emp: Employee){
    return this.http.put(this.APIUrl+'/Employee',emp);
  }

  private _listners =new Subject<any>();
  listen():Observable<any>{
    return this._listners.asObservable();
  }
  filter(filterBy:string){
    this._listners.next(filterBy);
  }
}
