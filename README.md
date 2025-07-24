# Airport System Web Service API

## Overview

This web service API consists of two main services:
1. Admin Flight Management
2. Customer Flight Scheduler

## Installation/Running Services
**Installation 
  - In VS code open project in workspace, and open the terminal
  - In the terminal navigate to backend directory:
    cd backend

  - Run the following commands to initialize the project and install required dependencies (express, nodemon, mysql2, cors, sequlize):
    npm install

       * If setting up project from scratch run the following commands
         npm init -y
         npm i express nodemon mysql2 cors sequelize
**To Airport System Web Service API
  - Ensure that your package.json has the following script for starting the Airport System Web Service:
    
    "scripts": {
    "start": "nodemon index.js"
  }

  - Then in the terminal run the following comman to start the Airport System Web Service:
    npm start

  - Both Admin Flight Management and Customer Flight Scheduler are impemented within the same index.js file, therefore both will be active upon 'npm start' command

*Admin Flight Management
  - This service manages flights and provides CRUD operations.

*Customer Flight Scheduler
  - This service provide customer flight scheduling via update operations

## The Data utilized in thie web service API is sourced from the https://rowzero.io/datasets/us-flights-dataset, which contains collection of sample flight data modified by me.

