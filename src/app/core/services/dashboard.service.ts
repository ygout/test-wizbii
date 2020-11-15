import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { environment } from "src/environments/environment";
import { Comment, Dashboard, FeedItem } from "../models";
import { catchError, map } from "rxjs/operators";
import { ErrorService } from "./error.service";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  private DASHBOARD_URL = `${environment.API_BASE}/v2/dashboard/`;
  private _feedItems = new BehaviorSubject<FeedItem[]>([]);
  feedItems$ = this._feedItems.asObservable();

  constructor(private http: HttpClient, private errorService: ErrorService) {}
  /**
   * Recover feed items from API
   * @param {params: {direction: string}}
   */
  getFeedItems(params?: { direction: string }): Observable<FeedItem[]> {
    this.http
      .post<any>(this.DASHBOARD_URL, {}, { params })
      .pipe(
        map((res) => res as Dashboard),
        map((dashboard: Dashboard) => dashboard.feed_items.feed_items),
        catchError((error) => (this.errorService.handleError(error), []))
      )
      .subscribe((feedItems: FeedItem[]) => {
        this._feedItems.next(feedItems);
      });

    return this.feedItems$;
  }
  /**
   * Add a new comment on a feed Item
   * @param comment
   */
  addCommentOnFeedItem(comment: Comment): void {
    try {
      let feedItems = this._feedItems.getValue().slice();
      let feedItem = feedItems.find(
        (feedItem) => feedItem.id === comment.feedItemId
      );
      const index = feedItems.indexOf(feedItem);
      feedItem.publication.comments = [
        ...feedItem.publication.comments,
        comment,
      ];

      feedItems[index] = feedItem;
      this._feedItems.next(feedItems);
    } catch (error) {
      this.errorService.handleError(error);
    }
  }
/**
 * Send a thanx on a feed Item
 * @param feedItem
 */
  sendThanxOnFeedItem(feedItem: FeedItem) {
    try {
      let feedItems = this._feedItems.getValue().slice();
      const index = feedItems.indexOf(feedItem);

      feedItem.publication.likes = [
        ...feedItem.publication.likes,
        "one more like",
      ];
      feedItems[index] = feedItem;
      this._feedItems.next(feedItems);
    } catch (error) {
      this.errorService.handleError(error);
    }
  }
}
