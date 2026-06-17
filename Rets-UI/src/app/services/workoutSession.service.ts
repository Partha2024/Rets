import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, pipe, shareReplay, tap } from 'rxjs';
import { environment } from '../../environments/environment';

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

// @Injectable({
//   providedIn: 'root'
// })
// export class WorkoutService {
//   private apiUrl = `${environment.apiUrl}/api/WorkoutSession`;

//   constructor(private http: HttpClient) {}

//   createWorkoutSession(workoutPayload: any): Observable<any> {
//     return this.http.post(`${this.apiUrl}/createSession`, workoutPayload);
//   }

//   getWorkoutSessions(): Observable<workoutSession[]> {
//     return this.http.get<workoutSession[]>(`${this.apiUrl}/getAllWorkoutSessions`);
//   }

//   getLastSessionBySplitId(splitId: number): Observable<lastWorkoutSession> {
//     return this.http.get<lastWorkoutSession>(`${this.apiUrl}/getLastWorkoutSession/${splitId}`);
//   }

//   deleteWorkoutSession(sessionId: number): Observable<any> {
//     return this.http.delete(`${this.apiUrl}/deleteWorkoutSession/${sessionId}`);
//   }

// }

@Injectable({
  providedIn: 'root'
})
export class WorkoutService {
  private apiUrl = `${environment.apiUrl}/api/WorkoutSession`;
  private workoutSessions$?: Observable<workoutSession[]>;

  constructor(private http: HttpClient) {}

  createWorkoutSession(workoutPayload: any): Observable<any> {
    return this.http.post(`${this.apiUrl}/createSession`, workoutPayload).pipe(
      tap(() => { this.refreshWorkoutSessions(); })
    );
  }

  getWorkoutSessions(): Observable<workoutSession[]> {
    if (!this.workoutSessions$) {
      console.log('🔥 Calling API');
      this.workoutSessions$ = this.http
        .get<workoutSession[]>(`${this.apiUrl}/getAllWorkoutSessions`)
        .pipe(
          shareReplay({
            bufferSize: 1,
            refCount: false
          })
        );
    }
    return this.workoutSessions$;
  }

  refreshWorkoutSessions(): void {
    this.workoutSessions$ = undefined;
  }

  getLastSessionBySplitId(splitId: number): Observable<lastWorkoutSession> {
    return this.http.get<lastWorkoutSession>(`${this.apiUrl}/getLastWorkoutSession/${splitId}`);
  }

  deleteWorkoutSession(sessionId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/deleteWorkoutSession/${sessionId}`).pipe(
      tap(() => { this.refreshWorkoutSessions(); })
    );
  }
}