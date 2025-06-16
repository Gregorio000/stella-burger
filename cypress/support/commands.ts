const cypressCommands = (Cypress as unknown) as {
  Commands: typeof Cypress.Commands;
  on: typeof Cypress.on;
};

cypressCommands.Commands.add('loginByApi', () => {
  cy.request('POST', 'https://norma.nomoreparties.space/api/auth/login', {
    email: 'test_user@example.com',
    password: '12345678'
  }).then((res) => {
    const accessToken = res.body.accessToken.split('Bearer ')[1];
    const refreshToken = res.body.refreshToken;

    cy.setCookie('accessToken', accessToken);
    cy.window().then((win) => {
      win.localStorage.setItem('refreshToken', refreshToken);
    });

    cy.intercept('GET', '**/api/auth/user', {
      statusCode: 200,
      body: {
        success: true,
        user: {
          email: 'test_user@example.com',
          name: 'Test User'
        }
      }
    }).as('getUser');
  });
});

cypressCommands.on('window:before:load', (win: Window) => {
  cy.spy(win, 'fetch').as('fetchSpy');
});