/**
 * Created by graemeross on 19/06/2017.
 */

'use strict'

const VirginAddress = require('../models/virginAddress')

const cleanPostcode = postcode => 
  postcode
  .toUpperCase()
  .replace(/ /g, '')
  .replace(/,+$/, '')
  .trim()

const cleanAddress = address => 
  address
  .toUpperCase()
  .replace(/,+$/, '')
  .trim()

const virginPostcode = postcode => {
  if (postcode.length === 5) {
    return `${postcode.slice(0, 2)} ${postcode.slice(2)}`
  }
  if (postcode.length === 6) {
    return `${postcode.slice(0, 3)} ${postcode.slice(3)}`
  }
  if (postcode.length === 7) {
    return `${postcode.slice(0, 4)} ${postcode.slice(4)}`
  }
  return postcode
}

exports.formatAddress = function (address = {}) {
  const { 
    addressLine1 = '', 
    addressLine2 = '', 
    city = '', 
    postcode = '' 
  } = address
    // addressLine2 has data - assume its street name, addressLine1 is house no
    // addressLine2 is empty - assume addressline1 has house no and street name
  if (addressLine2) {
    return new VirginAddress({
      addressLine1: cleanAddress(`${addressLine1} ${addressLine2}`),
      city: cleanAddress(city),
      postcode: cleanPostcode(postcode)
    })
  }

  return new VirginAddress({
    addressLine1: cleanAddress(addressLine1),
    city: cleanAddress(city),
    postcode: cleanPostcode(postcode)
  })
}

exports.createVirginAddress = function (address) {
  const formattedPostcode = virginPostcode(address.postcode)
  return {
    address: `${address.addressLine1}, ${address.city}, ${formattedPostcode}`,
    postcode: `${formattedPostcode}`
  }
}

exports.addressObjsFromScrape = function (results) {
  return {
    addresses: results.addresses.map(address => {
      const addr = address.split(',')
      const postcode = addr.pop().replace(/ /g, '')
      const city = addr.pop().trim()
      const addressLine1 = addr.join(',').trim()

      return new VirginAddress({
        addressLine1,
        city,
        postcode
      })
    })
  }
}
