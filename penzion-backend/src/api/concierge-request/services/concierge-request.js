'use strict';

/**
 * concierge-request service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::concierge-request.concierge-request');
