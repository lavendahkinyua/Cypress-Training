describe ("OrangeHrm Testing" , function() {
  it ("opens sucessfully" , function() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.title().should('eq' , 'OrangeHRM')
  })

})