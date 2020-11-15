import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from '../models';

@Injectable({
  providedIn: 'root'
})
export class UserStoreService {

  private readonly _userInfo: BehaviorSubject<UserInfo> = new BehaviorSubject<UserInfo>({firstName: null, lastName: null});

  constructor() { }

   /**
   * Use to update user info
   * @data type: UserInfo
   */
  updateUserInfo(userInfo: UserInfo) {
    this._userInfo.next(userInfo);
  }
 /**
   * Recover user info
   */
  getUserInfo(): BehaviorSubject<UserInfo> {
    return this._userInfo;
  }
}
