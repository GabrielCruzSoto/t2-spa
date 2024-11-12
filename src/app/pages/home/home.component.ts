import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FileService } from '../../services/file/file.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ErrorModalComponent } from '../../components/error-modal/error-modal.component';
import { SuccessModalComponent } from '../../components/sucess-modal/success-modal.component';
import { Action } from 'rxjs/internal/scheduler/Action';
import { DataExcelService } from '../../services/data-excel/data-excel.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  selectedFile: File | null = null;
  excelData: any[] = [];
  totalPages: number = 0;
  currentPage: number = 0;
  pageSize: number = 10;

  constructor(
    private uploadService: FileService,
    private router: Router,
    private dialog: MatDialog,
    private excelDataService: DataExcelService
  ) { }

  onFileSelected(event: Event) {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  uploadFile() {
    if (this.selectedFile) {
      this.uploadService.uploadFile(this.selectedFile).subscribe(
        {
          next: () => {
            console.log("Se ha cargado el archivo de forma exitosa.")
            this.openSuccessModal("Se ha cargado el archivo de forma exitosa.")
          },
          error: () => {
            this.openErrorModal('Error al Cargar archivo');
          }
        }
      );
    } else {
      console.warn('No se ha seleccionado un archivo para subir.');
    }
  }
  openErrorModal(errorMessage: any) {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      data: { message: errorMessage }
    });
  }
  openSuccessModal(sucessMessage: any) {
    const actionPost = () => {
      window.location.reload();
    };
    const dialogRef = this.dialog.open(SuccessModalComponent, {
      data: { message: sucessMessage, actionPost: actionPost }
    });
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData(page: number = 0): void {
    this.excelDataService.getExcelData(page, this.pageSize).subscribe((response) => {
      this.excelData = response.content;
      this.totalPages = response.totalPages;
      this.currentPage = response.number;
    });
  }

  onPageChange(page: number): void {
    this.loadData(page);
  }
}
