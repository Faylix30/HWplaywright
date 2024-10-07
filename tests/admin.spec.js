const { test, expect } = require('@playwright/test');
const DataUsers = require("../fixtures/username.json");

async function login(page, username, password) {
    await page.locator(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').fill(username);
    await page.locator(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-input').fill(password);
    await page.locator('.oxd-button').click();
}

test.describe('Admin Page', () => {

    test('navigate to Admin page', async ({ page }) => {

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await login(page, 'Admin', 'admin123');
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

        // ไปที่หน้า Admin
        await page.locator(':nth-child(1) > .oxd-main-menu-item').click();
        await expect(page).toHaveURL(/admin\/viewSystemUsers/);
        await expect(page.locator('text=System Users')).toBeVisible();
    });

    test('navigate to Admin page + search employee', async ({ page }) => {

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await login(page, 'Admin', 'admin123');
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

        // ไปที่หน้า Admin
        await page.locator(':nth-child(1) > .oxd-main-menu-item').click();
        await expect(page).toHaveURL(/admin\/viewSystemUsers/);
        await expect(page.locator('text=System Users')).toBeVisible();

        // ค้นหา Username
        await page.locator(':nth-child(2) > .oxd-input').fill(DataUsers.username.id1);
        await page.locator(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        await page.getByRole('option', { name: 'ESS' }).click();
        await page.locator(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        await page.getByRole('option', { name: 'Enabled' }).click();
        await page.locator('.oxd-form-actions > .oxd-button--secondary').click();
    });

    test('navigate to Admin page + Add user', async ({ page }) => {

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await login(page, 'Admin', 'admin123');
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

        // ไปที่หน้า Admin
        await page.locator(':nth-child(1) > .oxd-main-menu-item').click();
        await expect(page).toHaveURL(/admin\/viewSystemUsers/);
        await expect(page.locator('text=System Users')).toBeVisible();

        // Add User
        await page.locator('.orangehrm-header-container > .oxd-button').click();
        await page.locator(':nth-child(1) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        await page.getByRole('option', { name: 'Admin' }).click();
        await page.locator(':nth-child(3) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        await page.getByRole('option', { name: 'Enabled' }).click();
        await page.locator('.oxd-autocomplete-text-input > input').fill('please');
        await page.locator("text=Please don't delete").click();
        await page.locator(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-input').fill('Piyawat');
        await page.locator('.user-password-cell > .oxd-input-group > :nth-child(2) > .oxd-input').fill('User123');
        await page.locator(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-input').fill('User123');
        await page.locator('button:has-text("Save")').click();
        await expect(page.locator('text=Successfully Saved')).toBeVisible();
    });

    test('navigate to Admin page + Delete Username', async ({ page }) => {

        await page.goto('https://opensource-demo.orangehrmlive.com/web/index.php/auth/login');
        await login(page, 'Admin', 'admin123');
        await expect(page).toHaveURL('https://opensource-demo.orangehrmlive.com/web/index.php/dashboard/index');

        // ไปที่หน้า Admin
        await page.locator(':nth-child(1) > .oxd-main-menu-item').click();
        await expect(page).toHaveURL(/admin\/viewSystemUsers/);
        await expect(page.locator('text=System Users')).toBeVisible();

        // ค้นหา Username
        await page.locator(':nth-child(2) > .oxd-input').fill('Piyawat');
        await page.locator(':nth-child(2) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        await page.getByRole('option', { name: 'Admin' }).click();
        await page.locator(':nth-child(4) > .oxd-input-group > :nth-child(2) > .oxd-select-wrapper > .oxd-select-text').click();
        await page.getByRole('option', { name: 'Enabled' }).click();
        await page.locator('.oxd-form-actions > .oxd-button--secondary').click();

        // Delete
        await page.waitForSelector('.bi-trash');  // รอจนกว่าไอคอนถังขยะจะขึ้น
        await page.locator('.bi-trash').click();
        await page.locator('.oxd-button--label-danger').click();
        await expect(page.locator('text=Successfully Deleted')).toBeVisible();
    });
});
