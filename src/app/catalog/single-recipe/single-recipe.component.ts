import { Component, Input, OnInit } from '@angular/core';
import { SingleRecipe,SingleComment } from '../models/recipe.model';
import { RouterLink } from '@angular/router';
import { SignedUser, UserInfo } from '../../user-profile/models/userModel';
import { UserService } from '../../services/user.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-single-recipe',
  standalone: true,
  imports: [RouterLink,DatePipe],
  templateUrl: './single-recipe.component.html',
  styleUrl: './single-recipe.component.css'
})
export class SingleRecipeComponent implements OnInit{
@Input('singleRecipe') recipe:SingleRecipe | null=null;
authorUser: UserInfo | null = null;
currentUserInfo: UserInfo | null = null;
currentUser: SignedUser | null = null;


constructor(private userService:UserService){

}

ngOnInit(): void {
  if(this.recipe){
    this.userService.getUserInfo(this.recipe.authorId).subscribe((userInfo)=>{
      this.authorUser = userInfo
    })
  }
}

setDefaultImage(event: Event){
  const target = event.target as HTMLImageElement;
  target.src = 'assets/images/default-image.png';
}

getComments(): SingleComment[] {
  if (!this.recipe?.comments) {
    return [];
  }
  return Object.values(this.recipe.comments);
}

getLikes(){
  if(!this.recipe?.likes){
    return[];
  }
  return Object.values(this.recipe.likes)
}

}
