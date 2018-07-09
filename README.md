# and-workshop-corejs-solutions

## My solutions to the and-workshop-corejs tests

## Getting started

1 - install or update nodejs to the latest version:

```
brew install node
```

2 - install [Jest](https://facebook.github.io/jest/) globally:

```
npm install -g jest
```

3 - install nodemon globally

```
npm install -g nodemon
```

4 - install node modules

```
npm install
```

** You should run the tests individually **

```
jest --watch <test-file>
```

For the non test files, use nodemon to automatically load the change you (eventually) make

```
nodemon <file>
```

This will also be used for running the server in exercise 14

```
nodemon server.js
```
