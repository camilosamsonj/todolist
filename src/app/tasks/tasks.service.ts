import { Injectable } from '@angular/core';
import { ITask } from './models';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TasksService {


  tasks: ITask[] = [
    {
      id: 1,
      date: new Date(),
      name: 'Cierre de mes',
      priority: 'Alta'
    },
    {
      id: 2,
      date: new Date(),
      name: 'Revisión de contratos',
      priority: 'Alta'
    }
  ];

  constructor() { }

  getTasks(): Observable<ITask[]> {
    return of(this.tasks);
  }

  createTask$(payload: ITask): Observable<ITask[]> {
    this.tasks.push(payload);
    return of([...this.tasks]);
  }

  editTask$(id: number, payload: ITask): Observable<ITask[]>{
    return of(
      this.tasks.map((t) => (t.id === id ? { ...t, ...payload} : t))
    );
  } 

  getTaskById$(id: number): Observable<ITask | undefined> {
    return of(this.tasks.find((t) => t.id === id));
  }
}
