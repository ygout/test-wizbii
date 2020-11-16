import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/core/models';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-dashboard-header',
  templateUrl: './dashboard-header.component.html',
  styleUrls: ['./dashboard-header.component.scss'],
})
export class DashboardHeaderComponent implements OnInit {
  userInfo: UserInfo;
  constructor(private userStoreService: UserStoreService) {}

  ngOnInit(): void {
    this.fetchUserInfo();
  }

  private fetchUserInfo(): void {
    this.userStoreService.getUserInfo().subscribe((userInfo: UserInfo) => {
      this.userInfo = userInfo;
    });
  }
}
