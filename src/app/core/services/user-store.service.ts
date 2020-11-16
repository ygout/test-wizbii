import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>({ firstName: null, lastName: null });

  constructor() { }

  /**
   * Update user info subject
   * @param userInfo: UserInfo
   */
  updateUserInfo(userInfo: UserInfo) {
    this.userInfo.next(userInfo);
  }

  /**
   * Get user info
   * @returns BehaviorSubject<UserInfo>
   */
  getUserInfo(): BehaviorSubject<UserInfo> {
    return this.userInfo;
  }
}
