import { Component } from '@angular/core';
import { AuthService } from '../../services/auth/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {MatDialog} from '@angular/material/dialog';
import {ErrorModalComponent} from '../../components/error-modal/error-modal.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  public username: string = "";
  public password: string = "";


  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  onSubmit() {
    if (this.username && this.password) {
      this.authService.login(this.username, this.password).subscribe({
        next: () => { this.router.navigate(['/home']); },
        error: (error) => {
          console.log({ error });
          this.openErrorModal(error.message);
        }
      });
    } else {
      this.openErrorModal('Por favor, ingresa tu usuario y contraseña.');

    }
  }
  openErrorModal(errorMessage: any) {
    const dialogRef = this.dialog.open(ErrorModalComponent, {
      data: { message: errorMessage }
    });
  }
}
