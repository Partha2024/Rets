import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { tap, finalize, catchError } from 'rxjs/operators';
import { ApiTimingService } from '../services/timing.service';

@Injectable()
export class TimingInterceptor implements HttpInterceptor {
  constructor(private timing: ApiTimingService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const start = performance.now();
    const id = this.timing.start(req); // Start tracking
    let status: number | 'ERR' = 'ERR';
    let errorMsg: string | undefined;

    return next.handle(req).pipe(
      tap(evt => {
        if (evt instanceof HttpResponse) {
          status = evt.status;
        }
      }),
      catchError((error: HttpErrorResponse) => {
        status = error.status || 'ERR';
        errorMsg = error.message;
        return throwError(() => error);
      }),
      finalize(() => {
        const duration = Math.round(performance.now() - start);
        this.timing.complete(id, status, duration, errorMsg); // Complete tracking
      })
    );
  }
}
