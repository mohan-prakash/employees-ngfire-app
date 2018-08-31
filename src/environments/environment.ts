// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: 'AIzaSyBLYtluxGi2TTe3nC0u-7CR-mjojOrrCuA',
    authDomain: 'employees-ngfire-app.firebaseapp.com',
    databaseURL: 'https://employees-ngfire-app.firebaseio.com',
    projectId: 'employees-ngfire-app',
    storageBucket: 'employees-ngfire-app.appspot.com',
    messagingSenderId: '810434383384'
  },
  apiUrl: 'http://localhost:3000/api'
};

/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
