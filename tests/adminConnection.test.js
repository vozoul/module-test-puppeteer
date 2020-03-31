const timeout = 15000;

// test de connection administrateur
describe("Connection", () => {
    let page;

    // cette fonction est lancée avant chaque test de cette
    // série de tests
    beforeAll(async () => {
        // ouvrir un onglet dans le navigateur
        page = await global.__BROWSER__.newPage()
    }, timeout)

    test('admin connection', async () => {
        // charge la page d'accueil
        await page.goto('http://polr.web-74.com');
        await page.waitForSelector('#navbar li a');
        // click sur le lien "About" de la navigation
        await page.evaluate( () => {
            Array
                .from(document.querySelectorAll( '#navbar li a' ))
                .filter( el => el.value() === 'Sign In' )[0].click();
        });
        // attendre que le form soit chargé
        await page.waitForSelector('form');
        // assigne les valeurs a login/password
        await page.$eval('input[name="username"]',(el) => {
            el.value = "admin";
        });
        await page.$eval('input[name="password"]',(el) => {
            el.value = "campus";
        });

        await page.evaluate(() => {
            Array
                .from( document.querySelectorAll('input'))
                .filter( el => el.value === 'Sign In')[0].click();
        });
        await page.waitForSelector('.dropdown-toggle.login-name');
        const html = await page.$eval('.dropdown a', e => e.innerHTML);
        expect(html).toContain("admin ");

    }, timeout);
});