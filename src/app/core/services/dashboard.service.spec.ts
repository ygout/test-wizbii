import { async, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { DashboardService } from './dashboard.service';
import { Comment, Dashboard, FeedItem } from '../models';
import { ErrorService } from './error.service';
import { HttpClient } from '@angular/common/http';
import { skip } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
const mockFeedItems: FeedItem[] = [
  {
    id: '1',
    type: 'publication',
    reasons: [
      {
        type: 'popular',
        reason_steps: [],
      },
    ],
    date: '2020-11-16T14:10:37+0000',
    date_cached: '2020-11-16T14:27:18+0000',
    publication: {
      _id: 'o9v03o1rzqs8so0gskookcc4gcg8koc',
      type: 'share',
      visibility: 'public',
      status: 'visible',
      date_created: '2020-11-16T14:10:37+0000',
      date_modified: '',
      language: 'fr',
      locale: 'fr_FR',
      poster_type: 'COMPANY',
      poster_slug: 'keller-williams-victoria',
      poster: {
        slug: 'keller-williams-victoria',
        type: 'COMPANY',
        displayName: 'Keller Williams Victoria',
      },
      company: {
        _id: 'keller-williams-victoria',
        slug: 'keller-williams-victoria',
        date_created: '2020-11-09T14:23:18+0000',
        date_modified: '2020-11-16T12:50:31+0000',
        status: 'PRIVE',
        state: 'visible',
        name: 'Keller Williams Victoria',
        tag_line: 'Intégrité Famille Business',
        is_client: false,
        employees_number: '0',
        is_autocomplete: true,
        industry: 'immobilier',
        location: {
          points: {
            center: {
              lat: 0,
              lon: 0,
            },
          },
          geo: {
            lat: 0,
            lon: 0,
          },
          extra: {},
        },
        language: 'fr',
        locale: 'fr_FR',
        links: [],
        home_tab: {
          id: 'home',
          slug: 'wizbii-company-messages-message-tab-home',
          title: 'wizbii.company.messages.message.tab.home',
          description: 'Keller Williams un réseau pour les agents',
        },
        recruitment_tab: {
          id: 'recruitment',
          slug: 'wizbii-company-messages-message-tab-recruitment',
          title: 'wizbii.company.messages.message.tab.recruitment',
          nb_jobs: 0,
        },
        tabs: [],
        recruiters: [],
        aliases: [],
        subsidiaries: [],
        should_redirect: false,
        website: 'https://www.kwvictoria.fr/',
        followers: [],
        followed: false,
        options: [],
        partners_validator_emails: [],
      },
      content: 'Plan d’accès, visite virtuelle de nos locaux, présentation de l’équipe : www.kwvictoria.fr',
      tags: [
        {
          _id: 'agent-commercial',
          slug: 'agent-commercial',
          name: 'agent commercial',
          type: 'TAG',
          date_created: '2020-11-16T14:10:37+0000',
          date_modified: '2020-11-16T14:10:37+0000',
        },
        {
          _id: 'agent-immobilier',
          slug: 'agent-immobilier',
          name: 'agent immobilier',
          type: 'TAG',
          date_created: '2020-11-16T14:10:37+0000',
          date_modified: '2020-11-16T14:10:37+0000',
        },
        {
          _id: 'conseiller-vente',
          slug: 'conseiller-vente',
          name: 'conseiller vente',
          type: 'TAG',
          date_created: '2020-11-16T14:10:37+0000',
          date_modified: '2020-11-16T14:10:37+0000',
        },
        {
          _id: 'bts-immobilier',
          slug: 'bts-immobilier',
          name: 'BTS immobilier',
          type: 'TAG',
          date_created: '2020-11-16T14:10:37+0000',
          date_modified: '2020-11-16T14:10:37+0000',
        },
        {
          _id: 'vendeur-conseil',
          slug: 'vendeur-conseil',
          name: 'vendeur conseil',
          type: 'TAG',
          date_created: '2020-11-16T14:10:37+0000',
          date_modified: '2020-11-16T14:10:37+0000',
        },
        {
          _id: 'vendeur',
          slug: 'vendeur',
          name: 'vendeur',
          type: 'TAG',
          date_created: '2020-11-16T14:10:37+0000',
          date_modified: '2020-11-16T14:10:37+0000',
        },
      ],
      attachment_title: 'KW VICTORIA | Immobilier & Recrutement | Hyères',
      attachment_content:
        "Le Market Center KW VICTORIA à Hyères recrute et forme des commerciaux en immobilier et accompagne les projets de vente et d'acquisition des clients.",
      comments: [],
      likes: [],
      reports: [],
      delta: 1001918,
      shares: [],
      mentions: [],
      data_bag: [],
    },
  },
];

describe('DashboardService', () => {
  /// DashboardService method tests begin ///
  describe('#getFeedItems()', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let dashboardService: DashboardService;

    let expectedFeedItems: FeedItem[] = mockFeedItems as FeedItem[];
    const expectedDashboard: Dashboard = {
      feed_items: {
        feed_items: mockFeedItems,
      },
      display_recipe: {},
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        // Import the HttpClient mocking services
        imports: [HttpClientTestingModule],
        // Provide the service-under-test and its dependencies
        providers: [DashboardService, ErrorService],
      });
      // Inject the http, test controller, and service-under-test
      // as they will be referenced by each test.
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      dashboardService = TestBed.inject(DashboardService);
      expectedFeedItems = mockFeedItems;
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should return expected feedItems (called once)', () => {
      dashboardService
        .getFeedItems({ direction: 'newest' })
        .pipe(skip(1))
        .subscribe(
          (feedItems) => expect(feedItems).toEqual(expectedFeedItems, 'should return expected feedItems'),
          fail
        );

      // DashboardService should have made one request to POST feedItems from expected URL
      const req = httpTestingController.expectOne(`${dashboardService.DASHBOARD_URL}?direction=newest`);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock feedItems
      req.flush(expectedDashboard);
    });

    it('should return an empty array feedItems (called once)', () => {
      dashboardService
        .getFeedItems({ direction: 'newest' })
        .pipe(skip(1))
        .subscribe((feedItems) => {
          expect(feedItems).toBeDefined();
          expect(feedItems.length).toBe(0);
        });

      const req = httpTestingController.expectOne(`${dashboardService.DASHBOARD_URL}?direction=newest`);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock feedItems
      req.flush({ test: 'test' });
    });
  });

  describe('#addCommentOnFeedItem()', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let dashboardService: DashboardService;
    const expectedDashboard: Dashboard = {
      feed_items: {
        feed_items: mockFeedItems,
      },
      display_recipe: {},
    };
    const comment: Comment = {
      content: 'Salut je suis un test',
      feedItemId: '1',
      date: new Date().toString(),
      likes: 0,
      author: {
        firstName: 'Test firstname',
        lastName: 'Test lastname',
      },
    };
    beforeEach(() => {
      TestBed.configureTestingModule({
        // Import the HttpClient mocking services
        imports: [HttpClientTestingModule],
        // Provide the service-under-test and its dependencies
        providers: [DashboardService, ErrorService],
      });
      // Inject the http, test controller, and service-under-test
      // as they will be referenced by each test.
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      dashboardService = TestBed.inject(DashboardService);

      dashboardService.getFeedItems().subscribe();
      const req = httpTestingController.expectOne(`${dashboardService.DASHBOARD_URL}`);
      // Respond with the mock feedItems
      req.flush(expectedDashboard);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should add comment into a feedItem without comment', () => {

      dashboardService.addCommentOnFeedItem(comment);
      dashboardService.feedItems$.subscribe((feedItems: FeedItem[]) => {
        expect(feedItems[0].publication.comments[0]).toEqual(comment, 'should return expected comment');
      });
    });
    it('should add 2 comments into a feedItem', () => {

      dashboardService.addCommentOnFeedItem(comment);
      dashboardService.addCommentOnFeedItem(comment);
      dashboardService.feedItems$.subscribe((feedItems: FeedItem[]) => {
        expect(feedItems[0].publication.comments.length).toBe(2);
      });
    });
  });

  describe('#sendThanxOnFeedItem()', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let dashboardService: DashboardService;
    const expectedDashboard: Dashboard = {
      feed_items: {
        feed_items: mockFeedItems,
      },
      display_recipe: {},
    };

    beforeEach(() => {
      TestBed.configureTestingModule({
        // Import the HttpClient mocking services
        imports: [HttpClientTestingModule],
        // Provide the service-under-test and its dependencies
        providers: [DashboardService, ErrorService],
      });
      // Inject the http, test controller, and service-under-test
      // as they will be referenced by each test.
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      dashboardService = TestBed.inject(DashboardService);

      dashboardService.getFeedItems().subscribe();
      const req = httpTestingController.expectOne(`${dashboardService.DASHBOARD_URL}`);
      // Respond with the mock feedItems
      req.flush(expectedDashboard);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should send one thanx into a feedItem', () => {
      const mockFeedItem: FeedItem = mockFeedItems[0];
      dashboardService.sendThanxOnFeedItem(mockFeedItem);
      dashboardService.feedItems$.subscribe((feedItems: FeedItem[]) => {
        expect(feedItems[0].publication.likes.length).toBe(1, 'Should return one more like');
      });
    });
  });
});
