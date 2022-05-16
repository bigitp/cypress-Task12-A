/// <reference types="cypress" />

import { textTo } from "../pageObjects/form"

describe('Add product to cart tests', () => {
  beforeEach('clears seesion and logs in  user', () => {
    cy.window().then((win) => {
      win.sessionStorage.clear()
    })
    cy.login()
  })
  it('Add product to cart from catalog page', () => {
    cy.addProductToCart()  // custom command to add and check cart badge is updated

    cy.forceVisit('/inventory-item.html?id=3') // go to items details page 

    cy.addProductToCart()

    cy.get('[class="cart_item"]').its('length').should('eq', 2)   // verify if is the correct items are present (2 different items)

    cy.get('[class="cart_item"]').eq(0).find('button').click()     // find the 1st item and removes it

    cy.get('[class="cart_item"]').its('length').should('eq', 1)  // check if items are subtracted correctly  

    cy.get('[data-test=checkout]').click() // click the checkout button

    textTo.orderSubmission('Petar', 'Smith', '55000') // submit the details for order : name : last name : postal code

    cy.get('[data-test=finish]').click() // click finish button

    cy.get('.complete-header').should('contain', 'THANK YOU FOR YOUR ORDER') // check if ordering is placed

  })

})
