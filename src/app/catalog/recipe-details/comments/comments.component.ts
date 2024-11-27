import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { SingleComment } from '../../models/recipe.model';
import { SingleCommentComponent } from './single-comment/single-comment.component';
import { CommentService } from './comment.service';

@Component({
  selector: 'app-comments',
  standalone: true,
  imports: [SingleCommentComponent],
  providers:[CommentService],
  templateUrl: './comments.component.html',
  styleUrl: './comments.component.css'
})
export class CommentsComponent implements OnInit{
  @Input('recipeId') recipeId!: string;
  comments:SingleComment[] = [];

  constructor(private comServ:CommentService){}

  ngOnInit(): void {
    if(this.recipeId){
      this.comServ.getAllComments(this.recipeId).subscribe((comments:SingleComment[])=>{
        this.comments = Object.values(comments);
        console.log('komentari',comments);
      })
    }
  }

  // ngOnChanges(changes: SimpleChanges): void {
  //   if(changes['recipeId'] && changes['recipeId'].currentValue){
  //     this.fetchComments(changes['recipeId'].currentValue);
  //   }
  // }

  // fetchComments(recipeId:string){
  //   this.comServ.getAllComments(recipeId).subscribe((comments:SingleComment[])=>{
  //     this.comments = Object.values(comments);
  //     console.log('komentari',comments)
  //   })
  // }
}
