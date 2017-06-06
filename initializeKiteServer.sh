#!/bin/bash
echo "Initializing KiteServer"
echo "Starting mongo"
terminal -e mongod
terminal -e node ~/Desktop/KiteServer/app.js