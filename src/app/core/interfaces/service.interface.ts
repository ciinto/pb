import { Observable } from 'rxjs';

export interface ServiceInterface {

  list(): Observable<any>

  read(id: string): Observable<any>

  create(obj: any): Observable<any>

  update(id: string, obj: any): Observable<any>

  delete(id: string): Observable<any>
}
