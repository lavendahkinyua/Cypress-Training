describe("Ui Web Controls Learning" , function () {
    beforeEach (() => {
        cy.visit("https://rahulshettyacademy.com/AutomationPractice/")
    })
    it (" check box ", function (){
        cy.get('[name="checkBoxOption1"]').check().should("be.checked")
        cy.get('[name="checkBoxOption1"]').uncheck().should("not.be.checked")
        cy.get('[type="checkbox"]').check(['option2','option3'])

    })

    it ("radio button learning" , function () {
        cy.get('.radioButton').as('radiobutton')
        cy.get('@radiobutton').eq(1).should('be.visible').and('not.be.checked')
        cy.get('@radiobutton').eq(0).check().should('be.checked')
        cy.get('@radiobutton').eq(2).check().should('be.checked')
        // confirm button 1 unchecked after selecting button 3
        cy.get('@radiobutton').eq(0).should('not.be.checked')
    })

    it ("static dropdown learning" , function () {
        cy.get('#dropdown-class-example').select('option2').should('have.value','option2')
    })

    it ("dynamic dropdown learning" , function () {
        cy.get('#autocomplete').type('Turk')
        cy.get('.ui-menu-item div').each(($el, index, $list) => {
            if($el.text() === "Turkey"){
                cy.wrap ($el).click()
            }
        })
        cy.get('#autocomplete').should('have.value','Turkey')

    })

})