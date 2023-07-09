# Web Synths

Web synths is an interactive musical expression tool. The user simply plays moves around a dot on their device, and sounds are then played out of the admin computer based on their commands. To replicate this project, you need to consider the three sections of the system, each split into a different folder.

## Server

The server exists as an extremely important aspect of the system. Originally, I attempted to host the server on the admin computer, minimizing the possibility of errors, but I quickly discovered that client web apps cannot communicate with URLs that lack SSL certificates, and instead of buying a domain for this project, I decided to host on a free server hosting site: Glitch.com. I highly recommend this service for this project, because of how easy it is to quickly setup. The `server.js` and `package.json` files in the `server` folder should be replicated in your Glitch.com project. Once you begin listening on your server port, get the URL endpoint of the Websocket connection, and go on to setting up the next steps.  

## Admin

The admin computer is the central point of the whole system. You must have Max MSP installed on your device. Additionally, in the file [receiver.js](adminReceiver/receiver.js), you must point the websocket towards your own server URL, on line 27. Then simply open the `synth.maxpat` file, and click the `script start` message in the top right of the patch. 

That command runs a the receiver file which serves as the websocket listener from the server, and upon any commands, it triggers certain actions in the Max patch, which in turn create sounds.

## Client

The client is a React app, which is intended to be run on a mobile device (although it would work fine on a desktop as well). Upon connecting the site, the user is assigned a random sound from the pool of sound found on the admin computer. The touchpad on the screen allows the user to play the sound, altering both the gain and the frequency shift of their sound. When they place their finger down, the sound plays, and stops upon release. When moved horizontally, the frequency of their sound gets changed alongside it. Similarly, vertical movements effect the sound's volume. Bare in mind, these sounds are all coming out of one device (the admin)!

Simply run `npm start` in the client directory to run it on your local device. You would need to change the URL to that of your server however, in [App.js](client/src/App.js), for the `WS_URL` constant.

Mine is currently deployed at: https://websynth-58077.web.app/

