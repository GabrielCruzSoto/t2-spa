import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ExcelData } from '../../interfaces/DataExcel';

@Injectable({
  providedIn: 'root'
})
export class DataExcelService {

  private apiUrl = `http://${process.env['BASE_URL']|| 'localhost:8080'}/excel/data`;

  constructor(private http: HttpClient) { }

  getExcelData(page: number = 0, size: number = 10): Observable<ExcelData> {
    const params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    return this.http.get<ExcelData>(this.apiUrl, { params });
  }
}
