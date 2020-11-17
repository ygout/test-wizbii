import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Comment, Dashboard, FeedItem } from '../models';
import { catchError, map } from 'rxjs/operators';
import { ErrorService } from './error.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  public readonly DASHBOARD_URL = `${environment.API_BASE}/v2/dashboard/`;
  private feedItems = new BehaviorSubject<FeedItem[]>([]);
  feedItems$ = this.feedItems.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService) {}
  /**
   * Recover feed items from API
   * @param params: {direction: "newest"}
   */
  getFeedItems(params?: { direction: string }): Observable<FeedItem[]> {
    this.http
      .post<any>(`${this.DASHBOARD_URL}`, {}, { params })
      .pipe(
        map((res) => res as Dashboard),
        map((dashboard: Dashboard) => dashboard.feed_items.feed_items),
        catchError((error) => (this.errorService.handleError(error), []))
      )
      .subscribe((feedItems: FeedItem[]) => {
        this.feedItems.next(feedItems);
      });

    return this.feedItems$;
  }
  /**
   * Add a new comment on a feed Item
   * @param comment: Comment
   */
  addCommentOnFeedItem(comment: Comment): void {
    try {
      const feedItems = this.feedItems.getValue().slice();
      const feedItem = feedItems.find(
        (item: FeedItem) => item.id === comment.feedItemId
      );
      const index = feedItems.indexOf(feedItem);
      feedItem.publication.comments = [
        ...feedItem.publication.comments,
        comment,
      ];

      feedItems[index] = feedItem;
      this.feedItems.next(feedItems);
    } catch (error) {
      this.errorService.handleError(error);
    }
  }
/**
 * Send a thanx on a feed Item
 * @param feedItem: FeedItem
 */
  sendThanxOnFeedItem(feedItem: FeedItem) {
    try {
      const feedItems = this.feedItems.getValue().slice();
      const index = feedItems.indexOf(feedItem);

      feedItem.publication.likes = [
        ...feedItem.publication.likes,
        'one more like',
      ];
      feedItems[index] = feedItem;
      this.feedItems.next(feedItems);
    } catch (error) {
      this.errorService.handleError(error);
    }
  }
}
