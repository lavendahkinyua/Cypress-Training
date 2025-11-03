describe('end to end testing', function() {
    it ('complete test', function() {
        cy.visit('https://rahulshettyacademy.com/loginpagePractise/')
        cy.get('#username').type('rahulshettyacademy')
        cy.get('#password').type('learning')
        cy.contains('Sign In').click()
        //  cy.get('#signInBtn').click()
        cy.contains('Shop Name').should('be.visible')
        cy.get('app-card').should('have.length', 4)
        //introduction to filter method
        cy.get('app-card').filter(':contains("Samsung Note 8")')
          .then($card => { // yielded element then we can proceed to use cypress actions 0n the elemnent.and for that we use cy.wrap because our yielded elemnt becomes an element and if you want tto test the elemnt you dont have to strt again with cy.get you can just use cy.wrap
              cy.wrap($card).contains('button', 'Add').click()
            })
          

    cy.get('app-card').eq(0).contains('Add').click()
    cy.contains('Checkout').click()
    //assert if the elements selected are in the checkout page
    cy.get('.row').should('contain.text' ,'Samsung Note 8').should('be.visible').and ('contain.text','iphone X')
    cy.get(':nth-child(4) > :nth-child(5) > .btn').click()
    cy.get('#country').type('Spa')
    cy.get('.suggestions > ul > li > a', {timeout:10000}).each(($el, index, $list) => {
        if($el.text() === "Spain"){
            cy.wrap ($el).click()
        }
    })
    //check the terms and conditions box
    cy.get('#checkbox2').check({force:true}).should('be.checked')
    cy.get('.ng-untouched > .btn').click()
    // assert message allert for sucess

    cy.get('.alert').should('be.visible').and('contain.text','Success! Thank you! Your order will be delivered in next few weeks :-).')
    //
    })
})