describe ("OrangeHrm Testing" , function() {
  it ("opens sucessfully" , function() {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.title().should('eq' , 'OrangeHRM')
    cy.contains('Admin')
    cy.contains('admin123')
    cy.get('[name="username"]').type("Admin")
    cy.get('[name="password"]').type("admin123")
    cy.get('.oxd-button').click()
    cy.get('.oxd-main-menu-search').should('exist')
    cy.get('.oxd-input').should('be.enabled')
    cy.get('.oxd-input').should('have.attr', 'placeholder' ,'Search')
    cy.get(':nth-child(1) > .oxd-main-menu-item').click()
    cy.get('nav').should('include.text', 'Qualifications')

  })

})