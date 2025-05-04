describe('Fluxo de Cadastro', () => {
  it('deve concluir todas as etapas do cadastro com sucesso', () => {
    cy.visit('http://localhost:5173/Cadastro') // exemplo se for outra porta

    // Etapa 1: Nome e sobrenome
    cy.get('input[placeholder="Digite seu Nome"]').type('João');
    cy.get('input[placeholder="Digite seu Sobrenome"]').type('Silva');
    cy.contains('Continuar').click();

    // Etapa 2: Senha e confirmação
    cy.get('input[placeholder="Digite sua senha"]').type('senhaSegura123');
    cy.get('input[placeholder="Confirme sua senha"]').type('senhaSegura123');
    cy.contains('Continuar').click();

    // Etapa 3: Selecionar esportes
    cy.contains('Futebol').click();
    cy.contains('Natação').click();
    cy.contains('Continuar').click();

    // Etapa 4: Escolher foto
    cy.contains('Escolher foto'); // Aqui você pode simular upload futuramente
    cy.contains('Continuar').click();

    // Etapa 5: Redes sociais
    cy.get('input[placeholder="Instagram"]').type('@joaosilva');
    cy.get('input[placeholder="X"]').type('@joaox');
    cy.get('input[placeholder="TikTok"]').type('@joaotiktok');
    cy.contains('Continuar').click();

    // Etapa 6: Nome de usuário
    cy.get('input[placeholder="Como gostaria de ser chamado?"]').type('joaoshow');
    cy.contains('Finalizar Cadastro').click();

    // Espera redirecionamento ou resposta do sistema
    cy.url().should('include', '/home'); // ou ajuste para onde redireciona após sucesso
  });
});
