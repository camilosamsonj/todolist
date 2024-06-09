import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ITask} from '../../models'
import { holidayValidator } from 'src/app/validators/holiday-validator';
import { PublicHolidayService } from 'src/app/core/services/public-holiday.service';


@Component({
  selector: 'app-task-dialog-component',
  templateUrl: './task-dialog-component.html',

})
export class TaskDialogComponent {

  taskForm: FormGroup;
  priorities: string[] = [
    'Alta',
    'Media',
    'Baja'
  ]

  constructor(
    private publicHolidayService: PublicHolidayService,
    private fb: FormBuilder,
    private matDialogRef: MatDialogRef<TaskDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public editingTask?: ITask,
    
  ) {

    this.taskForm = this.fb.group({

      name: [
        '',
        [
          Validators.required,
          Validators.minLength(1),
          Validators.maxLength(50),
        ]
      ],

      date: [
        '',
        [Validators.required],
        [holidayValidator(this.publicHolidayService)]
        
      ],
      
      priority: [
        '',
        [
          Validators.required
        ]
      ]
    });

    if(editingTask) {
      this.taskForm.patchValue(editingTask);
    }
  }


  get nameControl() {
    return this.taskForm.get('name');
  }

  get dateControl() {
    return this.taskForm.get('date');
  }

  get priorityControl() {
    return this.taskForm.get('priority');
  }


  onSave(): void {
    if(this.taskForm.invalid){
      this.taskForm.markAllAsTouched();
    } else {
      const updatedTask: ITask = this.taskForm.value;

      if(this.editingTask){
        updatedTask.id = this.editingTask.id
      }
      this.matDialogRef.close(updatedTask);
    }
  }


}
