react-typescript-boilerplate-vscode
============================

The minimal dev environment to enable live-editing Typescript React components in Visual Studio Code.

### Usage

```
npm install
```
Press F5 in vscode to start debugging

Now edit `src/containers/app.tsx`.
Your changes will appear without reloading the browser

## Running production server

```
npm start
```

Visit [http://localhost:5000/](http://localhost:5000/).

**Note:** This will run the pre-built JavaScript files, if you want to play around with the source
you need to run the development server with webpack dev server (See below).

---

## Running development server

Run webpack dev server (for assets):

```
npm run start:dev
```

Visit [http://localhost:5000/](http://localhost:5000/).


### Testing

To run tests, use:

```
npm test
```

### License

MIT
