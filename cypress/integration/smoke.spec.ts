export {};

describe('Smoke test', () => {
  it('Footer contains footer', () => {
    cy.visit('/');

    cy.get('footer').should('contain', 'Footer');
  });

  it('Happy path register to newsletter', () => {
    cy.visit('/exercises/week-10/exercise-1');

    cy.get(`[data-testid="email-newsletter-input"]`).type(
      'marcin98parda@gmail.com'
    );

    cy.get(`[data-testid="email-newsletter-submit"]`).click();

    cy.get(`[data-testid="email-newsletter-confirmation"]`).should(
      'contain',
      'Dziękujemy za zapisanie się!'
    );
  });
});
