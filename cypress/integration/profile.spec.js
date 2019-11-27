describe('profile page', () => {
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
      cy.dataCy("profile-picture").invoke('attr', 'src').should('contain', 's3.amazonaws.com')
      cy.dataCy("profile-display-name").should('contain', 'Jamie King')
      cy.dataCy("profile-address").should('contain', 'Atlanta, GA')
      cy.dataCy("profile-email").should('contain', 'king0120@gmail.com')
      cy.dataCy("profile-phone").should('contain', '(111) 111-1111')
    });

    it('should have link to email actor', () => {
      cy.dataCy("profile-email").find('a').should('have.attr', 'href', 'mailto://king0120@gmail.com')
    })

    it('should have link to call actor', () => {
      cy.dataCy("profile-phone").find('a').should('have.attr', 'href', 'tel://1111111111')
    })

    it('should contain Actor Breakdown', () => {
      cy.dataCy("Age Range30s-40s").should('exist')
      cy.dataCy("GenderFemale").should('exist')
      cy.dataCy("EthnicityAsian").should('exist')
      cy.dataCy("EthnicityAfrican American").should('exist')
    })
  });

})
