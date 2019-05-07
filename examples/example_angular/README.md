# Getting started

Make sure you have the [Angular CLI](https://github.com/angular/angular-cli#installation) installed globally, then run `npm install` to resolve all dependencies (might take a minute).

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

### HOW TOURGUIDE.JS IS INTEGRATED IN THIS PROJECT

1. Make sure to add tourguide.js folder in a folder from which you would import. Here tourguide.js repo is cloned and added in ./src/assets
2. To check how Tourguide.js works for the DashBoard, navigate to the folder ./src/app/home/home.component.ts, here you can see how Tourguide is being imported and configured to set up the tour
3. Make sure you import tourguide.css by updating angular.json
    "styles": [
              "src/styles.css",
              "src/assets/tourguide.js/tourguide.css"  <-- HERE 
            ],
4. This example shows how you can use your customized json to setup tourguide.js and let it explain the flow of your application.
5. Make sure you read the complete Readme.md of tourguide.js 
