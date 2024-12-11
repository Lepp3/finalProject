# Chef's rest WebApp 
                                            Documentation 

## Overview 
This project is a web application that allows users to post, comment on, and like recipes posted by other users. Guests can browse the recipes catalog, view individual recipe details, and see user profiles along with their posted recipes. 
## Used Frameworks and Libraries 

### Frontend 

- **Angular v18**: A platform for building mobile and desktop web applications. - **uuidv4**: A library for generating unique IDs. 

### Backend 
- **Firebase**: A platform for creating mobile and web applications. 
- **Authentication**: To manage user sign-ups and logins. 
- **Realtime database**: To store user data, recipes, comments, and likes.

## Installation 

To run the project locally, follow these steps: 

1. **Clone the repository**:
    ssh git clone https://github.com/Lepp3/finalProject.git 
    cd finalProject

2. **Install dependencies**:
    npm install

3. **Run the developement server**:
    ng serve --open
    The app will automatically reload if you change any of the source files.

### Functionality

**Guest Features**
    - **View Recipe Catalog**:
    Browse a list of all posted recipes.
    - **View Recipe Details**:
    See detailed information about a specific recipe.
    - **View User Profiles**:
    Browse user profiles and see their posted recipes.  

**User Features**
    - **Register/Login**:
    Create an account or log in to an existing one.
    - **Post Recipes**:
    Add new recipes with details.
    - **Edit Recipes**:
    Update a recipes posted by yourself.
    - **Delete Recipes**:
    Delete a recipes posted by yourself.
    - **Comment on Recipes**:
    Leave comments on recipes.  
    - **Delete a comment**:
    Delete comments posted by yourself or posted on your recipes. 
     - **Like Recipes**:
    Like recipes posted by others or yourself.
     - **Edit Profile**:
    Update personal information and profile picture. 

### Architecture
 **Components**
  - **AppComponent**:
    The root component.
  - **HomeComponent**:
    Displays a landing page with call to action button.
    - **AuthenticateComponent**:
    Loads user state upon initialization.
    - **AboutComponent**:
    Gives brief information about the purpose of the application as well as contact links to reach the creator.
    - **CatalogComponent**:
    Displays a list of posted recipes.
        - **RecipeCreatorComponent**:
            Allows authenticated users to post recipes.
        - **SingleRecipeComponent**:
            Short info presentation card of a recipe.
        - **RecipeDetailsComponent**:
            Displays the details of a recipe from the catalog and presents delete or edit options for authors.
            - **EditRecipeComponent**:
                Edit details of your recipe.
    - **FooterComponent**:
        Shows the site's footer.
    - **HeaderComponent**:
        Shows the site's header with navigation menu.
    - **LoginComponent**:
        Allows login functionality.
    - **RegisterComponent**:
        Allows registration functionality.
    - **UserProfileComponent**:
        Displays user info with an edit option for the owner of the account as well as their posted recipes.
        - **EditUserProfileComponent**:
            Users can edit their username, profile picture or details.
   **Services**
     - **UserService**:
       Holds information about the user state in terms of log state and user info. Responsible for register, sign in and sign out.
    - **RecipeService**:
       Responsible for all CRUD operations related to recipes,comments and likes.
    **Directives**
     - **Email validator**:
       Provides responsible error display depending on email domain input.
       - **Password Match validator**:
       Provides responsible error display depending password and confirm password inputs.

    ### Data Flow

    **Authentication**:
        Handled via Firebase Authentication.
    **Data Storage**:
        Recipes, comments, likes and user info stored in Realtime Database.
    **UI Updates**:
        Managed using angular change detection, services and directives.

    ### Interceptors

    **appInterceptor**:
        Handles authentication tokens and modifies API requests to include the token when necessary.

    ### Running unit tests
    Run ng test to execute the unit tests via Karma.

    ### Running end-to-end tests
    Run ng e2e to execcute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.