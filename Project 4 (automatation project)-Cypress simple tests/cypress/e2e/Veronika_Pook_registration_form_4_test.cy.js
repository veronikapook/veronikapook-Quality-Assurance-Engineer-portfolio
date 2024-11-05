beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})

// Assignement 6: analyze and fix failed test
describe('Input fields', () => {
    it('Username cannot be empty string', () => {
        cy.get('#username').type(' ')

        // in order to activate submit button, user has to click somewhere outside the input field
        cy.get('h2').contains('Password').click()
        cy.get('#input_error_message').should('be.visible')
        cy.get('#success_message').should('not.be.visible')
    })

    it('Username tooltip is visible', () => {
        cy.get('#username').type('{enter}')
        cy.get('h2').contains('Password').click()
        cy.get('#username').should('have.attr', 'title').should('contain', 'Please add username')

        //if not entered, mandatory username field has red border outline
        cy.get('#username').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')
    })

    it('Username should have min and max length values 1 and 50 characters', () => {
        cy.get('#username').should('have.attr', 'min', '1')
        cy.get('#username').should('have.attr', 'max', '50')
    })

    it('Username should support only letters and numbers', () => {
        cy.get('#username').should('have.attr', 'pattern', '[a-zA-Z0-9_]+')
    })


    it('Email input should support correct pattern and validate input', () => {
        cy.get('#email').should('have.attr', 'pattern').should('contain', '[a-z0-9]+@[a-z0-9]')

        //Test with invalid email
        cy.get('#email').type('invalid')
        cy.get('h2').contains('Password').click()

        // check for error state (red border)
        cy.get('#email').should('have.css', 'box-shadow').should('contain', 'rgb(255, 0, 0)')

        // Check submit button state
        cy.get('.submit_button').should('not.be.enabled');
    })


    it('BMW should not be listed in the list of the cars', () => {
        cy.get('#cars').children().should('have.length', 4)
        cy.get('#cars option').first().should('not.have.text', 'BMW')
        cy.get('#cars option').eq(1).should('not.have.text', 'BMW')
        cy.get('#cars option').eq(2).should('not.have.text', 'BMW')
        cy.get('#cars option').last().should('not.have.text', 'BMW')
    })
})