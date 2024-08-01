describe('Validação de mensagens de erro', () => {
    beforeEach(() => {
        cy.clearCookies();
        cy.clearLocalStorage();

        cy.viewport(1366, 768);

        cy.visit('https://web.superfrete.com/');
        cy.get('body', { timeout: 120000 }).should('be.visible'); 
    });

    it('Não deve calcular o frete sem CEP de origem - CEP EM BRANCO', () => {
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
            .click();
        cy.contains('CEP de origem é obrigatório')
            .should('be.visible');
    });

    it('Não deve calcular o frete sem CEP de origem - CEP INCORRETO', () => {
        cy.get('#originPostcode')
            .type('0');
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
            .click();
        cy.contains('CEP de origem não é válido.')
            .should('be.visible');
    });

    it('Não deve calcular o frete sem CEP de destino - CEP EM BRANCO', () => {
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
        cy.get('[data-cy="calculator-submit"]')
            .click();
        cy.contains('CEP de destino é obrigatório')
            .should('be.visible');
    });

    it('Não deve calcular o frete sem CEP de destino - INCORRETO', () => {
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
            .click();
        cy.contains('CEP de origem não é válido')
            .should('be.visible');
    });

    it('Não deve calcular o frete com dimensões inválidas', () => {
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
            .type('0.3');
        cy.get('#packageWidth')
            .type('7');
        cy.get('#packageDepth')
            .type('12');
        cy.get('#destinationPostcode')
            .type('05407-002');
        cy.get('[data-cy="calculator-submit"]')
            .click();
        cy.contains('Altura mínima 0.4 cm.')
            .should('be.visible');
        cy.contains('Largura mínima 8 cm.')
            .should('be.visible');
        cy.contains('Comprimento mínimo 13 cm.')
            .should('be.visible');
    });
});
