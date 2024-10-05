import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class SpacesService {
  private apiUrl = `${environment.apiUrl}/spaces`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getSpaces(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  getSpace(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  createSpace(space: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, space, { headers: this.getHeaders() });
  }

  updateSpace(id: string, space: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, space, { headers: this.getHeaders() });
  }

  deleteSpace(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`, { headers: this.getHeaders() });
  }

  getAvailableSpaces(date: string, startTime: string, endTime: string): Observable<any[]> {
    const params = new HttpParams()
      .set('date', date)
      .set('startTime', startTime)
      .set('endTime', endTime);
    return this.http.get<any[]>(`${this.apiUrl}/available`, { headers: this.getHeaders() });
  }
}
