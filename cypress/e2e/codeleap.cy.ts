describe('Formulário Codeleap', () => {
beforeEach(() => {
  cy.visit('/')
});

  it('Adicionando nota ao formulário', () => {
    cy.AddNote()
    cy.get('section > [aria-hidden="true"]').should('have.text','O teste de software é uma forma de identificar e solucionar os erros de um sistema antes que ela chegue até o cliente.' )
  })

  it.only('Realizando a exclusão da nota adicionada ao formulário', () => {
    cy.AddNote()
    cy.get('[aria-label="Delete your post Importancia do teste de software"]').click()
    cy.get('[aria-label="Delete your post Importancia do teste de software"]').should('not.exist')
  });

  it('Editando nota criada na aplicação', () => {
    cy.AddNote()
    cy.get('[aria-label="Edit your post Importancia do teste de software"]').click()
    cy.get(':nth-child(2) > textarea').type(' Realizando alteração para teste')
    cy.get(':nth-child(2) > textarea').should('have.text', 'O teste de software é uma forma de identificar e solucionar os erros de um sistema antes que ela chegue até o cliente. Realizando alteração para teste')
  });

  it('Adicionando a quantidade de notas criadas até existirem 20 ', () => {
    cy.AddNote(20);
  const btnFill = cy.get('.btn-fill')
  for (let i = 0; i < 19; i++) {
    btnFill.click();
  }
  });

})