import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dashboard, FeedItem } from '../models';
import { catchError, map } from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  private DASHBOARD_URL = `${environment.API_BASE}/v2/dashboard/`;
  constructor(private http: HttpClient) {}
/**
 * Recover feed items from API
 * @param {params: {direction: string}}
 */
  getFeedItems(params?: {direction: string}): Observable<FeedItem[]> {
    return this.http.post<any>(this.DASHBOARD_URL, {}, {params}).pipe(
      map(res => res as Dashboard),
      map((dashboard: Dashboard) => dashboard.feed_items.feed_items)
    );
  }
}
