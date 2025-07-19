import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Split {
  splitId?: number;
  splitName: string;
  defaultDay: string;
  exerciseIds: string[];
}

@Injectable({
  providedIn: 'root'
})
export class SplitService {

  private apiUrl = `${environment.apiUrl}/api/Splits`;

  constructor(private http: HttpClient) {}

  // POST: Create a new split
  createSplit(split: Split): Observable<Split> {
    return this.http.post<Split>(this.apiUrl, split);
  }

  // GET: Fetch a split by ID 
  getSplit(split_id: number): Observable<Split> {
    return this.http.get<Split>(`${this.apiUrl}/${split_id}`);
  }

  // GET: Fetch all splits
  getSplits(): Observable<Split[]> {
    return this.http.get<Split[]>(`${this.apiUrl}/all`);
  }

  // DELETE: Delete a split by ID
  deleteSplit(split_id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${split_id}`);
  }

}
