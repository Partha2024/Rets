import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface Exercise {
  exerciseId: string;
  exerciseImage: string;
  exerciseName: string;
  exerciseType: string;
  muscleGroup: string;
  primaryMuscle: string;
}

@Injectable({
  providedIn: 'root'
})
export class ExerciseService {

  private apiUrl = `${environment.apiUrl}/api/Exercise`;
  
  constructor(private http: HttpClient) { }

  getExercises(): Observable<Exercise[]> {
    return this.http.get<Exercise[]>(this.apiUrl);
  }
}
