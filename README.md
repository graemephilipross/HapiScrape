Node version 6 required

npm install

running on port :3000
prefix: /api

Testing:
npm test

debug tests:
mocha ./Plugins/Scraper/test/scraperFacade.js --debug-brk
'attach' debug process in vs code

Localhost SSL proxy

concurrently run
local-ssl-proxy --source 3001 --target 3000
npm start