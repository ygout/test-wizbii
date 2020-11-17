import { Component, Input, OnInit } from '@angular/core';
import { FeedItem } from 'src/app/core/models';
import { DashboardService } from 'src/app/core/services/dashboard.service';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss'],
})
export class FeedItemComponent implements OnInit {
  @Input() feedItem: FeedItem;
  isAlreadyThanx = false;
  constructor(private dashboardService: DashboardService) {}

  ngOnInit(): void {
  }
  /**
   * Send a thanx
   */
  onSendThanx(): void {
    if (!this.isAlreadyThanx) {
      this.dashboardService.sendThanxOnFeedItem(this.feedItem);
      this.isAlreadyThanx = true;
    }
  }
  onShare() {
    console.log('Sahre with your friends ! ');
  }
}
