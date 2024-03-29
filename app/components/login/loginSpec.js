describe('Test the login component', function() {

    it('a success sign-in', function() {
        browser.get("http://localhost:63342/oonoz_front/app/index.html#/login");
        element(by.model('username')).sendKeys('jalzuritro');
        element(by.model('userPassword')).sendKeys('OmSBtq3Oo');

        element(by.buttonText('Connexion')).click();
        expect(element(by.id('tempText')).getText()).toMatch('Bienvenue sur la page principale');
    });

    it('a fail sign-in', function() {
        browser.get("http://localhost:63342/oonoz_front/app/index.html#/login");
        element(by.model('username')).sendKeys('jalzuritro');
        element(by.model('userPassword')).sendKeys('badpassword');

        element(by.buttonText('Connexion')).click();

        expect(element(by.css('span.errorForm')).isDisplayed()).toBe(true);
    });


    it('click on link subscription and check the page changing', function() {
        browser.get("http://localhost:63342/oonoz_front/app/index.html#/login");
        element(by.linkText("Pas de compte? Je m'inscris")).click();
        expect(element(by.className('titre')).getText()).toMatch("Je m'inscris");
    });

    it('click on link forgotten password and check the page changing', function() {
        browser.get("http://localhost:63342/oonoz_front/app/index.html#/login");
        element(by.linkText("Mot de passe oublié ?")).click();
        expect(element(by.id('generatePwdInstruction')).getText()).toMatch("Je saisis l'adresse email du compte pour lequel je souhaite un nouveau mot de passe");
    });

    it('a signup with existing user', function() {
        browser.get("http://localhost:63342/oonoz_front/app/index.html#/signup");
        element(by.model('username')).sendKeys('pdurant');
        element(by.model('firstName')).sendKeys('paul');
        element(by.model('lastName')).sendKeys('durant');
        element(by.model('mail')).sendKeys('pdurant@gmail.com');
        element(by.model('password')).sendKeys('Password59');
        element(by.model('passwordConfirmation')).sendKeys('Password59');
        element(by.model('birthDate')).sendKeys('25/10/2016');
        element(by.buttonText("S'inscrire")).click();
        expect(element(by.className('modal-body')).getText()).toMatch("Le username/adresse mail n'est pas disponible !");
    });

    


});