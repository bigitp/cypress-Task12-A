

export class TextBox {
    
orderSubmission(name,surName,postal){
    cy.get('.shopping_cart_link').click()
    cy.get('[data-test="checkout"]').click()          
    cy.get('[data-test="firstName"]').type(name)
    cy.get('[data-test="lastName"]').type(surName)
    cy.get('[data-test="postalCode"]').type(postal)
    cy.get('[data-test="continue"]').click()  
}
}

export const textTo = new TextBox()