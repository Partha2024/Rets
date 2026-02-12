// timing.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ApiTiming {
  id: string;
  url: string;
  method: string;
  status: number | 'ERR' | 'PENDING';
  durationMs?: number;
  at: number;
}

@Injectable({ providedIn: 'root' })
export class ApiTimingService {
  private _timings = new BehaviorSubject<ApiTiming[]>([]);
  timings$ = this._timings.asObservable();

  add(t: ApiTiming) {
    const curr = this._timings.getValue();
    this._timings.next([t, ...curr].slice(0, 200));
  }

  start(req: any): string {
    const id = Math.random().toString(36).substring(2, 15);
    const t: ApiTiming = {
        id,
        url: req.urlWithParams || req.url,
        method: req.method,
        status: 'PENDING',
        at: Date.now()
    };
    this.add(t);
    return id;
  }

  complete(id: string, status: number | 'ERR', duration: number) {
      const curr = this._timings.getValue();
      const idx = curr.findIndex(x => x.id === id);
      if (idx > -1) {
          const updated = [...curr];
          updated[idx] = { ...updated[idx], status, durationMs: duration };
          this._timings.next(updated);
      }
  }

  clear() { this._timings.next([]); }
}
