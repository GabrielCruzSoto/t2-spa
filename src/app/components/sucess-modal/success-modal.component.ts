import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-success-modal',
  standalone: true,
  imports: [],
  templateUrl: './success-modal.component.html',
  styleUrls: ['./success-modal.component.scss']
})
export class SuccessModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string; actionPost?: () => void },
    private dialogRef: MatDialogRef<SuccessModalComponent>
  ) {}

  closeDialog() {
    if (this.data.actionPost) {
      this.data.actionPost(); // Llama a la función actionPost si está definida
    }
    this.dialogRef.close();
  }
}