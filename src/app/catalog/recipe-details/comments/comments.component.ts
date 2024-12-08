import { Component, EventEmitter, Input, Output} from '@angular/core';
import { SingleComment } from '../../models/recipe.model';
import { SingleCommentComponent } from './single-comment/single-comment.component';


@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [SingleCommentComponent],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent{
  @Input('comments') comments: SingleComment [] = [];
  @Input('isAuthor') isAuthorOfRecipe!: boolean;
  @Output() deleteComment = new EventEmitter<string>();
  @Output() likeComment = new EventEmitter<{ commentId: string; userId: string }>();

  onDeleteComment(commentId: string): void {
    this.deleteComment.emit(commentId);
  }

  onLike(event: { commentId: string; userId: string }): void {
    this.likeComment.emit(event);
  }

}
