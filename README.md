### Getting started

> Before you follow the steps below, make sure you have:
 - [Lightning-CLI](https://rdkcentral.github.io/Lightning-CLI/#/) installed _globally_ on your system
 - [Typescript](https://www.typescriptlang.org/) installed _globally_ on your system

```
npm install -g @lightningjs/cli typescript
```

#### Running the App

1. Install the NPM dependencies by running `npm install`


2. Build the App using the _Lightning-CLI_ by running `npm run build` inside the root of your project

3. Fire up a local webserver and open the App in a browser by running `npm run serve` inside the root of your project


#### Developing the Application

During development you can use the **watcher** functionality of the _Lightning-CLI_.


- use `lng watch` to automatically _rebuild_ your App whenever you make a change in the `src` or  `static` folder
- use `npm start` to start the watcher and run a local webserver / open the App in a browser _at the same time_

#### Firebase
```
npm run host <hostName>
```
Examples:
- `npm  run host comcast` to build the application with `comcast `configurations and deploy to `comcast` firebase host
- `npm run host qa:comcast` to build the application with `comcast `configurations and deploy to `qa` firebase host
- `npm run host develop:samsung` to build the application with `samsung `configurations and deploy to `develop` firebase host


#### Documentation

Use `lng docs` to open up the Lightning-SDK documentation.
