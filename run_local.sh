#! /bin/bash

HOST=127.0.0.1
PORT=${PORT:-4000}
MAX_PORT=4010
BUILD_DIR=${BUILD_DIR:-/tmp/wrborrelli-site-serve}

while nc -z "$HOST" "$PORT" >/dev/null 2>&1; do
  echo "Port $PORT already in use, trying $((PORT + 1))..."
  PORT=$((PORT + 1))
  if [ "$PORT" -gt "$MAX_PORT" ]; then
    echo "No available ports between 4000 and $MAX_PORT. Exiting."
    exit 1
  fi
 done

echo "Starting Jekyll on http://$HOST:$PORT"
echo "Writing generated site to $BUILD_DIR"
bundle exec jekyll serve -l -H "$HOST" -P "$PORT" --destination "$BUILD_DIR"

