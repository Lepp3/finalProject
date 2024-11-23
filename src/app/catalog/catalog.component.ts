import { Component, OnInit } from '@angular/core';
import { SingleRecipe } from './models/recipe.model';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [SingleRecipeComponent],
  providers:[],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css'
})
export class CatalogComponent implements OnInit {

recipes:SingleRecipe[] = [{title:'chickenParm',
  author:'userId',
  shortInfo:'Italian classic',
  imageSrc:'https://tastesbetterfromscratch.com/wp-content/uploads/2023/03/Chicken-Parmesan-1.jpg',
  details:{fullRecipe:'cook the chicken untill done', ingredients:['chicken','parmesan']},
  likes:{'88fbbf2':true},
  comments:{'0sBsgnXos':{authorUsername:'randomusername',authorId:'88sbbvu3b',content:'nice meal',timestamp:'173883776993'}}}];



constructor(){}

ngOnInit(): void {
  
}
}
