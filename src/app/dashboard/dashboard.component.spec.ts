import { HttpClient } from '@angular/common/http';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Account, FeedItem } from '../core/models';
import { AuthService } from '../core/services/auth.service';
import { DashboardService } from '../core/services/dashboard.service';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';

import { DashboardComponent } from './dashboard.component';
import { FeedItemListComponent } from './feed-item-list/feed-item-list.component';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let dashboardFixture: ComponentFixture<DashboardComponent>;
  let dashboardHeaderFixture: ComponentFixture<DashboardHeaderComponent>;
  let feedItemListFixture: ComponentFixture<FeedItemListComponent>;
  let authServiceStub: Partial<AuthService>;
  let authService: AuthService;
  const expectedAccount: Account = {
    access_token: '4fce1edf2c6e50605b307ebcad5f86f917d2ff2bceccdbbba28b4ecef64ba087',
    profile: {
      _id: 'serge-papagali',
      name: 'Serge Papagali',
      slug: 'serge-papagali',
      date_created: '2018-12-06T12:40:44+0000',
      date_modified: '2019-09-19T12:02:33+0000',
      language: 'fr',
      locale: 'fr_FR',
      original_locale: 'fr_FR',
      first_name: 'Serge',
      last_name: 'Papagali',
      sex: 'HOMME',
      mobile: '098765445678',
      status: 'ACTIF',
      date_birthday: '1988-03-05T00:00:00+0000',
    },
    user: {
      _id: 'serge-papagali',
      slug: 'serge-papagali',
      username: 'decouverte+2@wizbii.com',
      emails: ['decouverte+2@wizbii.com'],
      roles: ['ROLE_USER'],
      uniq_user_id: 'c00e1e4b3fb97a510576b0e0db5f99b1',
    },
  };
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
  const mockSubjectBehaviour = new BehaviorSubject<FeedItem[]>(mockFeedItems);
  let dashboardServiceStub: Partial<DashboardService>;
  beforeEach(async(() => {
    authServiceStub = {
      AUTH_URL: `${environment.API_BASE}/v1/account`,
      getToken: () => {
        return new Observable((subscriber) => {
          subscriber.next(expectedAccount);
        });
      },
      getTokenInLocalStorage: () => {
        return expectedAccount.access_token;
      },
    };
    dashboardServiceStub = {
      getFeedItems: () => {
        return mockSubjectBehaviour.asObservable();
      },
      feedItems$: mockSubjectBehaviour.asObservable(),
      DASHBOARD_URL: `${environment.API_BASE}/v2/dashboard/`,
      addCommentOnFeedItem: () => {},
      sendThanxOnFeedItem: () => {},
    };
    TestBed.configureTestingModule({
      providers: [
        { provide: AuthService, useValue: authServiceStub },
        { provide: DashboardService, useValue: dashboardServiceStub },
      ],
      declarations: [DashboardComponent, DashboardHeaderComponent, FeedItemListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    dashboardFixture = TestBed.createComponent(DashboardComponent);
    dashboardHeaderFixture = TestBed.createComponent(DashboardHeaderComponent);
    feedItemListFixture = TestBed.createComponent(FeedItemListComponent);
    component = dashboardFixture.componentInstance;
    authService = TestBed.inject(AuthService);
    dashboardFixture.detectChanges();
  });

  it('should assign feedItems', async(() => {
    component.ngOnInit();
    expect(component.feedItems).toEqual(mockFeedItems);
  }));

  it('should defined DashboardHeaderComponent', async(() => {
    component.ngOnInit();
    const dashboardHeaderDebug = dashboardFixture.debugElement.query(By.directive(DashboardHeaderComponent));
    expect(dashboardHeaderDebug).toBeDefined();
  }));

  it('should defined FeedItemListComponent', async(() => {
    component.ngOnInit();
    const feedItemListDebug = dashboardFixture.debugElement.query(By.directive(FeedItemListComponent));
    expect(feedItemListDebug).toBeDefined();
  }));
});
