# Local-First Demo

## Running Locally

1. `git clone` the repo
2. `cd` into the directory
3. `nvm use` to ensure you have the same node version
4. install packages with `npm install`
5. `yarn dev` or `npm run dev` etc.
6. app opens on `localhost:3000`

## Offline Capabilities

This is a PWA and will handle offline mode gracefully, you can still use the app in this case. An indicator will inform you of the network status, and you'll always be able to view cached data thanks to the service worker and IndexedDB integration.

NOTE: You need to run the app at least once online first to take effect, and you can optionally install the app to your device.

After this you can try switching your device into airplane mode or manually disconnecting/disabling your internet connection and launching the app again. This is the magic of local-first, we can bring the native experience to the web! 🧙‍♂️
