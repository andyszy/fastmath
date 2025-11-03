#!/bin/bash

# Default passcode if environment variable is not set
PASSCODE="${PARENT_PASSCODE:-0000}"

# Create directory structure
mkdir -p public
mkdir -p public/multiplication
mkdir -p public/squares

# Copy main index.html
cp index.html public/index.html

# Copy multiplication index.html with passcode injection
sed "s/__PARENT_PASSCODE__/$PASSCODE/g" multiplication/index.html > public/multiplication/index.html

# Copy squares index.html
cp squares/index.html public/squares/index.html

echo "Build complete. Passcode injected for multiplication mode."

