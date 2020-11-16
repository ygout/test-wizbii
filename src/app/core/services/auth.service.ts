import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { Account } from '../models';

import { ErrorService } from './error.service';
import { UserStoreService } from './user-store.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private TOKEN_KEY = 'token';
  private readonly AUTH_URL = `${environment.API_BASE}/v1/account`;
  constructor(
    private http: HttpClient,
    private errorService: ErrorService,
    private userStoreService: UserStoreService
  ) { }

  /**
   * Get the userInfo + token and set token into local storage
   * @returns Observable<Account>
   */
  getToken(): Observable<Account> {
    const formData: FormData = new FormData();
    formData.append('username', environment.credentials.username);
    formData.append('password', environment.credentials.password);
    formData.append('grant_type', environment.credentials.grant_type);
    formData.append('client_id', environment.credentials.client_id);

    return this.http.post<any>(`${this.AUTH_URL}/validate`, formData).pipe(
      map((res) => res as Account),
      map((account) => {
        account.access_token = account['access-token'];
        this.setTokenInLocalStorage(account.access_token);
        this.userStoreService.updateUserInfo({
          firstName: account.profile.first_name,
          lastName: account.profile.last_name,
        });
      }),
      catchError((error) => (this.errorService.handleError(error), []))
    );
  }
  /**
   * Set token into local storage
   * @param token: string
   */
  private setTokenInLocalStorage(token: string): void {
    localStorage.setItem('token', token);
  }
  /**
   * Get token from localstorage
   */
  getTokenInLocalStorage(): string {
    return localStorage.getItem(this.TOKEN_KEY);
  }
}
