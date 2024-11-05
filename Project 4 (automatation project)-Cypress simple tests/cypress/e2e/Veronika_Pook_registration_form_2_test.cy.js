beforeEach(() => {
    cy.visit('cypress/fixtures/registration_form_2.html')
})


/*
Assignement 4: add content to the following tests
*/


//Using Faker to create random valid data for tests
const { faker } = require('@faker-js/faker');
module.exports = {
    lastName: faker.person.lastName(),
    email: faker.internet.email(),
}

//Using function to make code more readable
let password = 'MyOnly1Password'


describe('Section 1: Functional tests', () => {

    it('User can use only same both first and validation passwords', () => {
        cy.get('#username').type('Something')
        cy.get('#email').type(faker.internet.email())
        cy.get('[name="name"]').type('Name')
        cy.get('#lastName').type(faker.person.lastName())
        cy.get('[data-testid="phoneNumberTestId"]').type('56789009')
        cy.get('#password').type(password)
        cy.get('#confirm').type('MyOnly1Password2')
        cy.get('h2').contains('Password').click()
        cy.get('.submit_button').should('be.disabled')
        cy.get('#success_message').should('not.be.visible')
        cy.get('#password_error_message').should('be.visible')

        // Test change, so the passwords would match
        cy.get('#confirm').clear().type(password)
        cy.get('h2').contains('Password').click()
        cy.get('#password_error_message').should('not.be.visible')
        cy.get('.submit_button').should('be.enabled')
    })


    it('User can submit form with all fields added', () => {
        // Test steps for filling in ALL fields
        cy.get('#username').type('Something')
        cy.get('#email').type(faker.internet.email())
        cy.get('[name="name"]').type('Name')
        cy.get('#lastName').type(faker.person.lastName())
        cy.get('[data-testid="phoneNumberTestId"]').type('56789009')
        cy.get('[name="fav_language"]').check('JavaScript')
        cy.get('[type="checkbox"]').check('Car')
        cy.get('[name="cars"]').select('Saab')
        cy.get('[name="animal"]').select('cat')
        cy.get('#password').type(password)
        cy.get('#confirm').type(password)
        cy.get('h2').contains('Password').click()

        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')
    })


    it('User can submit form with valid data and only mandatory fields added', () => {
        // Using function to fill in ONLY mandatory fields; function at the end of the file
        inputValidData('johnDoe')
        cy.get('.submit_button').should('be.enabled')
        cy.get('.submit_button').click()
        cy.get('#success_message').should('be.visible')

    })


    it("User can't submit form if username is not added", () => {
        inputValidData('johnDoe')
        //Clear mandatory field
        cy.get('#username').clear()
        cy.get('body').click(0, 0)
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')

    })
    

    it("User can't submit form if first name is not added", () => {
        inputValidData('johnDoe')
        cy.get('[name="name"]').clear()
        cy.get('body').click(0, 0)
        cy.get('.submit_button').should('not.be.enabled')
        cy.get('#input_error_message').should('be.visible').should('contain', 'Mandatory input field is not valid or empty!')
    })

})

/*
Assignement 5: create more visual tests
*/

