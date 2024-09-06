import * as data from "../helpers/data.json"
import * as loc_mainPage from "../locators/main_page.json"
import * as loc_resultPage from "../locators/result_page.json"
import * as loc_recoveryPage from "../locators/recovery_pass_page.json"

describe('Проверка авторизации', function () {

    beforeEach('Предусловие', function () {
        cy.visit('/');
          });

    afterEach('Постусловие', function () {
        cy.get(loc_resultPage.close).should('be.visible');
          });

    it('Верный логин и верный пароль', function () {
         cy.get(loc_mainPage.email).type(data.login_succ);
         cy.get(loc_mainPage.password).type(data.pass_succ);
         cy.get(loc_mainPage.login_button).click();

         cy.get(loc_resultPage.title).contains(data.msg_auth_succ);
    })

    it('Верный логин и неверный пароль', function () {
        cy.get(loc_mainPage.email).type(data.login_succ);
        cy.get(loc_mainPage.password).type(data.pass_fail);
        cy.get(loc_mainPage.login_button).click();

        cy.get(loc_resultPage.title).contains(data.msg_auth_fail);
    })

    it('Неверный логин и верный пароль', function () {
        cy.get(loc_mainPage.email).type(data.login_fail);
        cy.get(loc_mainPage.password).type(data.pass_succ);
        cy.get(loc_mainPage.login_button).click();

        cy.get(loc_resultPage.title).contains(data.msg_auth_fail);
    })

    it('Логин без @, верный пароль', function () {
        cy.get(loc_mainPage.email).type(data.login_invalid);
        cy.get(loc_mainPage.password).type(data.pass_succ);
        cy.get(loc_mainPage.login_button).click();

        cy.get(loc_resultPage.title).contains(data.msg_auth_invalid);
    })

    it('Востановление пароля', function () {
        cy.get(loc_mainPage.fogot_pass_btn).click();
        
        cy.get(loc_recoveryPage.close).should('be.visible')
        cy.get(loc_recoveryPage.title).contains('Восстановите пароль');
        cy.get(loc_recoveryPage.email).type(data.login_succ);
        cy.get(loc_recoveryPage.send_button).click();

        cy.get(loc_resultPage.title).contains(data.msg_recoveryPass_succ);
    })

    it('Приведение к строчным буквам в логине, верный пароль', function () {
        cy.get(loc_mainPage.email).type(data.login_upperCase);
        cy.get(loc_mainPage.password).type(data.pass_succ);
        cy.get(loc_mainPage.login_button).click();

        cy.get(loc_resultPage.title).contains(data.msg_auth_succ);
    })

 })