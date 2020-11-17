import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { Comment, FeedItem } from 'src/app/core/models';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { environment } from 'src/environments/environment';

import { FeedItemComponent } from './feed-item.component';

describe('FeedItemComponent', () => {
  let component: FeedItemComponent;
  let fixture: ComponentFixture<FeedItemComponent>;
  let dashboardServiceStub: Partial<DashboardService>;
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
  beforeEach(async(() => {
    dashboardServiceStub = {
      getFeedItems: () => {
        return mockSubjectBehaviour.asObservable();
      },
      feedItems$: mockSubjectBehaviour.asObservable(),
      DASHBOARD_URL: `${environment.API_BASE}/v2/dashboard/`,
      addCommentOnFeedItem: (comment: Comment) => {
        const feedItems = mockFeedItems.slice();
        feedItems[0].publication.comments.push(comment);
        dashboardServiceStub.feedItems$ = new BehaviorSubject<FeedItem[]>(feedItems);
      },
      sendThanxOnFeedItem: (feedItem: FeedItem) => {
        const feedItems = mockFeedItems.slice();
        feedItem.publication.likes.push('one more like');
        feedItems[0] = feedItem;
        dashboardServiceStub.feedItems$ = new BehaviorSubject<FeedItem[]>(feedItems);
      },
    };
    TestBed.configureTestingModule({
      providers: [{ provide: DashboardService, useValue: dashboardServiceStub }],
      declarations: [FeedItemComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemComponent);
    component = fixture.componentInstance;
    component.feedItem = mockFeedItems;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
