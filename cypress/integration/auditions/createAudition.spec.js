/// <reference types="Cypress" />
describe("Create Audition", () => {
  before(() => {
    cy.login()
  })

  it('successfully loads', function () {
    cy.visit('/organization/e8da66fc-e260-4496-af12-c3a2b7ccd0ef/projects/15c0a65a-293d-474f-b73e-8a858b3d8947/dashboard')
  })

  it('can navigate to Audition side tab', () => {
    cy.contains("Auditions").click()
  })

  describe('create no timeslot audition', () => {
    context('Page One', () => {
      it('can click to open modal', () => {
        cy.contains("Create Audition").click()
        cy.url().should('include', '/createAudition')
        cy.contains("Create A New Audition")
      })

      it('can fill first page', () => {
        cy.dataCy('audition-name').type('Cypress Audition')
      })

      it('can select address', () => {
        cy.dataCy('audition-address').type('20 W 34th St')
        cy.contains('20 West 34th').click({ force: true })
      })

      it('can select a date', () => {
        cy.dataCy('audition-start-date').find('input').clear()
        cy.dataCy('audition-start-date').type('11/27/2023 10:34 am')
      })

      it('can select Open Call', () => {
        cy.dataCy('open-call').click()
      })

      it('navigates to page 2', () => {
        cy.contains('Next').click()
        cy.contains('Audition Prep')
        cy.contains('Description')
      })
    })
  })
  context('Page Two', () => {
    it('fills out description', () => {
      cy.dataCy('audition-description').find('textarea').type('This is the description for my fake audition', {force: true})
      cy.dataCy('audition-prep').find('textarea').type('This is the prep for my fake audition', {force: true})
    })

    it('navigates to page 3', () => {
      cy.contains('Next').click()
      cy.contains('Which Roles Are You Auditioning For?')
    })
  })
  context('Page Three', () => {
    // TODO: Make this page better and test it
    it('fills out description', () => {
      cy.contains('Which Roles Are You Auditioning For?')
    })

    it('navigates to page 4', () => {
      cy.contains('Next').click()
    })
  })
  context('Page Four', () => {
    it('has default question', () => {
      cy.dataCy('audition-question-1').find('input').should('have.value', "Please list conflicts, leave blank if none.")
    })
    
    it('can add questions', () => {
      cy.contains('Add Question').click()
      cy.dataCy('audition-question-2').find('input').type('This question is from cypress')
      cy.contains('Add Question').click()
      cy.dataCy('audition-question-3').find('input').type('another 1 from cypress')
    })

    it('saves the audition', () => {
      cy.contains('Create Audition').click()
      cy.url().should('contain', '/auditions')
    })
  })
  context('clean up. Can delete audition', () => {

  })
})
