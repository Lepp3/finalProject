import { Component, OnInit,} from '@angular/core';
import { SignedUser, UserInfo } from './models/userModel';
import { UserService } from '../user.service';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SingleRecipe } from '../catalog/models/recipe.model';
import { RecipeService } from '../recipe.service';
import { PostedRecipeComponent } from './posted-recipe/posted-recipe.component';

@Component({
  selector: 'app-user-profile',
  standalone: true,
  imports: [RouterLink,PostedRecipeComponent],
  templateUrl: './user-profile.component.html',
  styleUrl: './user-profile.component.css'
})
export class UserProfileComponent implements OnInit{
  userId!: string;
  isOwner: boolean = false;
  userInfo!: UserInfo;
  currentUser: SignedUser | null = null;
  userRecipes: SingleRecipe[] = [];
  


  constructor(
    private userService:UserService,
    private activeRoute: ActivatedRoute,
    private router: Router,
    private recipeService: RecipeService
  ){
    this.userService.user$.subscribe((user)=>{
      this.currentUser = user;
    })
  }

  ngOnInit(): void {
    this.userId = this.activeRoute.snapshot.params['id'];
      if(this.userId){
        this.loadUserData();
        this.loadUserRecipes();
      }else{
        this.router.navigate(['***'])
      }
  }

  loadUserData(){
    this.userService.getUserInfo(this.userId).subscribe({
      next:(user)=>{
        this.userInfo = user;
        this.isOwner = this.currentUser?.localId === this.userInfo._id;
      },
      error: (err)=>{
        console.error('Failed to load user data',err);
        this.router.navigate(['/home'])
      }
    })
  }

  loadUserRecipes(){
    this.recipeService.getAllRecipes().subscribe({
      next: (recipes) => {
        
        this.userRecipes = Object.values(recipes).filter((recipe) => recipe.authorId === this.userId);
      },
      error: (err) => {
        console.error('Failed to load recipes', err);
      }
    });
  }

}
