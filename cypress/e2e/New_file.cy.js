describe("Greenkart Testing", function() {
    it("Works as Expected", function() {
        cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/")
        cy.title().should('eq', 'GreenKart - veg and fruits kart')
        cy.get('.search-keyword').type('maize')
        cy.get("h2").should('have.text', 'You cart is empty!Sorry, no products matched your search!You cart is empty!')
        // above test might have a bug the text displayed is not as expected
        
    })     
})