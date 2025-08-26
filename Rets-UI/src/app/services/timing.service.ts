// timing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ApiTiming {
  url: string;
  method: string;
  status: number | 'ERR';
  durationMs: number;
  at: number;
}

@Injectable({ providedIn: 'root' })
export class ApiTimingService {
  private _timings = new BehaviorSubject<ApiTiming[]>([]);
  timings$ = this._timings.asObservable();

  add(t: ApiTiming) {
    const curr = this._timings.getValue();
    this._timings.next([t, ...curr].slice(0, 200)); // cap history
  }

  clear() { this._timings.next([]); }
}
