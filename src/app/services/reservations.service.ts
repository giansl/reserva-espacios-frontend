import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {
  private apiUrl = `${environment.apiUrl}`;

  constructor(private http: HttpClient, private authService: AuthService) { }

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  getUserReservations(): Observable<any[]> {
    const idUser = localStorage.getItem('user_id');
    return this.http.get<any[]>(`${this.apiUrl}/user-reservations/${idUser}`, { headers: this.getHeaders() });
  }

  getReservation(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/reservations/${id}`, { headers: this.getHeaders() });
  }

  createReservation(reservation: any): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/reservations`, reservation, { headers: this.getHeaders() });
  }

  updateReservation(id: string, reservation: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/reservations/${id}`, reservation, { headers: this.getHeaders() });
  }

  cancelReservation(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/reservations/${id}`, { headers: this.getHeaders() });
  }

  checkAvailability(spaceId: string, date: string, startTime: string, endTime: string): Observable<boolean> {
    const params = new HttpParams()
      .set('spaceId', spaceId)
      .set('date', date)
      .set('startTime', startTime)
      .set('endTime', endTime);
    return this.http.get<boolean>(`${this.apiUrl}/reservations/check-availability`, { params, headers: this.getHeaders() });
  }

  getReservationsBySpace(spaceId: string, startDate: string, endDate: string): Observable<any[]> {
    const params = new HttpParams()
      .set('spaceId', spaceId)
      .set('startDate', startDate)
      .set('endDate', endDate);
    return this.http.get<any[]>(`${this.apiUrl}/reservations/by-space`, { params, headers: this.getHeaders() });
  }
}
