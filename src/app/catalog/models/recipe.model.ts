

export interface Details{
    fullRecipe:string,
    ingredients:string[]
}

export interface Likes{
    [userId:string]:boolean
}

export interface SingleComment{
    authorUsername: string,
    authorId: string,
    content: string,
    timestamp: string,
    commentId:string
}
export interface FullComments{
    [commentId:string]: SingleComment
}


export interface SingleRecipe{
    title:string,
    authorId:string,
    authorUsername:string,
    shortInfo:string,
    imageSrc:string,
    details: Details,
    comments: FullComments,
    likes: Likes,
    recipeId: string,
    timestamp: string
}