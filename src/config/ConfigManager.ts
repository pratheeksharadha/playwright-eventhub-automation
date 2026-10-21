export class ConfigManager {
    static get baseUrl(): string {
        const baseUrl = process.env.BASE_URL;
        if (!baseUrl) {
            throw new Error('BASE_URL environment variable is not defined. Please set it in the .env file.');
        }       
        return baseUrl;
    }  
    
    static get userMail(): string {
        const userMail = process.env.USER_MAIL;  
        if (!userMail) {
            throw new Error('userMail environment variable is not defined. Please set it in the .env file.');
        }
        
        return userMail;
    }

    static get userPassword(): string {
        const userPassword = process.env.USER_PASSWORD;
        if (!userPassword) {
            throw new Error('userPassword environment variable is not defined. Please set it in the .env file.');
        }
        return userPassword;
    }

}