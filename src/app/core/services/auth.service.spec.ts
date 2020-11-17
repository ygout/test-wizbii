import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { skip } from 'rxjs/operators';
import { Account } from '../models';

import { AuthService } from './auth.service';
import { ErrorService } from './error.service';
import { UserStoreService } from './user-store.service';

describe('AuthService', () => {
  describe('#getToken()', () => {
    let httpClient: HttpClient;
    let httpTestingController: HttpTestingController;
    let authService: AuthService;
    const mockAccountValidateResponse: any = {
      'access-token': '4fce1edf2c6e50605b307ebcad5f86f917d2ff2bceccdbbba28b4ecef64ba087',
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
    beforeEach(() => {
      TestBed.configureTestingModule({
        // Import the HttpClient mocking services
        imports: [HttpClientTestingModule],
        // Provide the service-under-test and its dependencies
        providers: [AuthService, ErrorService, UserStoreService],
      });
      // Inject the http, test controller, and service-under-test
      // as they will be referenced by each test.
      httpClient = TestBed.inject(HttpClient);
      httpTestingController = TestBed.inject(HttpTestingController);
      authService = TestBed.inject(AuthService);
    });

    afterEach(() => {
      // After every test, assert that there are no more pending requests.
      httpTestingController.verify();
    });

    it('should store token into localstorage (called once)', () => {
      authService
        .getToken()
        .subscribe(() => {
          expect(authService.getTokenInLocalStorage()).toEqual(expectedAccount.access_token);
        });

      // DashboardService should have made one request to POST feedItems from expected URL
      const req = httpTestingController.expectOne(`${authService.AUTH_URL}/validate`);
      expect(req.request.method).toEqual('POST');

      // Respond with the mock feedItems
      req.flush(mockAccountValidateResponse);
    });
  });
});
