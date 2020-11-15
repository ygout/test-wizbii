import { Component, OnInit } from '@angular/core';
import { FeedItem } from '../core/models';
import { DashboardService } from '../core/services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private dashboardService: DashboardService) { }

  ngOnInit(): void {
    this.dashboardService.getFeedItems({direction: "newest"}).subscribe((feedItems: FeedItem[]) => {
      console.log("feedItems", feedItems);
    });
  }

}
