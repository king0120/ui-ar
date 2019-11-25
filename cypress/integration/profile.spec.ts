before(() => {
  cy.visit('localhost:3001/anything');
  cy.get('#login-email').type('king0120@gmail.com')
  cy.get('#login-password').type('1111')
  // Logs into account
  cy.get('.MuiButton-label').click()
  // Redirects to profile page
  cy.url().should('include', '/profile')
})

describe('should have info', () => {
  it('have a profile picture and header info', () => {
    cy.get("[data-cy='profile-picture']").invoke('attr', 'src').should('contain', 's3.amazonaws.com')
    cy.get("[data-cy='profile-display-name']").should('contain', 'Jamie King')
    cy.get("[data-cy='profile-address']").should('contain', 'Atlanta, GA')
    cy.get("[data-cy='profile-email']").should('contain', 'king0120@gmail.com')
    cy.get("[data-cy='profile-phone']").should('contain', '(111) 111-1111')
  });

  it('should contain Actor Breakdown', () => {
    cy.get(':nth-child(2) > .w-8\/12 > :nth-child(2)').contains('30s-40s')
    cy.get('.w-8\/12 > :nth-child(4)').contains('Female')
    cy.get('.w-8\/12 > :nth-child(6)').contains('Asian')
    cy.get('.w-8\/12 > :nth-child(6)').contains('African American')
  })
});
