#!/bin/bash
echo "Initializing KiteServer"
echo "Starting mongo"
open -a Terminal "mongod"
open -a Terminal "node ~/Desktop/KiteServer/app.js"