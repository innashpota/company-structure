import {Component, Inject} from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';

@Component({
  selector: 'app-edit-project-title',
  templateUrl: './edit-project-title.component.html',
  styleUrls: ['./edit-project-title.component.css']
})
export class EditProjectTitleComponent {
  formControl = new FormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<EditProjectTitleComponent>,
    @Inject(MAT_DIALOG_DATA) public data: string
  ) {
  }

  getErrorMessage() {
    return this.formControl.hasError('required') ? 'Required field' : '';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
