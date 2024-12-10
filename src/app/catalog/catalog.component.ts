import { Component, OnDestroy, OnInit } from '@angular/core';
import { SingleRecipe } from './models/recipe.model';
import { SingleRecipeComponent } from './single-recipe/single-recipe.component';
import { RecipeService } from '../recipe.service';


@Component({
  selector: 'app-catalog',
  standalone: true,
  imports: [SingleRecipeComponent],
  templateUrl: './catalog.component.html',
  styleUrl: './catalog.component.css',
})
export class CatalogComponent implements OnInit {
  recipes: SingleRecipe[] = [];
  filteredRecipes: SingleRecipe[] = [];

  constructor(private recService: RecipeService) {}

  ngOnInit(): void {
    this.recService.getAllRecipes().subscribe((data) => {
      this.recipes = Object.values(data);
      this.filteredRecipes = Object.values(data);
    });
  }

  filterByInput(filter: HTMLInputElement, searchParam: string) {
    if (!searchParam) {
      return;
    }
    this.filteredRecipes = this.recipes.filter((recipe) =>
      recipe.title.toLowerCase().includes(searchParam.toLowerCase())
    );
    filter.value = '';
  }

  reset() {
    this.filteredRecipes = this.recipes;
  }

  mostLiked() {
    this.filteredRecipes = [...this.recipes].sort((a, b) => {
      const likesA = a.likes ? Object.keys(a.likes).length : 0;
      const likesB = b.likes ? Object.keys(b.likes).length : 0;
      return likesB - likesA;
    });
  }

  mostCommented() {
    this.filteredRecipes = [...this.recipes].sort((a, b) => {
      const commentsA = a.comments ? Object.keys(a.comments).length : 0;
      const commentsB = b.comments ? Object.keys(b.comments).length : 0;
      return commentsB - commentsA;
    });
  }

  newest() {
    this.filteredRecipes.sort((a, b) => {
      const timeA = Number(a.timestamp || 0);
      const timeB = Number(b.timestamp || 0);
      return timeB - timeA;
    });
  }

  oldest() {
    this.filteredRecipes.sort((a, b) => {
      const timeA = Number(a.timestamp || 0);
      const timeB = Number(b.timestamp || 0);
      return timeA - timeB;
    });
  }

  selectChange(event: Event) {
    const selectedOption = (event.target as HTMLSelectElement)
      .selectedOptions[0].value;
    switch (selectedOption) {
      case 'Newest':
        this.newest();
        break;
      case 'Oldest':
        this.oldest();
        break;
      case 'Most liked':
        this.mostLiked();
        break;
      case 'Most commented':
        this.mostCommented();
        break;
    }
  }
}
