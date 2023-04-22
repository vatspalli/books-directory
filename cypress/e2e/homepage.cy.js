describe('First test', () => {
  const books = [{
    title: 'Title 1',
    author: "Author 1",
    country: "Country 1",
  },{
    title: 'Title 2',
    author: "Author 2",
    country: "Country 2",
  }];

  it('should load homepage', () => {
    cy.intercept('GET','http://127.0.0.1:3000/getBooks', books).as('getBooks');
    cy.visit('../../src/index.html');
    cy.get('td'); // Check if at least one book is present
  })

  it('should show books count', () => {
    cy.intercept('GET','http://127.0.0.1:3000/getBooks', books).as('getBooks');
    cy.visit('../../src/index.html');
    cy.get('#count').contains('2');
  })

  it.only('should delete a book', () => {
    const deleteBookResponse = {
      status: 'Success'
    }
    cy.intercept('POST','http://127.0.0.1:3000/deleteBook', deleteBookResponse).as('deleteBook');
    cy.intercept('GET','http://127.0.0.1:3000/getBooks', books).as('getBooks');
    cy.visit('../../src/index.html');
    const deleteButtons = cy.get('button');
    deleteButtons[1].click();
  })
})