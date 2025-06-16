// Import Cypress type definitions
import 'cypress';

// Extend Cypress types
declare global {
  namespace Cypress {
    interface Chainable {
      loginByApi(): Chainable<void>;
    }
  }
}