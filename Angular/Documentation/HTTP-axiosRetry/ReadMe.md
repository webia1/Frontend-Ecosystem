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
