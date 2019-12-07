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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('dataCy', (name) => {
  return cy.get(`[data-cy='${name}']`)
})

Cypress.Commands.add('login', () => {
  let token;
  cy.request('POST', '/graphql', {
    operationName: 'login',
    query: "mutation login($email: String!, $password: String!) {  login(email: $email, password: $password) {    userId    accessToken    displayName    __typename  }}",
    variables: {
      email: "king0120@gmail.com", password: "1111"
    }
  })
    .its('body')
    .then((res) => {
      console.log(res)
      token = res.data.login.accessToken
    })

  cy.visit('/', {
    onBeforeLoad(win) {
      // and before the page finishes loading
      // set the user object in local storage
      win.localStorage.removeItem('accessToken')
      win.localStorage.setItem('accessToken', token)
    },
  })
})