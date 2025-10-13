describe ("OrangeHrm Testing" , function() {
  beforeEach(() => {
    cy.visit("https://opensource-demo.orangehrmlive.com/web/index.php/auth/login")
    cy.get("input[name='username']").type("Admin")
    cy.get("input[name='password']").type("admin123")
    cy.get('.oxd-button').click()
 })
  it ('successful login', function(){
    cy.contains('Dashboard').should('be.visible')
  })

  it ('search box', function(){
    cy.get('.oxd-input').as('searchbox')
    cy.get('@searchbox').should('have.attr','placeholder','Search')
    cy.get('@searchbox').should('be.enabled')
  })
  it ('find user', function(){
    cy.get('.oxd-main-menu-item').eq(8).click()
    cy.contains('Rahul Das' , {timeout:40000}).should('be.visible')
  })
  

})