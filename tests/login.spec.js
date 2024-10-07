const { test, expect } = require('@playwright/test');

async function login(page, username, password) {
    await page.locator(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').fill(username);
    await page.locator(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').fill(password);
    await page.locator('.oxd-button').click();
}

test.describe('login app', () => {

    test.beforeEach(async ({ page }) => {
        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
    });

    test('Tc-01-correct', async ({ page }) => {
        await login(page, 'Admin', 'admin123');
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');
    });

    test('Tc-02-error user', async ({ page }) => {
        await login(page, 'incorrectUsername', 'admin123');
        await expect(page.locator('.oxd-alert')).toHaveText('Invalid credentials');
    });

    test('Tc-03-error password', async ({ page }) => {
        await login(page, 'Admin', 'incorrectPassword');
        await expect(page.locator('.oxd-alert')).toHaveText('Invalid credentials');
    });

});
