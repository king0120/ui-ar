
//  @ts-ignore
describe("login", () => {
  describe('log in', () => {
    it('should navigate to log-in by default', () => {
      cy.visit('localhost:3001/anything');
      cy.url().should('include', '/login')
      cy.contains('LOGIN TO YOUR ACCOUNT')
    });

    it('should be able to log into the site', () => {
      cy.visit('localhost:3001/anything');
      cy.get('#login-email').type('king0120@gmail.com')
      cy.get('#login-password').type('1111')

      // Logs into account
      cy.get('.MuiButton-label').click()
      // Redirects to profile page
      cy.url().should('include', '/profile')
    });
  });

  describe('sign up', () => {

    it('should be able to navigate to the sign-up page', () => {
      cy.visit('localhost:3001/anything');
      cy.url().should('include', '/login')
      cy.contains('Create an account').click()
      cy.url().should('include', '/register')
      cy.contains('CREATE AN ACCOUNT')
    })
    it('should fill out first name and be required', () => {
      // FirstName
      // Check Required
      cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').focus().blur()
      cy.get('.MuiFormHelperText-root').should('have.text', 'Required')

      cy.get(':nth-child(1) > .MuiInputBase-root > .MuiInputBase-input').type('Cypress')
      cy.get('.MuiFormHelperText-root').should('not.exist')
    })
    it('should fill out last name and be required', () => {
      cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').focus().blur()
      cy.get('.MuiFormHelperText-root').should('have.text', 'Required')

      cy.get(':nth-child(2) > .MuiInputBase-root > .MuiInputBase-input').type('Cypress')
      cy.get('.MuiFormHelperText-root').should('not.exist')
    })

    it('should fill out city and state and be required', () => {
      cy.get('#address-input').type('atlanta')
      cy.get('.ap-suggestions:first-child').click()
    })

    // it('should fill out email and be required', () => {
    //   cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').focus().blur()
    //   cy.get('.MuiFormHelperText-root').should('have.text', 'Required')

    //   cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').type('Cypress')
    //   cy.get('.MuiFormHelperText-root').should('have.text', 'Please Enter A Valid Email')

    //   cy.get(':nth-child(4) > .MuiInputBase-root > .MuiInputBase-input').type('sample@auditionrevolution.com')
    //   cy.get('.MuiFormHelperText-root').should('not.exist')
    // })

    // it('should fill handle passwords', () => {
    //   cy.get(':nth-child(5) > .MuiInputBase-root > .MuiInputBase-input').focus().blur()
    //   cy.get('.MuiFormHelperText-root').should('have.text', 'Required')

    //   cy.get(':nth-child(5) > .MuiInputBase-root > .MuiInputBase-input').type('short')
    //   cy.get('.MuiFormHelperText-root').should('have.text', 'Password must be at least 6 characters')

    //   cy.get(':nth-child(5) > .MuiInputBase-root > .MuiInputBase-input').type('longlonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglonglong')
    //   cy.get('.MuiFormHelperText-root').should('have.text', 'Password must be under 30 characters')

    //   cy.get(':nth-child(5) > .MuiInputBase-root > .MuiInputBase-input').clear().type('thisone')
    //   cy.get('.MuiFormHelperText-root').should('not.exist')

    //   cy.get(':nth-child(6) > .MuiInputBase-root > .MuiInputBase-input').type('nomatch').blur()
    //   cy.get('.MuiFormHelperText-root').should('have.text', 'Passwords must match')

    //   cy.get(':nth-child(6) > .MuiInputBase-root > .MuiInputBase-input').clear().type('thisone').blur()
    //   cy.get('.MuiFormHelperText-root').should('not.exist')
    // })

    it('should check terms and conditions', () => {
      cy.get('#termsAndConditions').click()
      cy.get('#createAccount').should('not.be.disabled')
    })

    it('should navigate to profile when saved', () => {
      cy.server()
      cy.route({
        url: '/auth/register',
        method: 'POST',
        response: {
          accessToken: '12j3lkjf4',
          userId: '12345',
          displayName: 'Cypress Test'
        }
      })
      cy.get('#createAccount').click()
      cy.url().should('include', '/profile')
    })
  })
 
})
