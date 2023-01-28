# HTTP Timeouts (& HTTP499 Handling)

In Go, the best way to handle timeouts when making HTTP requests is to use the `http.Client` struct and set a timeout value on it.

The `http.Client` struct has a `Timeout` field that you can set to a `time.Duration` value. Once set, any request made using that client will timeout after that duration if the server doesn't respond.

You can set the timeout value when creating a new `http.Client` struct:

```go
client := &http.Client{
    Timeout: time.Second * 10,
}
```

Then use the `Do()` method of the client to make the request, and check the `Error` value of the `http.Response` struct returned by the `Do()` method.

```go
req, err := http.NewRequest("GET", "https://example.com", nil)
if err != nil {
    log.Fatal(err)
}


resp, err := client.Do(req)
if err != nil {
    log.Fatal(err)
}
```

If the `Error` value is `context.DeadlineExceeded`, it means the request has timed out.

You can also use a context to limit the time of execution of the request

```go
ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
defer cancel()
req, err := http.NewRequestWithContext(ctx, "GET", "https://example.com", nil)
```

It's important to note that you should use an appropriate timeout value, it should be short enough that it can quickly fail when there is a problem, but long enough that it doesn't fail prematurely. A good rule of thumb is to set the timeout to twice the expected response time of the server.

Also, you may want to handle the HTTP 499 errors, which are client closed request, by using the `http.CloseNotifier` interface.

## Example

Here is an example of Go code that makes multiple nested API calls and handles the `http.CloseNotifier` interface to detect when the client has closed the connection:

```go
package main

import (
	"context"
	"fmt"
	"net/http"
	"time"
)

func main() {
	// Create a new http.Server
	srv := &http.Server{Addr: ":8080"}

	// Create a new http.Client with a timeout
	client := &http.Client{Timeout: time.Second * 10}

	// Create a new http.HandlerFunc to handle requests
	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		// Create a new context with a timeout
		ctx, cancel := context.WithTimeout(r.Context(), time.Second*5)
		defer cancel()

		// Create a new request with the context
		req, err := http.NewRequestWithContext(ctx, "GET", "https://example.com", nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Detect if the client closes the connection
		notify := w.(http.CloseNotifier).CloseNotify()

		// Make the first API call
		resp, err := client.Do(req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		// Make another API call with the first API call's response
		req, err = http.NewRequestWithContext(ctx, "GET", resp.Header.Get("Location"), nil)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}

		resp, err = client.Do(req)
		if err != nil {
			http.Error(w, err.Error(), http.StatusInternalServerError)
			return
		}
		// Process the response
		//...
		// check if the connection is closed
		select {
		case <-notify:
			fmt.Println("Client closed the connection")
			return
		case <-ctx.Done():
			fmt.Println("Request timed out")
			return
		}

		w.Write([]byte("Hello World!"))
	})

	srv.ListenAndServe()
}

```

The code creates a new `http.Server` and starts listening on port 8080. When a request comes in, the server creates a new `http.Client` with a timeout of 10 seconds and makes a GET request to "[https://example.com](https://example.com/)". It also makes another request using the location returned in the first response's headers.

The `http.CloseNotifier` interface is used to detect when the client closes the connection, by using the `w.(http.CloseNotifier).CloseNotify()` and check if the the context's Done channel is closed to determine if the request has timed out.

In this example, if the client closes the connection or the request times out, the server will print a message and return without processing the response. Otherwise, it will write "Hello World!" to the response.

It's important to note that this example is simplified and that you may need to add more error handling and logging in a production environment.
