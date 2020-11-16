import { FeedItem, FeedItemProxy } from '../models';

export interface Dashboard {
  feed_items: { feed_items: FeedItem[] };
  display_recipe: { feed_item_proxies: FeedItemProxy[] };
}
