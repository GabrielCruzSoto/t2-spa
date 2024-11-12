import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class FileService {
  private uploadUrl = `http://${process.env['BASE_URL']|| 'localhost:8080'}/excel/upload`;  // Cambia la URL según tu configuración

  constructor(private http: HttpClient, private authService: AuthService) {}

  uploadFile(file: File): Observable<any> {
    const token = this.authService.getToken();
    if (!token) {
      throw new Error("Usuario no autenticado.");
    }

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post(this.uploadUrl, formData, { headers });
  }
}
