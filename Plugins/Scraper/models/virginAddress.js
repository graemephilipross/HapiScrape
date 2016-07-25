"use strict";

module.exports = class VirginAddress {
    constructor(address = {}) {
        this.addressLine1 = address.addressLine1 || '';
        this.city = address.city || '';
        this.postcode = address.postcode || '';
    }
};