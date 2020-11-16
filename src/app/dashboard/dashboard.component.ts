import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Account, FeedItem } from '../core/models';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from '../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit, OnDestroy {
  feedItems: FeedItem[];
  private subscription: Subscription;
  constructor(private authService: AuthService, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.subscription = this.authService
      .getToken()
      .pipe(
        mergeMap(() => {
          return this.dashboardService.getFeedItems();
        })
      )
      .subscribe((feedItems: FeedItem[]) => {
        this.feedItems = feedItems;
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
