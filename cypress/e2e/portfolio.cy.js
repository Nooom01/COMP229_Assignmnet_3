describe('Portfolio Application E2E Tests', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })

  it('should load the home page', () => {
    cy.contains('Hello World')
  })

  it('should navigate to About page', () => {
    cy.get('a').contains('About').click()
    cy.url().should('include', '/about')
    cy.contains('About Me')
    cy.contains('Naomi Murai')
  })

  it('should navigate to Contact page', () => {
    cy.get('a').contains('Contact').click()
    cy.url().should('include', '/contact')
    cy.contains('Contact', { matchCase: false })
  })

})