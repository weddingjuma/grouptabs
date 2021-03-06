# Grouptabs app (#nologin)

[Grouptabs](https://grouptabs.net/) lets you track shared expenses in a group of friends in a fun way.

It is an offline-capable installable web app, currently with a mobile (small screens) focus.

The no-login variant is currently in alpha and is supposed to replace the [remoteStorage](http://remotestorage.io/) variant soon. It uses PouchDB for persistence and to sync data to a central CouchDB data storage. Collaboration works without user accounts. Just share the tab ID.

The UI is built using ReactJS and Redux.

## Setup

1. Run `npm install` in this folder
2. Run `npm run serve` to start a local web server or serve this folder with any static web server.
3. Open [localhost:8080/index**.dev**.html](http://localhost:8080/index.dev.html) or where ever you're serving the app in your browser

For production, run `npm run build` and then use `index.html`.

## License

Grouptabs is licensed under [GPL v3 or any later version](https://tldrlegal.com/license/gnu-general-public-license-v3-(gpl-3)). Basically you are free to use, modify, share and improve it for any purpose, as long as you include the original changes and also publish any changes you make under the same license. Contributions are very welcome! :)

For more details and the full license, see the [COPYRIGHT.txt](COPYRIGHT.txt) and [LICENSE.txt](LICENSE.txt) files.
