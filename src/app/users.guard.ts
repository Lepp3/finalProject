import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "./user.service";
import { map,  catchError} from 'rxjs/operators'
import { RecipeService } from "./recipe.service";
import { of } from "rxjs";
import { SingleRecipe } from "./catalog/models/recipe.model";
import { SignedUser } from "./user-profile/models/userModel";


export const AuthGuard: CanActivateFn = (route,state) => {
    const userService = inject(UserService);
    const router = inject(Router);

    if(userService.isLogged){
        return true
    }
    router.navigate(['/login']);
    return false

}

export const GuestGuard: CanActivateFn = (route,state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    if(userService.isLogged){
    router.navigate(['/recipes']);
        return false
    }
    return true
}


export const AuthorGuard: CanActivateFn = (route,state) =>{
    const userService = inject(UserService);
    const recipeService = inject(RecipeService);
    const router = inject(Router);

    const recipeId = route.params['id'];
    console.log(recipeId);
    //no recipe id
    if(!recipeId){
        router.navigate(['/recipes']);
        return of(false)
    }

    const user: SignedUser | null = userService.user;
    // no user if auth guard has failed
    if(!user){
        router.navigate(['/login']);
        return false
    }

    return recipeService.getSingleRecipe(recipeId).pipe(
        map((recipe:SingleRecipe)=>{
            console.log(recipe);
            // not author
            if(recipe.authorId !== user.localId){
                console.log(recipe.authorId);
                router.navigate(['/recipes']);
                return false;
            }else{
                // author
                return true
            }
        }),catchError(()=>{
            router.navigate(['/recipes']);
            return of(false);
        })
    )


}