describe('Section 2: Visual tests', () => {
    it('Check that logo is correct and has correct size', () => {
        cy.log('Will check logo source and size')
        cy.get('img').should('have.attr', 'src').should('include', 'cerebrum_hub_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })


    it('Check that Cypress logo is correct and has correct size', () => {
        cy.log('Will check Cypress logo source and size')
        cy.get('[data-cy="cypress_logo"]').should('have.attr', 'src').should('include', 'cypress_logo')
        cy.get('img').invoke('height').should('be.lessThan', 178)
            .and('be.greaterThan', 100)
    })


    it('Check navigation for registration_form_1', () => {
        cy.get('nav').children().should('have.length', 2)
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(0).should('be.visible')
            .and('have.attr', 'href', 'registration_form_1.html')
            .click()
        cy.url().should('contain', '/registration_form_1.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check navigation for registration_form_3', () => {
        cy.get('nav').siblings('h1').should('have.text', 'Registration form number 2')
        cy.get('nav').children().eq(1).should('be.visible')
            .and('have.attr', 'href', 'registration_form_3.html')
            .click()
        cy.url().should('contain', '/registration_form_3.html')
        cy.go('back')
        cy.log('Back again in registration form 2')
    })


    it('Check that radio button list is correct', () => {
        cy.get('input[type="radio"]').should('have.length', 4)

        // Verify labels of the radio buttons
        cy.get('input[type="radio"]').next().eq(0).should('have.text', 'HTML')
        cy.get('input[type="radio"]').next().eq(1).should('have.text', 'CSS')
        cy.get('input[type="radio"]').next().eq(2).should('have.text', 'JavaScript')
        cy.get('input[type="radio"]').next().eq(3).should('have.text', 'PHP')

        //Verify default state of radio buttons
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
        cy.get('input[type="radio"]').eq(1).should('not.be.checked')
        cy.get('input[type="radio"]').eq(2).should('not.be.checked')
        cy.get('input[type="radio"]').eq(3).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="radio"]').eq(0).check().should('be.checked')
        cy.get('input[type="radio"]').eq(1).check().should('be.checked')
        cy.get('input[type="radio"]').eq(0).should('not.be.checked')
    })

    // Create test similar to previous one verifying check boxes
    it('Check that checkbox list is correct', () => {
        cy.get('input[type="checkbox"]').should('have.length', 3)

        // Verify labels of the checkbox buttons
        cy.get('input[type="checkbox"]').next().eq(0).should('have.text', 'I have a bike')
        cy.get('input[type="checkbox"]').next().eq(1).should('have.text', 'I have a car')
        cy.get('input[type="checkbox"]').next().eq(2).should('have.text', 'I have a boat')

        //Verify default state of checkbox buttons
        cy.get('input[type="checkbox"]').eq(0).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(1).should('not.be.checked')
        cy.get('input[type="checkbox"]').eq(2).should('not.be.checked')

        // Selecting one will remove selection from the other radio button
        cy.get('input[type="checkbox"]').eq(0).check().should('be.checked')
        cy.get('input[type="checkbox"]').eq(1).check().should('be.checked')
    })

    it('Car dropdown is correct', () => {
        // Select second element and create screenshot for this area or full page
        cy.get('#cars').select(1).screenshot('Cars drop-down')
        cy.screenshot('Full page screenshot')
        cy.get('#cars').children().should('have.length', 4)


        // Check  that first element in the dropdown has text Volvo
        cy.get('#cars').find('option').eq(0).should('have.text', 'Volvo')

        // Advanced level how to check the content of the Cars dropdown
        cy.get('#cars').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['volvo', 'saab', 'opel', 'audi'])
        })
    })


    it('Animals dropdown is correct', () => {
        cy.get('#animal').select(1).screenshot('Animal drop-down')
        cy.screenshot('Full page screenshot')

        cy.get('#animal').children().should('have.length', 6)
        cy.get('#animal').find('option').should('have.length', 6)

        // Check  that first element in the dropdown has text Dog
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')

        // b.Verify all values in the dropdown.
        cy.get('#animal').find('option').eq(0).should('have.text', 'Dog')
        cy.get('#animal').find('option').eq(1).should('have.text', 'Cat')
        cy.get('#animal').find('option').eq(2).should('have.text', 'Snake')
        cy.get('#animal').find('option').eq(3).should('have.text', 'Hippo')
        cy.get('#animal').find('option').eq(4).should('have.text', 'Cow')
        cy.get('#animal').find('option').eq(5).should('have.text', 'Horse')

        // b. Advanced
        cy.get('#animal').find('option').then(options => {
            const actual = [...options].map(option => option.value)
            expect(actual).to.deep.eq(['dog', 'cat', 'snake', 'hippo', 'cow', 'mouse'])
        })
    })
})

function inputValidData(username) {
    cy.log('Username will be filled')
    cy.get('input[data-testid="user"]').type(username)
    cy.get('#email').type(faker.internet.email())
    cy.get('[data-cy="name"]').type('John')
    cy.get('#lastName').type(faker.person.lastName())
    cy.get('[data-testid="phoneNumberTestId"]').type('56789009')
    cy.get('#password').type(password)
    cy.get('#confirm').type(password)
    cy.get('h2').contains('Password').click()
}