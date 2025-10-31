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
    it("visible and invisible elements" , function () {
        cy.get('[name="show-hide"]').should('be.visible')
        cy.get('#hide-textbox').click()
        cy.get('[name="show-hide"]').should('not.be.visible')
        cy.get('#show-textbox').click()
        cy.get('[name="show-hide"]').should('be.visible')

    })
    //alert , one button message
    it("alert learning" , function () {
        //Cy.on comes before cy.get beceuse its a listener so before you even click the button you have to listen to the event
        cy.on('window:alert',(text) => {
            expect (text).to.equal('Hello , share this practice page and share your knowledge')
        })
        cy.get('#alertbtn').click()
       
    })   
    //Confirm, two button message
    it('confirm learning' , function () {
        //CY.ON TO LISTEN AND GIVE IT INSTRUCTIONS OF WHAT ITS LISTENING TO
        cy.on('window:confirm' , (popup) => {
            expect (popup).to.equal('Hello , Are you sure you want to confirm?')
            return false // to click cancel button
            // return true // to click ok button
        })
        cy.get('#confirmbtn').click()
    })

    //windows and tabs handling
    it('diffrent tab diffrent domain' , function () {
        cy.get('#opentab').invoke('removeAttr','target').click()
        //no end slash in url
        cy.origin('https://www.qaclickacademy.com', () => {
            cy.contains('Best platform to learn Software and Automation Testing').should('be.visible')
        })
    })
    //webtable handling
    it('webtable handling' , function () {
        //if there is more than one table use table IDs or classes to locate the correct one if its one you can use cy.get('table')
        cy.get('.tableFixHead').should('be.visible')
        
        //fixed head test. to avoid it selecting the head you can use below
        cy.get('.tableFixHead tbody tr').eq(8).scrollIntoView().find('td').eq(2).should('have.text','Delhi')
        //for below am counting the header as row 0 but if you dont want to count it as row 0 use tbody in the selector
        cy.get('.tableFixHead tr').eq(9).scrollIntoView().find('td').eq(2).should('have.text','Delhi')
        // the two lines of code are doing same thing just different way of counting rows
    })

    //hidden element handling when you can hover or similar interactions- a way to reveal hidden elements
    it('mouse hover handling' , function() {
       cy.get('.mouse-hover-content').invoke('show') 
       cy.get('.mouse-hover-content').contains('Top').click()
    
    })
     
    //frame handling- mini html doc inside a html doc
    //first you need to install cypress-iframe package by running npm install -D cypress-iframe in terminal
    //then you need to add this line in cypress/support/e2e.js : import 'cypress-iframe';
    //then to start using it you need to add this line in your test file : /// <reference types="cypress-iframe" />
    //then now inspect the frame and get its id or class or any other locator, you will know its a frame if you see <iframe ......> in html
    //we use frame Id to tell cypress to switch to that frame not anything else on the page
    it.only('frame handling' , function () {
        //switching to frame using frame id and frameloaded function to tell cypress to switch to iframe mode
        cy.frameLoaded('#courses-iframe')
        //now we are inside the frame and we can do anything inside the frame
        //you have to use cy.iframe() to tell cypress you are working inside the frame
        // without cy.iframe() cypress will look for elements in main html doc not inside the frame
        // syntax : cy.iframe().find('whatever you are looking for inside the frame, link, text etc')
        cy.iframe().find('a[href="https://courses.rahulshettyacademy.com/courses"]').eq(2).click({force:true})
        cy.frameLoaded() //reloading frame to avoid any errors
        //other tests that are not href related using contains
        //error subject no longer attached to DOM- to avoid this error we use cy.frameLoaded() to reload the frame
        cy.iframe().contains('All-Access Membership').click({force:true})
    
    })
})
