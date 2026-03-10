import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CacheService {
  private apiUrl = `${environment.apiUrl}/Cache`;

  constructor(private http: HttpClient) {}

  clearCache(): Observable<any> {
    return this.http.delete(`${this.apiUrl}/clear`);
  }
}
