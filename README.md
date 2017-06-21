# Virgin Media Scraper
Scrapes Virgin Media web portals for availability data and service information for a given address or postcode: 
[Virgin Retailer Store](https://allyours.virginmedia.com/retailerstore/)

## Install and Launch
Scraper requires [Node.js](https://nodejs.org/) v6+ to run

```sh
$ npm install
$ npm start
```

For production environments...

```sh
$ npm install
$ NODE_ENV=production node index.js
```

## Config

Config properties can be found at `/Config/config.js`

Cache defaults:
* `cacheEnabled: true // bool`
* `cacheExpiration: 30 * 7 * 24 * 60 * 60 * 1000 // ms 1 month`

Production Redis Env:
* `host: 139.162.240.78`
* `port: 6379`

Development Redis Env:
* `host: 192.168.1.15`
* `port: 6379`

Default scraper timeout:
* `scraperTimeout: 30000 // ms`

## API

# Get Virgin Addresses

Get an array of Virgin address objects matching the string format used in [allyours.virginmedia.com/retailerstore/](https://allyours.virginmedia.com/retailerstore/)
`'Address Line 1, City, Postcode'`

**URL** : `/api/allyours/addresses?postcode=`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

Postcode has virgin availability:

```json
{
    "addresses": [
        {
            "addressLine1": "160 ADDYCOMBE TERRACE",
            "city": "NEWCASTLE UPON TYNE",
            "postcode": "NE65TY"
        },
        {
            "addressLine1": "162 ADDYCOMBE TERRACE",
            "city": "NEWCASTLE UPON TYNE",
            "postcode": "NE65TY"
        }
    ]
}
```

Postcode does not have virgin availability:

```json
{
    "addresses": []
}
```

## Scraper details

* Navigates to [allyours.virginmedia.com/retailerstore/](https://allyours.virginmedia.com/retailerstore/)
* Inputs the requested postcode at the element `input[name="postcode"]`
* Clicks `input[name="next"]` to submit the form
* Returns the contents of the select element `select[name="chosenAddress"]`

# Get Virgin Availability Info

Get virgin availability information and service data from [allyours.virginmedia.com/retailerstore/](https://allyours.virginmedia.com/retailerstore/)
Returns `Install Type Estimate`, `Install Estimate`, `Property Status` and `Site ID` if Virgin is available.

**URL** : `/api/allyours?addressLine1=&addressLine2=&city=&postcode=`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

Address has virgin availability:

```json
{
    "isVirginAvailable": true,
    "virginData": {
        "InstallEstimate": "2 - 3 Days",
        "InstallType": "Quick Start",
        "PropertyStatus": "Gone Away",
        "SiteID": "2"
    }
}
```

Address does not have virgin availability:

```json
{
    "isVirginAvailable": false,
    "virginData": {}
}
```

## Scraper details

* Navigates to [allyours.virginmedia.com/retailerstore/](https://allyours.virginmedia.com/retailerstore/)
* Inputs the requested postcode at the element `input[name="postcode"]`
* Clicks `input[name="next"]` to submit the form
* Waits for the select element `select[name="chosenAddress"]` to appear
* Selects the requested address from the list
* Scrapes the markup from the posted page to populate the Virgin Data obj

# Get Virgin Availability

Get virgin availability information and service data from [virginmediapartners.com/oub](https://www.virginmediapartners.com/oub)

**IMPORTANT: The webpage this scraper manipulates is currently offline as of June 2017**

**URL** : `/api/partners?addressLine1=&addressLine2=&city=&postcode=`

**Method** : `GET`

**Auth required** : NO

**Permissions required** : None

## Success Response

**Code** : `200 OK`

**Content examples**

Address has virgin availability:

```json
{
    "isVirginAvailable": true
}
```

## Scraper details

* Navigates to [virginmediapartners.com/oub](https://www.virginmediapartners.com/oub)
* Inputs the requested postcode at the element `#PostcodePostcode`
* Clicks `.postcode-trigger` to submit the form
* Waits for the select element `#address` to appear
* Selects the requested address from the list
* Scrapes `#cboxLoadedContent > p` to determine if Virgin is available
