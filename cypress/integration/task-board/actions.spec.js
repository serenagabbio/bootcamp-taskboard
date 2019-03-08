/// <reference types="Cypress" />

context('Actions', () => {

  beforeEach(() => {
    cy.visit('http://localhost:4200')
  })

  it('.type() type on an input field', () => {
    cy.get('.tasks-quick-add .input-line:nth-of-type(1) input').type('title')
    .should('have.value', 'title')
  })

})
