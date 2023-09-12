package main

import (
    "fmt"
    "net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello from backend");
}

func main() {
    http.HandleFunc("/", handler)
    http.ListenAndServe(":8080", nil)

    http.HandleFunc("/api/hello", handler)
}

