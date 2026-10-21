import { Page } from '@playwright/test';

export class LoginPage {
    private page:Page
    emailInput;
    passwordInput;
    loginBtn;

    constructor(page: Page) {
        this.page = page;

        this.emailInput = this.page.locator('input[name="email"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.loginBtn = this.page.locator('button[type="submit"]');
    }
    
    async open() {
        await this.page.goto('/login');
    }

    async login(email: string, password: string) {
        // login implementation
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.loginBtn.click();
    }
}