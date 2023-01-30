# HTTP Retry with `axiosRetry`

```ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import axiosRetry from 'axios-retry';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  intercept(
    req: HttpRequest<any>,
    next: HttpHandler,
  ): Observable<HttpEvent<any>> {
    // Configure axiosRetry to retry failed requests up to 3 times
    axiosRetry(axios, { retries: 3 });
    // Use the retry operator to retry failed requests
    return next.handle(req).pipe(
      retry(3), // retry up to 3 times
      catchError((error) => {
        // Handle any errors that occurred during the retries
        return throwError(error);
      }),
    );
  }
}
```

with timeout

´´´ts
import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, TimeoutError } from 'rxjs';
import { retryWhen, delayWhen, take, timeout, catchError } from 'rxjs/operators';
import axiosRetry from 'axios-retry';

@Injectable()
export class RetryInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const retryCount = 3;
    const retryDelay = 3000;
    const timeoutDuration = 5000;

    return next.handle(req).pipe(
      retryWhen(errors => errors.pipe(
        delayWhen((error: HttpErrorResponse) => {
          const retryAttempt = axiosRetry.getRetryConfig(error.config);
          if (retryAttempt <= retryCount) {
            console.log(`Retrying ${retryAttempt}...`);
            return new Observable(observer => setTimeout(() => observer.next(), retryDelay));
          }
          return throwError(error);
        }),
        take(retryCount + 1)
      )),
      timeout(timeoutDuration),
      catchError((error: HttpErrorResponse) => {
        console.error(error);
        return throwError(error);
      })
    );
  }
}

´´´
