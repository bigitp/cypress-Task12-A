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

import InventoryPage from '../pageObjects/InventoryPage'

Cypress.Commands.add('login', () => {
  cy.fixture('user').then((userData) => {
    cy.visit('https://www.saucedemo.com')
    cy.get('[data-test="username"]').type(userData[0].username)
    cy.get('[data-test="password"]').type(userData[0].password)
  })
  cy.get('#login-button').click()
})

Cypress.Commands.add('addProductToCart', () => {
  InventoryPage.clickAddToCartBtn()
  // check "ADD TO CART" button has changed to "REMOVE" button
  InventoryPage.removeButton.should('contain', 'Remove')
  // check shopping cart badge exists and is displayed.
  InventoryPage.shoppingCartBadge.should('exist').and('be.visible')
  InventoryPage.clickShoppingCartButton()
  cy.url().should('include', '/cart.html')
})

Cypress.Commands.add('forceVisit', url => {
  cy.window().then(win => {
    return win.open(url, '_self');
  });
});

Cypress.Commands.add('removeProductAndCheck', () => {
  let number

  InventoryPage.clickRemoveBtn()

  InventoryPage.shoppingCartBadge.then(($number) => {
    number = $number.text()
  })

  InventoryPage.shoppingCartBadge.should(($lis) => {
    let pnumber = parseInt(number)

    expect($lis).to.contain(pnumber)
  })

  InventoryPage.clickShoppingCartButton()
  cy.url().should('include', '/cart.html')
  cy.get('[data-test="continue-shopping"]').click()
})
