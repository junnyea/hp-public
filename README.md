# hp-public


### ORDER-SVC
    This microservice exposes 3 endpoints
 
    POST: /order/purchase

    POST: /order/async-purchase

    GET: /order/status/:msgId
        


### ORDER-WRK  
    
    This micoservice do not expose any endpoints and act as worker for messaging queue.
    
    Service created to consume ASYNCHRONOUS MESSAGE FROM QUEUE


### To Setup:

1. Navigate to \order-svc or \order-wrk
2. ```npm install```
3. Make sure you configure .env at the root of the microservice project. Sample shown as below.

```
NODE_ENV=DEV
PORT=6001
# Set your database/API connection information here
API_KEY=**************************
API_URL=**************************

# DB CREDENTIALS
DB_DATABASE = postgres
DB_HOST = =**************************
DB_PORT = =**************************
DB_USER = =**************************
DB_PASSWORD = =**************************

## RMQ
URI = **************************
```

4. After all the configuration and setup, you may start the app with 
```npm run startlocal```


### Please note that this project is for illustration purpose and not for commercial purposes. Do not copy, share or distribute online, only for view by intended audiences