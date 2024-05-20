Cypress.Commands.add('AddNote', (quantidade) => {
    cy.get('a').click()
    cy.get('input').type('Pedro')
    cy.get('.btn-fill').click()
    cy.get('input').type('Importancia do teste de software')
    cy.get('textarea').type('O teste de software é uma forma de identificar e solucionar os erros de um sistema antes que ela chegue até o cliente.')
    cy.get('.btn-fill').click(quantidade)
} )