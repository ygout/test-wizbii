import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserInfo } from 'src/app/core/models';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit, OnDestroy {
  userInfo: UserInfo;
  userInfoSubscription: Subscription;
  constructor(private userStoreService: UserStoreService) {}

  ngOnInit(): void {
    this.userInfoSubscription = this.fetchUserInfo();
  }
  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }

  /**
   * Fetch userInfo from userStoreService
   */
  private fetchUserInfo(): Subscription {
    return this.userStoreService.getUserInfo().subscribe((userInfo: UserInfo) => {
      this.userInfo = userInfo;
    });
  }
}
