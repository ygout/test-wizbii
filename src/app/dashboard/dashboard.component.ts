import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
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
  constructor(private authService: AuthService, private dashboardService: DashboardService, private spinner: NgxSpinnerService) {}

  ngOnInit(): void {
    this.spinner.show();
    this.subscription = this.authService
      .getToken()
      .pipe(
        mergeMap(() => {
          return this.dashboardService.getFeedItems({ direction: 'newest' });
        })
      )
      .subscribe((feedItems: FeedItem[]) => {
        this.feedItems = feedItems;
        this.spinner.hide();
      });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
