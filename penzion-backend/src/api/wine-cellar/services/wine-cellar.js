'use strict';

/**
 * wine-cellar service
 */

const { createCoreService } = require('@strapi/strapi').factories;

module.exports = createCoreService('api::wine-cellar.wine-cellar');
