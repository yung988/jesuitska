'use strict';

/**
 * `is-public` policy
 * Allows public access to room endpoints
 */

module.exports = async (policyContext, config, { strapi }) => {
  // Allow all requests - can be customized based on your needs
  return true;
};
