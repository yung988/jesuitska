'use strict';

/**
 * concierge-service service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::concierge-service.concierge-service');
