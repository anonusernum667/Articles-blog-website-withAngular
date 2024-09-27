export interface ArticleRes {
  article: {
    slug: string;
    title: string;
    description: string;
    body: string;
    tagList: string[];
    createdAt: string;
    updatedAt: string;
    favorited: boolean;
    favoritesCount: number;
    author: {
      username: string;
      bio: string | null;
      image: string;
      following: boolean;
    };
  };
}
export interface CreateArticleRequest {
  article: {
    title: string;
    description: string;
    body: string;
    tagList: string[];
  };
}
export interface Author {
  username: string;
  bio: string | null; // Bio can be null
  image: string;
  following: boolean;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  favorited: boolean;
  favoritesCount: number;
  author: Author;
}

export interface ArticleResponse {
  articles: Article[];
}
export interface CommentRequest {
  comment: {
    body: string;
  };
}
export interface CommentAuthor {
  username: string;
  bio: string | null;
  image: string;
  following: boolean;
}

export interface Comment {
  id: number;
  createdAt: string;
  updatedAt: string;
  body: string;
  author: CommentAuthor;
}

export interface CommentsResponse {
  comments: Comment[];
}
export interface updatedArticleRequest {
  article: {
    title?: string
    description?: string
    body?: string
  }
}
