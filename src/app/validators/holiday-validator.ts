import { AbstractControl, ValidationErrors, ValidatorFn, AsyncValidatorFn } from "@angular/forms";
import { Observable, of } from "rxjs";
import { catchError, map } from "rxjs";
import { PublicHolidayService } from "../core/services/public-holiday.service";

export function holidayValidator(publicHolidayService: PublicHolidayService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
        if(!control.value) {
            return of(null);
        }

        const date = new Date(control.value);
        const year = date.getFullYear();
        const month = date.getMonth() + 1;
        const day = date.getDate();

        return publicHolidayService.isHoliday(year, month, day).pipe(           
            map(response => {
                console.log('Response from Service', response);
                return response.isHoliday ? {holiday: true} : null;
            }),
            catchError(error => {
                console.error('Error while validating holiday', error);
                return of(null);
            })
        );
    }
}