import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-feed-item',
  templateUrl: './feed-item.component.html',
  styleUrls: ['./feed-item.component.scss']
})
export class FeedItemComponent implements OnInit {

  @Input() feedItem;
  constructor() { }

  ngOnInit(): void {
  }

}
