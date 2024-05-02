import { Injectable } from '@angular/core';

const USER_KEY = 'user';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  constructor() {}

  clean(): void {
    window.sessionStorage.clear();
  }

  public saveUser(user: any): void {
    window.sessionStorage.removeItem(USER_KEY);
    localStorage.removeItem(USER_KEY)
    localStorage.setItem('user', JSON.stringify(user));
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): any {
    try {
      const localUser = localStorage.getItem(USER_KEY)?.toString();
      console.log('localUser', localUser);
      const user = window.sessionStorage.getItem(USER_KEY)?.toString();
      console.log('User', user);
      if (user) {
        const parsedUser = this.tryParseJSON(user);
        if (parsedUser) {
          return parsedUser;
        }
      } else if (localUser) {
        const parsedLocalUser = this.tryParseJSON(localUser);
        if (parsedLocalUser) {
          return parsedLocalUser;
        }
      }

      return {};
    } catch (error) {
      console.error('Error fetching user:', error);
      return {}; // Return empty object in case of any errors
    }
  }

  private tryParseJSON(jsonString: string): any {
    try {
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error parsing JSON:', error);
      return null; // Return null if JSON parsing fails
    }
  }

  public isLoggedIn(): boolean {
    const user = window.sessionStorage.getItem(USER_KEY);
    const localUser = localStorage.getItem(USER_KEY)

    if (localUser) {
      return true
    }
    else if (user){
      return true
    }
    return false

  }
}
