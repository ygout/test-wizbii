import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { BehaviorSubject } from 'rxjs';
import { Comment, FeedItem } from 'src/app/core/models';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { environment } from 'src/environments/environment';
import { TransformToUntilDatePipe } from '../../pipes/transform-to-until-date.pipe';

import { FeedItemComponent } from './feed-item.component';

describe('FeedItemComponent', () => {
  let component: FeedItemComponent;
  let fixture: ComponentFixture<FeedItemComponent>;
  let dashboardServiceStub: Partial<DashboardService>;
  const mockSharedJob: any = {
    _id: 'agent-immobilier-keller-williams-3',
    slug: 'agent-immobilier-keller-williams-3',
    creator_slug: 'marie-rigeot-2',
    state: 'visible',
    company_slug: 'keller-williams-victoria',
    start_date: '2020-11-16T16:42:45+0000',
    duration: 'SEVENANDTWELVEMONTHS',
    contract: {
      id: 'freelance',
      slug: 'freelance',
      title: 'Freelance',
      title_short: '',
      order: 9,
      date_created: '2017-08-10T16:12:14+0000',
      date_modified: '2017-08-10T16:12:14+0000',
      language: 'fr',
      locale: 'fr_FR',
      duration: true,
    },
    location: {
      type: 'city',
      city_place_id: 'f31b5c32644be5e430fb21e9074b46f7',
      display_value: 'Hyères',
      city: 'Hyères',
      zip_code: '83400',
      department: 'Var',
      department_short: '83',
      state: 'Provence-Alpes-Côte d\'Azur',
      state_short: 'Provence-Alpes-Côte d\'Azur',
      country: 'France',
      country_short: 'FR',
      points: {
        center: {
          lat: 0,
          lon: 0,
        },
      },
      geo: {
        lat: 43.118893,
        lon: 6.1286211,
      },
      extra: {},
    },
    date_created: '2020-11-16T12:55:20+0000',
    date_modified: '2020-11-16T12:55:20+0000',
    language: 'fr',
    locale: 'fr_FR',
    title: 'Agent immobilier Keller Williams',
    mission:
      `Il y a ceux qui qui parlent de changer de vie et il y ceux qui osent le faire.<br />\nVous voulez vous lancer dans l’immobilier, choisissez un porte avion et soyez les pilotes de votre envol.<br />\nDEBUTANT en immobilier, ou EXPERT, nous vous offrons :<br />\n<br />\n-Un programme de formation , de coaching  et d’accompagnement personnalisé pour lancer votre carrière dans l’immobilier selon que vous soyez débutant ou expert.<br />\n<br />\nVotre intégration au sein du groupe est essentielle pour notre réussite commune: <br />\nVos Missions :<br />\nDévelopper votre notoriété et celle de l’entreprise<br />\nVous constituer un portefeuille de biens à la vente et d’acquéreurs qualifiés.<br />\nAccompagner vos clients dans la réalisation de leurs projets.<br />\nIntervenir à toutes les étapes de la commercialisation et de la négociation.<br />\n<br />\nVous bénéficierez d’une équipe d’experts dédiés à votre réussite:<br />\n- D’une formation de cinq semaines continue de haut niveau (Keller Williams 1ère société<br />\nmondiale de Formation 2019 toutes industries confondues ; source: Training<br />\nMagazine ) <br />\n- Des services d’un Productivity Coach qui assurera le coaching et les ateliers  « renforcement » de pratique terrain. <br />\n- Pour les plus expérimentés, un Team Leader qui vous aidera à bâtir votre stratégie d’entreprise :  Ambitions,Valeurs, Vision, vos forces et vos points à travailler pour vous accompagner vers un projet de vie qui vous ressemble et pourquoi pas une Méga team !<br />\n- De l’accompagnement d’une responsable administrative et juridique qui<br />\ns’occupera de la rédaction et du suivi des dossiers de vente<br />\n- De l\'accompagnement d\'une responsable marketing et réseaux sociaux<br />\n<br />\nVenir au jardin des Hespérides:<br />\n- Dans un environnement de travail idéal :  400 m2 d’espaces aménagés comme à la maison.<br />\n- D’une rémunération allant jusqu’à 100% des honoraires<br />\n- De revenus complémentaires pour tous conseillers recrutés grâce à vous en<br />\nFrance et dans le monde entier<br />\n« Qui ose gagne », à votre très prochaine visite chez Keller Williams Victoria: marie.rigeot@kwfrance.com  Tél : 06.18.99.72.34<br />\n`,
    profile: 'Profil débutant ou expert',
    source: 'wizbii',
    source_type: 'human',
    online: true,
    domaine: 'IMMOBILIER',
    new_domain: {
      _id: 'ventes',
      source: 'legacy',
    },
    skills: [
      {
        _id: 'relationnel',
        slug: 'relationnel',
        name: 'Relationnel',
        type: 'TAG',
        date_created: '2020-11-16T12:55:20+0000',
        date_modified: '2020-11-16T12:55:20+0000',
      },
      {
        _id: 'commercial',
        slug: 'commercial',
        name: 'commercial',
        type: 'TAG',
        date_created: '2020-11-16T12:55:20+0000',
        date_modified: '2020-11-16T12:55:20+0000',
      },
      {
        _id: 'agent-commercial',
        slug: 'agent-commercial',
        name: 'agent commercial',
        type: 'TAG',
        date_created: '2020-11-16T12:55:20+0000',
        date_modified: '2020-11-16T12:55:20+0000',
      },
      {
        _id: 'conseiller-de-vente',
        slug: 'conseiller-de-vente',
        name: 'conseiller de vente',
        type: 'TAG',
        date_created: '2020-11-16T12:55:20+0000',
        date_modified: '2020-11-16T12:55:20+0000',
      },
      {
        _id: 'vendeur-voiture',
        slug: 'vendeur-voiture',
        name: 'vendeur voiture',
        type: 'TAG',
        date_created: '2020-11-16T12:55:20+0000',
        date_modified: '2020-11-16T12:55:20+0000',
      },
      {
        _id: 'restaurateur',
        slug: 'restaurateur',
        name: 'restaurateur',
        type: 'TAG',
        date_created: '2020-11-16T12:55:20+0000',
        date_modified: '2020-11-16T12:55:20+0000',
      },
    ],
    languages: [],
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
    is_index: true,
    project: false,
    duplicates: [],
    description_company: '<p>Keller Williams un r&eacute;seau d\'agents pour les agents.</p>',
    right_now: true,
    unique_key: 'agent-immobilier-keller-williams-keller-williams-victoria',
    shares: [],
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
          'Le Market Center KW VICTORIA à Hyères recrute et forme des commerciaux en immobilier et accompagne les projets de vente et d\'acquisition des clients.',
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
      declarations: [FeedItemComponent, TransformToUntilDatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should render publication card after detectChanges()', () => {
    component.feedItem = mockFeedItems[0];
    component.feedItem.type = 'publication';
    fixture.detectChanges();
    const sectionPublicationCard = fixture.nativeElement.querySelector('.card');
    expect(sectionPublicationCard).toBeTruthy();
    expect(sectionPublicationCard).not.toEqual(null);
  });

  it('should not render publication card after detectChanges()', () => {
    component.feedItem = mockFeedItems[0];
    component.feedItem.type = 'test';
    fixture.detectChanges();
    const sectionPublicationCard = fixture.nativeElement.querySelector('.card');
    expect(sectionPublicationCard).toEqual(null);
  });

  it('should display publication poster information after detectChanges()', () => {
    component.feedItem = mockFeedItems[0];
    component.feedItem.type = 'publication';
    fixture.detectChanges();
    const posterDisplayName = fixture.nativeElement.querySelector('.poster-content-row').querySelector('.display-name');
    const posertContentList = fixture.debugElement.queryAll(By.css('.poster-content-row'));
    const posterSlug = posertContentList[1].nativeElement.querySelector('span');
    expect(posterDisplayName.textContent).toContain(`${component.feedItem.publication.poster.displayName}`);
    expect(posterSlug.textContent).toContain(`${component.feedItem.publication.poster.slug}`);
  });

  it('should display publication tags information after detectChanges()', () => {
    component.feedItem = mockFeedItems[0];
    component.feedItem.type = 'publication';
    fixture.detectChanges();
    const tagsList = fixture.debugElement.queryAll(By.css('.tag'));
    tagsList.map((item, indice) => {
      expect(item.nativeElement.textContent.replace('#', '')).toEqual(
        `${component.feedItem.publication.tags[indice].name}`
      );
    });
    expect(tagsList.length).toEqual(component.feedItem.publication.tags.length);
  });

  it('should display publication attachment information after detectChanges()', () => {
    component.feedItem = mockFeedItems[0];
    component.feedItem.type = 'publication';
    component.feedItem.publication.shared_job = null;
    component.feedItem.publication.attachment_content = 'attachement content test';
    component.feedItem.publication.content = 'publication content test';
    fixture.detectChanges();

    const cardRowContentList = fixture.debugElement.queryAll(By.css('.card-row .content'));
    const cardRowAttachmentContent = cardRowContentList[0];
    expect(cardRowAttachmentContent.nativeElement.textContent).toEqual(
      component.feedItem.publication.attachment_content
    );
    const cardRowPublicationContent = cardRowContentList[1];
    expect(cardRowPublicationContent.nativeElement.textContent).toEqual(component.feedItem.publication.content);
  });

  it('should display publication attachment picture after detectChanges()', () => {
    component.feedItem = mockFeedItems[0];
    component.feedItem.type = 'publication';
    component.feedItem.publication.attachment_picture = 'assets/img/blabla.PNG';
    fixture.detectChanges();

    const imgSrc = fixture.debugElement.query(By.css('.attachment')).nativeElement.querySelector('img').src;
    expect(imgSrc).toContain(component.feedItem.publication.attachment_picture);
  });

  it('should display shared job information after detectChanges()', () => {
    component.feedItem = mockFeedItems[0];
    component.feedItem.type = 'publication';
    component.feedItem.publication.shared_job = mockSharedJob;
    fixture.detectChanges();

    const cardContractTitle = fixture.debugElement.query(By.css('.shared-job-title'));
    expect(cardContractTitle.nativeElement.textContent.trim()).toEqual(
      component.feedItem.publication.shared_job.contract.title.trim()
    );

    const cardLocation = fixture.debugElement.query(By.css('.shared-job-location'));
    expect(cardLocation.nativeElement.textContent).toContain(
      `${component.feedItem.publication.shared_job.location.country}`
    );
    expect(cardLocation.nativeElement.textContent).toContain(
      `${component.feedItem.publication.shared_job.location.department}`
    );
    expect(cardLocation.nativeElement.textContent).toContain(
      `${component.feedItem.publication.shared_job.location.display_value}`
    );
  });
  it('Should sendThanx() called when clicked on Envoyer un Thanx ! ', async(() => {
    spyOn(component, 'onSendThanx');
    component.feedItem = mockFeedItems[0];
    component.feedItem.type = 'publication';
    fixture.detectChanges();
    const link = fixture.debugElement.nativeElement.querySelector('.send-thanx');
    link.click();
    fixture.whenStable().then(() => {
      expect(component.onSendThanx).toHaveBeenCalled();
    });
  }));
});
