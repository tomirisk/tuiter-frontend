# Tuiter

## Set Up Environment

Use the `.env.default` file to create the `.env` file and set up all the mentioned variables.

For firebase variables, create a firebase account and follow the steps mentioned in [this guide](https://firebase.google.com/docs/storage/web/start).

After setting up the necessary environment variables, you'll need to update cors permissions for access data on firebase cloud. Follow the instructions mentioned for [cors configuration](https://firebase.google.com/docs/storage/web/download-files#cors_configuration). I've already created the [cors-config.json](./src/firebase/cors-config.json). Install `gsutil` and use the command `gsutil cors set cors-config.json <<BUCKET_NAME>>` to set up cors for firebase storage.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
