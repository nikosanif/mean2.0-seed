# MEAN 2.0 - Seed with ExpressJS, MongoDB, Gulp and Typescript


## Prerequisites

1. Latest version of Node to be installed.
2. Install MongoDB and make sure it is running on default port 27017 (if not then please configure constants.ts and change the connection for mongoDB).

## Global packages
```
    npm install gulp -g
    npm install ts-node -g
    npm install typescript-node -g
```

## Steps to Run
```
    npm install          <= install all the npm Dependencies
    npm run build        <= build and compile the dest folder (_dist)
    npm run deploy       <= start the Nodemon and watch for changes.
```

## Tests

#### 1. Mocha
```
    gulp test            <= Makes tests with Mocha
```

#### 2. Istanbul
```
    gulp test:coverage       <= Makes tests with Mocha
```

#### 3. E2E
```
    gulp build
    gulp test:e2e       <= E2E tests with protractor
```