import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CatalogComponent } from './catalog/catalog.component';
import { ErrorPageComponent } from './error-page/error-page.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecipeDetailsComponent } from './catalog/recipe-details/recipe-details.component';
import { RecipeCreatorComponent } from './catalog/recipe-creator/recipe-creator.component';
import { RecipeEditComponent } from './catalog/recipe-details/recipe-edit/recipe-edit.component';
// import { UserProfileComponent } from './user-profile/user-profile.component';
import { AuthGuard, GuestGuard, AuthorGuard } from './users.guard';

export const routes: Routes = [
    {path: '', redirectTo: '/home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'register', component: RegisterComponent, canActivate:[GuestGuard]},
    {path: 'login', component: LoginComponent, canActivate:[GuestGuard]},
    {path: 'recipes',
        children: [
            {path: '', component: CatalogComponent},
            {
                path: 'details/:id',
                component: RecipeDetailsComponent
            },
            {
                path: 'details/:id/edit',
                component: RecipeEditComponent,
                canActivate: [AuthorGuard]
            }
            
        ]
    },
    {
        path: 'create',
        component: RecipeCreatorComponent,
        canActivate: [AuthGuard]
    },










    {path: '**', component: ErrorPageComponent, pathMatch:'full'},

];
