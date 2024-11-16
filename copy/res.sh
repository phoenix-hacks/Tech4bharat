#!/bin/bash
npm run clearCache
# Define the URL for the API call
API_URL="https://api.github.com/search/repositories?q=mern+chat+app+language:javascript&per_page=5"

# Define the output file name
OUTPUT_FILE="clone_urls.txt"

# Use curl to fetch the data, process it, and save it into the file
curl -s "$API_URL" | grep '"clone_url"' | sed -E 's/.*"clone_url": "(.*)",/\1/' > "$OUTPUT_FILE"

# Print a success message
echo "Clone URLs saved to $OUTPUT_FILE"

node f.js
