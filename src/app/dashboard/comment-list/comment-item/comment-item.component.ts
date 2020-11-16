import { Component, Input, OnInit } from '@angular/core';
import { Comment } from 'src/app/core/models';

@Component({
  selector: 'app-comment-item',
  templateUrl: './comment-item.component.html',
  styleUrls: ['./comment-item.component.scss'],
})
export class CommentItemComponent implements OnInit {
  @Input() comment: Comment;
  isLiked = false;
  constructor() {}

  ngOnInit(): void {}

  onThanx() {
    console.log('Thanx ! ');
  }
}
