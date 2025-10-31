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
  it ('admin tab', function () {
    cy.get(".oxd-main-menu-item").eq(0).click()
    cy.get('.oxd-topbar-body-nav-tab').eq(0).click()
    cy.get('.oxd-dropdown-menu > li').click()
    cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text-input').click()
    cy.get('.oxd-select-dropdown > :nth-child(2) > span').click()
    cy.get('.oxd-select-text-input').should('contain.text','Enable')
  })
  //Way 2
  //it.only ('admin tab', function(){
    //cy.get('.oxd-main-menu-item').eq(0).click()
    //cy.get('.--visited > .oxd-topbar-body-nav-tab-item').click()
    //cy.get(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text > .oxd-select-text--after > .oxd-icon').click()
    //cy.get('.oxd-select-option').each(($el) => {
    //if($el.text() === "Enabled"){
          //cy.wrap ($el).click()
      //}
    //})
   //cy.get('.oxd-select-text-input').should('contain.text', 'Enabled')

  //})

  //Calendar date picker
  it.only ('calendar date picker', function(){
    //trying a new way instead of class and ids to click on leave used href
    cy.get ('a[href="/web/index.php/leave/viewLeaveModule"]').click()
    cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').should('have.attr','placeholder','yyyy-dd-mm').click()
    // dont hard code dates in cypress tests, always use variables because hard coded dates will become invalid after some time
    // lets create variables for month, year ,date
    const month = 'November' //use two digits for month to match format in the date picker in inspector
    const year = '2024'
    const date = '15'
    //when you callingvariables you dont use quotes since they are not strings
    cy.get('.oxd-calendar-selector-month-selected').click()
    cy.get('.oxd-calendar-dropdown > :nth-child(11)').click()
    //lets assert month changed to November
    cy.get('.oxd-calendar-selector-month-selected').should('have.text',month)
    cy.get('.oxd-calendar-selector-year-selected > .oxd-icon').click()
    //select 2024 witha calendar starting from 1970 to 2030 using scrollIntoView...although below should also work without scrollIntoView
    cy.get('.oxd-calendar-dropdown').contains(year).scrollIntoView().click()
    cy.get('.oxd-calendar-dates-grid').contains(date).click()
    //assert date selected is correct  
    cy.get(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-date-wrapper > .oxd-date-input > .oxd-input').should('have.value','2024-15-11')
  })
})