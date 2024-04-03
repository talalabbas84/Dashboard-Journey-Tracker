/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --

import "cypress-clipboard"


// @ts-ignore
Cypress.Commands.add('login', () => { 
   cy.intercept("/api/auth/session", { fixture: "session.json" }).as("session")
   cy.setCookie(
     "next-auth.session-token",
     "eyJhbGciOiJkaXIiLCJlbmMiOiJBMjU2R0NNIn0..mDsS-b5w8dRluy1Z.U1vZK40LsUNxWnQl8Exzon9PFQk0iPM_SkPGL0vCn_iPiM_v2eUMJi4C3kXzVNyBTqQ8TikxGViLqn44Ee_lhaFXCjW5EI7fFzXgVcAmkLpLr_5rXdjiGqrOoWrQTMv6k-QNGLp_YnK6Uq38f3Bsjlp4ja2M2zlM4R8fYMaGG3bM7fIHCg5ZTwDotvGNuR3sVmAf6ENlJAWZsM4c36at73_YcmywPhpObnCdsw.50IavPtQBal_eomSrMb11w"
   )
   
   
 })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
// declare global {
//   namespace Cypress {
//     interface Chainable {
//       login(): Chainable<void>
//       // drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       // dismiss(subject: string, options?: Partial<TypeOptions>): Chainable<Element>
//       // visit(originalFn: CommandOriginalFn, url: string, options: Partial<VisitOptions>): Chainable<Element>
//     }
//   }
// }