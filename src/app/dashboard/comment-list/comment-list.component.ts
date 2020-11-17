import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Comment, FeedItem, UserInfo } from 'src/app/core/models';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit, OnDestroy {
  @Input() feedItem: FeedItem;
  userInfo: UserInfo;
  commentStr = '';
  userInfoSubscription: Subscription;
  constructor(private userStoreService: UserStoreService, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.userInfoSubscription = this.fetchUserInfo();
  }

  ngOnDestroy(): void {
    this.userInfoSubscription.unsubscribe();
  }

  /**
   * Fetch UserInfo from userStoreService
   */
  private fetchUserInfo(): Subscription {
    return this.userStoreService.getUserInfo().subscribe((userInfo: UserInfo) => {
      this.userInfo = userInfo;
    });
  }
  /**
   * Event for add a comment to a feedItem
   */
  onAddComment() {
    if (this.commentStr) {
      const comment: Comment = {
        author: this.userInfo,
        content: this.commentStr,
        date: new Date().toString(),
        likes: 0,
        feedItemId: this.feedItem.id,
      };
      this.dashboardService.addCommentOnFeedItem(comment);
    }

    this.commentStr = '';
  }
}
