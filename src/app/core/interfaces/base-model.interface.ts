import { Observable } from 'rxjs';

export interface BaseModelInterface {

  list(): Observable<any>

  get(): Observable<any>

  create(obj: any): Observable<any>

  update(obj: any): Observable<any>
  
  delete(): Observable<any>
}
