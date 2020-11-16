import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-item-list',
  templateUrl: './feed-item-list.component.html',
  styleUrls: ['./feed-item-list.component.scss'],
})
export class FeedItemListComponent implements OnInit {
  @Input() feedItems;
  constructor() {}

  ngOnInit(): void {}
}
