import { CanActivateFn, Router } from "@angular/router";
import { inject } from "@angular/core";
import { UserService } from "./user.service";
import { take, map, switchMap} from 'rxjs/operators'
import { RecipeService } from "./recipe.service";
import { of } from "rxjs";

export const AuthGuard: CanActivateFn = (route,state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    return userService.isLogged$.pipe(
        take(1),
        map(isLogged=>{
            if(isLogged){
                return true
            }else{
                router.navigate(['/login']);
                return false
            }
        })
    )  
}

export const GuestGuard: CanActivateFn = (route,state) => {
    const userService = inject(UserService);
    const router = inject(Router);
    return userService.isLogged$.pipe(
        take(1),
        map(isLogged=>{
            if(!isLogged){
                return true
            }else{
                router.navigate(['/home']);
                return false
            }
        })
    )  
}


export const AuthorGuard: CanActivateFn = (route,state) =>{
    const userService = inject(UserService);
    const recipeService = inject(RecipeService);
    const router = inject(Router);

    const recipeId = route.paramMap.get('id');
    if(!recipeId){
        router.navigate(['/recipes']);
        return false
    }

    return userService.user$.pipe(
        take(1),
        switchMap(user =>{
            if(!user){
                router.navigate(['/login']);
                return of(false);
            }
            return recipeService.isRecipeAuthor(recipeId,user.localId).pipe(
                map(isAuthor=>{
                    if(isAuthor){
                        return true
                    }else{
                        router.navigate(['/recipes']);
                        return false
                    }
                })
            )
        }
    )
    )
}