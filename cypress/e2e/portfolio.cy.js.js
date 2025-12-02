describe('Portfolio Application E2E Tests', () => {
  beforeEach(() => {
    // Visit your app before each test
    cy.visit('http://localhost:5173')
  })

  it('should load the home page', () => {
    cy.contains('Hello World')
    cy.title().should('include', 'Assignment')
  })

  it('should navigate to About page', () => {
    cy.get('a[href="/about"]').click()
    cy.url().should('include', '/about')
    cy.contains('About Me')
    cy.contains('Naomi Murai')
  })

  it('should navigate to Contact page and fill form', () => {
    cy.get('a[href="/contact"]').click()
    cy.url().should('include', '/contact')
    
    // Fill the contact form
    cy.get('input[name="name"]').type('Test User')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="subject"]').type('Test Subject')
    cy.get('textarea[name="message"]').type('This is a test message from Cypress E2E testing')
    
    // Submit the form
    cy.get('button[type="submit"]').click()
  })

  it('should navigate through all main pages', () => {
    // Test navigation to each page
    const pages = [
      { link: '/about', text: 'About Me' },
      { link: '/education', text: 'Education' },
      { link: '/services', text: 'Services' },
      { link: '/contact', text: 'Contact' }
    ]

    pages.forEach(page => {
      cy.get(`a[href="${page.link}"]`).click()
      cy.url().should('include', page.link)
      cy.contains(page.text, { timeout: 10000 })
      cy.get('a[href="/"]').first().click() // Go back home
    })
  })
})

describe('Authentication E2E Tests', () => {
  it('should sign up a new user', () => {
    cy.visit('http://localhost:5173/signup')
    
    cy.get('input[name="name"]').type('Cypress Test User')
    cy.get('input[name="email"]').type('cypress@test.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('input[name="confirmPassword"]').type('password123')
    
    cy.get('button[type="submit"]').click()
    
    // Should redirect to home or signin after successful signup
    cy.url().should('not.include', '/signup')
  })

  it('should sign in with admin credentials', () => {
    cy.visit('http://localhost:5173/signin')
    
    cy.get('input[name="email"]').type('admin@portfolio.com')
    cy.get('input[name="password"]').type('admin123')
    
    cy.get('button[type="submit"]').click()
    
    // Should see admin link after login
    cy.contains('Admin', { timeout: 10000 }).should('be.visible')
  })

  it('should access admin dashboard', () => {
    // First login as admin
    cy.visit('http://localhost:5173/signin')
    cy.get('input[name="email"]').type('admin@portfolio.com')
    cy.get('input[name="password"]').type('admin123')
    cy.get('button[type="submit"]').click()
    
    // Wait for login to complete
    cy.wait(2000)
    
    // Navigate to admin dashboard
    cy.get('a[href="/admin"]').click()
    cy.url().should('include', '/admin')
    cy.contains('Admin Dashboard')
    cy.contains('Manage Users')
  })
})