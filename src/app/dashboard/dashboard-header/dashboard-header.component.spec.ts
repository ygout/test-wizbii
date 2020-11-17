import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject } from 'rxjs';
import { UserInfo } from 'src/app/core/models';
import { UserStoreService } from 'src/app/core/services/user-store.service';

import { DashboardHeaderComponent } from './dashboard-header.component';

describe('DashboardHeaderComponent', () => {
  let component: DashboardHeaderComponent;
  let fixture: ComponentFixture<DashboardHeaderComponent>;
  let userStoreServiceStub: Partial<UserStoreService>;
  const mockUserInfo: UserInfo = { firstName: 'testFirstname', lastName: 'testLastName' };
  beforeEach(async(() => {
    userStoreServiceStub = {
      updateUserInfo: () => {},
      getUserInfo: () => {
        return new BehaviorSubject<UserInfo>(mockUserInfo);
      },
    };
    TestBed.configureTestingModule({
      declarations: [DashboardHeaderComponent],
      providers: [{ provide: UserStoreService, useValue: userStoreServiceStub }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should assign userInfo ngOnInit', () => {
    component.ngOnInit();
    expect(component.userInfo).toEqual(mockUserInfo);
  });

  it('should display hello userInfo after detectChanges()', () => {
    component.userInfo = mockUserInfo;
    fixture.detectChanges();
    const h1 = fixture.nativeElement.querySelector('.dashboard-header-title');
    expect(h1.textContent).toContain(`Hello ${component.userInfo.firstName} ! La communauté t'écoute.`);
  });
});
