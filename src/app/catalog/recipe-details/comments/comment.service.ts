import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../endpoints';
import { SingleComment } from '../../models/recipe.model';

@Injectable()
export class CommentService {

  constructor(private http:HttpClient) { }

  getAllComments(recipeId:string){
    return this.http.get<SingleComment[]>(environment.apiUrl+'recipes/'+recipeId+'/comments.json');
  }

  deleteComment(commentId:string){
    //todo IMPLEMENT
  }
}
