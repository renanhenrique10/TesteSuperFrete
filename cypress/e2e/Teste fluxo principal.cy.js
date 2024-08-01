describe('Validação da tela de cálculo de frete', () => {
  beforeEach(() => {
    // Comando de limpar os cookies
    cy.clearCookies();
    cy.clearLocalStorage();

    // Ajustando definição de tela
    cy.viewport(1366, 768);

    // Visitar a URL e aguardar 10 segundos
    cy.visit('https://web.superfrete.com/');
    cy.wait(10000); // Espera 10 segundos para garantir que todos os serviços e elementos carreguem
  });

  it('Deve calcular o frete corretamente', () => {
    // Preencher o formulário de cálculo
    cy.get('#originPostcode')
      .type('08210745');
    cy.get('#object_format')
      .click();
    cy.get('.Mui-selected')
      .click();
    cy.get('#weight')
      .type('300');
    cy.get('[data-value="0.3"]')
      .click();
    cy.get('#packageHeight')
      .type('2');
    cy.get('#packageWidth') 
      .type('11');
    cy.get('#packageDepth')
      .type('16');
    cy.get('#destinationPostcode')
      .type('05407-002');
    cy.get('[data-cy="calculator-submit"]')
      .click(); // Submete o formulário

    // Validar informações de envio
    cy.contains('Mini envios').should('be.visible');
    cy.contains('PAC').should('be.visible');
    cy.contains('SEDEX').should('be.visible');
  });
});
