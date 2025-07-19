import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

export interface ExerciseLog {
  exerciseLogId: number;
  exerciseId: string;
  exerciseName: string;
  setNumber: number;
  reps: number;
  weight: number;
  timeInSeconds?: number;
}

export interface workoutSession {
  sessionId?: number;
  split: {
    splitId: number;
    splitName: string;
    defaultDay: string;
  };
  startTime: string;
  exerciseLogs: ExerciseLog[];
}

export interface lastWorkoutSession {
  sessionId?: number;
  splitId: number;
  exerciseLogs: ExerciseLog[];
  startTime: string;
}

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = `${environment.apiUrl}/api/WorkoutSession`;

  constructor(private http: HttpClient) {}

  createWorkoutSession(workoutPayload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createSession`, workoutPayload);
  }

  getWorkoutSessions(): Observable<workoutSession[]> {
    return this.http.get<workoutSession[]>(`${this.apiUrl}/getAllWorkoutSessions`);
  }

  getLastSessionBySplitId(splitId: number): Observable<lastWorkoutSession> {
    return this.http.get<lastWorkoutSession>(`${this.apiUrl}/getLastWorkoutSession/${splitId}`);
  }

  deleteWorkoutSession(sessionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteWorkoutSession/${sessionId}`);
  }

}
