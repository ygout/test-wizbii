import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TransformToUntilDatePipe } from '../../pipes/transform-to-until-date.pipe';

import { CommentItemComponent } from './comment-item.component';

describe('CommentItemComponent', () => {
  let component: CommentItemComponent;
  let fixture: ComponentFixture<CommentItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CommentItemComponent, TransformToUntilDatePipe],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CommentItemComponent);
    component = fixture.componentInstance;
    component.comment = {
      content: 'Salut je suis un test',
      feedItemId: '1',
      date: new Date().toString(),
      likes: 0,
      author: {
        firstName: 'Test firstname',
        lastName: 'Test lastname',
      },
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
