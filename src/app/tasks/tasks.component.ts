import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { ITask } from './models';
import { TaskDialogComponent } from './components/task-dialog-component/task-dialog-component.component';
import { TasksService } from './tasks.service';


@Component({
  selector: 'app-tasks',
  templateUrl: './tasks.component.html',
})
export class TasksComponent {

  displayedColumns: string[] = [
    'id',
    'date',
    'name',
    'priority',
    'actions',
  ]

  tasks$: Observable<ITask[]>;

  constructor(
    private tasksService: TasksService,
    private matDialog: MatDialog
  ){
    this.tasks$ = this.tasksService.getTasks();
  }


  openDialog(editingTask?: ITask): void {
    this.matDialog
    .open(TaskDialogComponent, {data: editingTask})
    .afterClosed()
    .subscribe({
      next: (result) => {
        if(result) {
          if(editingTask) {
            this.tasks$ = this.tasksService.editTask$(editingTask.id, result);
          } else {
            this.tasks$ = this.tasksService.createTask$(result);
          }
        }
      }
    })
  }



}
