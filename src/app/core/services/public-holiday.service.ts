import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http'
import { Observable, catchError, map, of, throwError } from 'rxjs';

// interface Holiday {
//   nombre: string;
//   comentarios: string;
//   fecha: string;
//   irrenunciable: number;
//   tipo: string;
//   leyes: {nombre: string, url: string}[];

// }



@Injectable({
  providedIn: 'root'
})
export class PublicHolidayService {

  private apiUrl = "https://apis.digital.gob.cl/fl/feriados";

  constructor(private httpClient: HttpClient) { }

  isHoliday(year: number, month: number, day: number): Observable<{isHoliday: boolean}> {
    const url = `${this.apiUrl}/${year}/${month}/${day}`;
    console.log(url);
    return this.httpClient.get<any[]>(url).pipe(
      map(response => 
        ({ isHoliday: response.length > 0})),
      catchError(() => of({ isHoliday: false }))
    ); 
  }
}
