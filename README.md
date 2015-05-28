# Realtime flux chat app

Flux on the client and server! This chat app uses the same dispatcher, actions,
action creators, stores and views on both the client and server. Events are 
passed via websockets between the client and server. This is simply a proof of 
concept.

```
$ npm install
$ npm install -g browserify
$ npm run build
$ npm run start
```

Then open `http://localhost:3000` in a couple tabs and test it out!

The main client side app is in `app/app.js` and the server logic
