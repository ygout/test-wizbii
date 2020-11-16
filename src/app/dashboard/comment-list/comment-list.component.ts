import { Component, Input, OnInit } from '@angular/core';
import { Comment, FeedItem, UserInfo } from 'src/app/core/models';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { UserStoreService } from 'src/app/core/services/user-store.service';

@Component({
  selector: 'app-comment-list',
  templateUrl: './comment-list.component.html',
  styleUrls: ['./comment-list.component.scss'],
})
export class CommentListComponent implements OnInit {
  @Input() feedItem: FeedItem;
  userInfo: UserInfo;
  commentStr = '';
  constructor(private userStoreService: UserStoreService, private dashboardService: DashboardService) {}

  ngOnInit(): void {
    this.userStoreService.getUserInfo().subscribe((userInfo: UserInfo) => {
      this.userInfo = userInfo;
    });
  }

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
