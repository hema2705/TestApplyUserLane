// ***********************************************
// This example commands.js shows you how to
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
// Cypress.Commands.add('login', (email, password) => { ... })
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
Cypress.Commands.add('invoke_browser', ()=> {
    cy.visit('https://www.userlane.com/about/careers/')
})
Cypress.Commands.add('accept_cookies', ()=> {

    cy.get('#usercentrics-root',{defaultCommandTimeout: 60000}).shadow().contains('Accept All').click();
})

Cypress.Commands.add("popupclose",()=>{
    Cypress.on("window:before:load", () => {
        cy.state("jQuery", Cypress.$);
      });
      cy.get(".popmake-close").click()
  
})