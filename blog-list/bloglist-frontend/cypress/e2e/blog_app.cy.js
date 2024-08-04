describe('BLOG APP', function() {
  beforeEach(function() {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const user = {
      name: 'test admin',
      username: 'testadmin',
      password: '1234567890'
    }

    const user1 = {
      name: 'test1',
      username: 'test1',
      password: 'test1'
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user)
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, user1)
    cy.visit('')
  })

  it('Login form is shown', function() {
    cy.contains('Login')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.Login({ username: 'test1', password: 'test1' })

      cy.contains('test1 Logged in')
    })

    it('fails with wrong credentials', function() {
      cy.contains('Login').click()
      cy.get('#username').type('testadmin')
      cy.get('#password').type('123456789')
      cy.get('#login').click()

      cy.get('.failed')
        .should('contain', 'invalid username or password')
        .and('have.css', 'color', 'rgb(255, 0, 0)')
    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.contains('Login').click()
      cy.get('#username').type('testadmin')
      cy.get('#password').type('1234567890')
      cy.get('#login').click()
    })

    it('A blog can be created', function() {
      cy.contains('New Post').click()
      cy.get('#title').type('Testing is Complicated')
      cy.get('#author').type('James Blunder')
      cy.get('#url').type('www.yahoo.com')
      cy.contains('create').click()

      cy.contains('Testing is Complicated')
    })

    it('Users can like a blog post', function() {
      cy.contains('New Post').click()
      cy.get('#title').type('Testing is Complicated')
      cy.get('#author').type('James Blunder')
      cy.get('#url').type('www.yahoo.com')
      cy.contains('create').click()

      cy.contains('Testing is Complicated')
      cy.contains('view').click()
      cy.contains('like').click()
    })

    it('user can delete blog post', function() {
      cy.contains('New Post').click()
      cy.get('#title').type('Testing is Complicated')
      cy.get('#author').type('James Blunder')
      cy.get('#url').type('www.yahoo.com')
      cy.contains('create').click()

      cy.contains('Testing is Complicated')
      cy.contains('view').click()
      cy.contains('remove').click()
      cy.contains('Testing is Complicated').should('not.exist')
    })
  })

  describe('blog end', function() {
    describe('starter block', function () {
      beforeEach(function() {
        cy.Login({ username: 'test1', password: 'test1' })
        cy.createBlog({ title: 'A good place to Win', url: 'bonder.com', author: 'Kathrine Slick', likes: 10 })
        cy.createBlog({ title: 'Good Times', url: 'goodtimes.com', author: 'James Tick', likes: 15 })
        cy.createBlog({ title: 'Jumanji: Rise of Gru', url: 'Jumanji.com', author: 'Horror story', likes: 20 })
        cy.createBlog({ title: 'winter falls', url: 'got.uk.com', author: 'Viking Slick', likes: 25 })
      })

      it('ordered according to likes', function() {
        cy.get('.first').eq(2).should('contain', 'Good Times')
        cy.get('.first').eq(0).should('contain', 'winter falls')
        cy.get('.first').eq(3).should('contain', 'A good place to Win')
        cy.get('.first').eq(1).should('contain', 'Jumanji: Rise of Gru')
      })
    })
  })
})
