describe('template spec', () => {

  const host = "http://localhost:3000";

  it('Deve carregar a página inicial', () => {
    cy.visit(host)
    cy.get("h1").should("exist");
  });

  it('Deve carregar a página de cadastro de ocorrências', () => {
    cy.visit(`${host}/newocorrencia`);
    cy.get("form").should("exist");
  });

  it('Deve carregar a página de visualização de ocorrências', () => {
    cy.visit(`${host}/ocorrencias`);
    cy.wait(2000);
    cy.get("#ocorrencias").should("exist");
  });

  it('Deve ser capaz de registrar uma ocorrência', () => {

    const ocorrencia = {
      titulo: "Teste Criar",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }

    cy.visit(`${host}/newocorrencia`);
    cy.get("#title").type(ocorrencia.titulo);
    cy.get("#type").select(ocorrencia.tipo);
    cy.get("#date").type(ocorrencia.data);
    cy.get("#time").type(ocorrencia.hora);
    cy.get("#botao-enviar").click();

    cy.visit(`${host}/ocorrencias`);
    cy.url().should("eq", `${host}/ocorrencias`);
    cy.wait(2000);
    cy.get("#ocorrencias").contains(ocorrencia.titulo).should("exist");
  });

  it('Deve ser capaz de excluir uma ocorrência', () => {

    const ocorrencia = {
      titulo: "Teste Excluir",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }

    cy.visit(`${host}/newocorrencia`);
    cy.get("#title").type(ocorrencia.titulo);
    cy.get("#type").select(ocorrencia.tipo);
    cy.get("#date").type(ocorrencia.data);
    cy.get("#time").type(ocorrencia.hora);
    cy.get("#botao-enviar").click();

    cy.visit(`${host}/ocorrencias`);
    cy.url().should("eq", `${host}/ocorrencias`);
    cy.wait(2000);
    cy.get("#ocorrencias").contains(ocorrencia.titulo).parent().find("#botao-excluir").click();
    cy.wait(2000);
    cy.get("#ocorrencias").contains(ocorrencia.titulo).should("not.exist");
  });

  it('Deve ser capaz de editar uma ocorrência', () => {

    const ocorrencia = {
      titulo: "Teste Editar",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }

    cy.visit(`${host}/newocorrencia`);
    cy.get("#title").type(ocorrencia.titulo);
    cy.get("#type").select(ocorrencia.tipo);
    cy.get("#date").type(ocorrencia.data);
    cy.get("#time").type(ocorrencia.hora);
    cy.get("#botao-enviar").click();

    cy.visit(`${host}/ocorrencias`);
    cy.url().should("eq", `${host}/ocorrencias`);
    cy.wait(2000);
    cy.get("#ocorrencias").contains(ocorrencia.titulo).should("exist");

    cy.get("#ocorrencias").contains(ocorrencia.titulo).parent().find("#botao-editar").click();
    cy.get("#title").clear().type("Teste Editado");
    cy.get("#botao-atualizar").click();
    cy.wait(2000);
    cy.get("#ocorrencias").contains("Teste Editado").should("exist");
  });

  it('Deve ser capaz de registrar varias ocorrências', () => {

    const ocorrencias = [{
      titulo: "Teste Criar Varias 1",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }, {
      titulo: "Teste Criar Varias 2",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }, {
      titulo: "Teste Criar Varias 3",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }]

    cy.visit(`${host}/newocorrencia`);

    for (const ocorrencia of ocorrencias) {
      cy.get("#title").clear().type(ocorrencia.titulo);
      cy.get("#type").select(ocorrencia.tipo);
      cy.get("#date").clear().type(ocorrencia.data);
      cy.get("#time").clear().type(ocorrencia.hora);
      cy.get("#botao-enviar").click();
    }


    cy.visit(`${host}/ocorrencias`);
    cy.url().should("eq", `${host}/ocorrencias`);
    cy.wait(2000);
    for (const ocorrencia of ocorrencias) {
      cy.get("#ocorrencias").contains(ocorrencia.titulo).should("exist");
    }
  });

  it('Deve ser capaz de excluir varias ocorrências', () => {

    const ocorrencias = [{
      titulo: "Teste Excluir Varias 1",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }, {
      titulo: "Teste Excluir Varias 2",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }, {
      titulo: "Teste Excluir Varias 3",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }]

    cy.visit(`${host}/newocorrencia`);

    for (const ocorrencia of ocorrencias) {
      cy.get("#title").clear().type(ocorrencia.titulo);
      cy.get("#type").select(ocorrencia.tipo);
      cy.get("#date").clear().type(ocorrencia.data);
      cy.get("#time").clear().type(ocorrencia.hora);
      cy.get("#botao-enviar").click();
    }


    cy.visit(`${host}/ocorrencias`);
    cy.url().should("eq", `${host}/ocorrencias`);
    cy.wait(2500);
    for (const ocorrencia of ocorrencias) {
      cy.get("#ocorrencias").contains(ocorrencia.titulo).parent().find("#botao-excluir").click();
      cy.wait(2500);
      cy.get("#ocorrencias").contains(ocorrencia.titulo).should("not.exist");
    }
  });

  it('Não deve ser capaz de registrar uma ocorrência com campo vazio', () => {

    const ocorrencia = {
      titulo: "Teste Falso",
      tipo: "Outros",
      data: "2023-12-13",
      hora: "20:30"
    }

    cy.visit(`${host}/newocorrencia`);
    cy.get("#title").type(ocorrencia.titulo);
    cy.get("#type").select(ocorrencia.tipo);
    cy.get("#time").type(ocorrencia.hora);
    cy.get("#botao-enviar").click();

    cy.visit(`${host}/ocorrencias`);
    cy.url().should("eq", `${host}/ocorrencias`);
    cy.wait(2000);
    cy.get("#ocorrencias").contains(ocorrencia.titulo).should("not.exist");
  });

})