import { Observable } from 'rxjs';

export interface ServiceInterface {

  list(): Observable<any>

  read(): Observable<any>

  create(obj: any): Observable<any>

  update(obj: any): Observable<any>

  delete(): Observable<any>
}
