import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardHeaderComponent } from './dashboard-header/dashboard-header.component';
import { FeedItemListComponent } from './feed-item-list/feed-item-list.component';
import { TransformToUntilDatePipe } from './pipes/transform-to-until-date.pipe';
import { FeedItemComponent } from './feed-item-list/feed-item/feed-item.component';
import { CommentItemComponent } from './comment-list/comment-item/comment-item.component';
import { CommentListComponent } from './comment-list/comment-list.component';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    DashboardComponent,
    DashboardHeaderComponent,
    FeedItemListComponent,
    FeedItemComponent,
    CommentItemComponent,
    CommentListComponent,
    TransformToUntilDatePipe,
  ],
  imports: [CommonModule, FormsModule, NgxSpinnerModule],
  exports: [DashboardComponent],
})
export class DashboardModule {}
