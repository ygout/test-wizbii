import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FeedItem } from 'src/app/core/models';
import { DashboardService } from 'src/app/core/services/dashboard.service';

import { FeedItemListComponent } from './feed-item-list.component';
import { FeedItemComponent } from './feed-item/feed-item.component';

describe('FeedItemListComponent', () => {
  let component: FeedItemListComponent;
  let feedItemListFixture: ComponentFixture<FeedItemListComponent>;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FeedItemListComponent, FeedItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    feedItemListFixture = TestBed.createComponent(FeedItemListComponent);
    component = feedItemListFixture.componentInstance;
    feedItemListFixture.detectChanges();
  });

  it('should defined FeedItemComponent', async(() => {
    const feedItemComponentDebug = feedItemListFixture.debugElement.query(By.directive(FeedItemComponent));
    expect(feedItemComponentDebug).toBeDefined();
  }));
});
