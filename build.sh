#!/bin/bash

# Default passcode if environment variable is not set
PASSCODE="${PARENT_PASSCODE:-0000}"

# Copy index.html to public directory and replace placeholder
mkdir -p public
sed "s/__PARENT_PASSCODE__/$PASSCODE/g" index.html > public/index.html

echo "Build complete. Passcode injected."

