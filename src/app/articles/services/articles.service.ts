import { HttpBackend, HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from '../../auth/services/auth.service';
import { Observable } from 'rxjs';
import { ArticleRes, ArticleResponse , CommentRequest, CommentsResponse, CreateArticleRequest, updatedArticleRequest } from '../types/articles.interfaces';
import { environment } from '../../../environments/environment';
import { Router } from '@angular/router';
import { UserService } from '../../users/services/user.service';
import { user } from '../../auth/types/user.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  private myValue: string | null = null;
  private slug: string | null = null;

  // setSlug(value: string): void {
  //   this.slug = value;
  // }

  // getSlug(): string | null {
  //   return this.slug;
  // }
  setValue(value: string): void {
    this.myValue = value;
  }

  getValue(): string | null {
    return this.myValue;
  }
  constructor(private http:HttpClient,private authservice:AuthService,private router: Router,private userService: UserService) { }

  //  const token = this.authservice.getToken();
  //   const headers = new HttpHeaders({

  //     'Authorization': `Token ${this.token}`
  //   });
  getUserFavorited(){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

     'Authorization': `Token ${token}`
     });
       const username = ''
     this.userService.getCurrentUserData().subscribe({
      next : (res:user) => {
        const username = res.user.username
      }
     })
   return this.http.get<ArticleResponse>(`${environment.mainApiUrl}/articles?favorited=${username}`, {headers})
  }
  getHomeFeedArticles():Observable<ArticleResponse>
  {
    const token = this.authservice.getToken();
     const headers = new HttpHeaders({

      'Authorization': `Token ${token}`
      });
    return this.http.get<ArticleResponse>(`${environment.mainApiUrl}/articles?limit=221`, {headers})
  }

  createArticle(requestBody: CreateArticleRequest){
    const token = this.authservice.getToken();
     const headers = new HttpHeaders({

      'Authorization': `Token ${token}`
      });
    return this.http.post<ArticleRes>(`${environment.mainApiUrl}/articles`,requestBody, {headers})
  }
  getArticle(slug: string | null):Observable<ArticleRes>{
    this.slug = slug
    return this.http.get<ArticleRes>(`${environment.mainApiUrl}/articles/${slug}`)
  }


  getUserArticles(username: string | undefined):Observable<ArticleResponse>
  {
    const token = this.authservice.getToken();
     const headers = new HttpHeaders({

      'Authorization': `Token ${token}`
      });
    return this.http.get<ArticleResponse>(`${environment.mainApiUrl}/articles?author=${username}`, {headers})
  }
 getComments(slug:string):Observable<CommentsResponse>{
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

     'Authorization': `Token ${token}`
     });
    return this.http.get<CommentsResponse>(`${environment.mainApiUrl}/articles/${slug}/comments`, {headers})
  }

  deletComment(id:number , slug:string | undefined){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

     'Authorization': `Token ${token}`
     });
    return this.http.delete(`${environment.mainApiUrl}/articles/${slug}/comments/${id}`, {headers})
  }
  AddComment( slug:string | undefined, comment: CommentRequest ){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

     'Authorization': `Token ${token}`
     });
    return this.http.post(`${environment.mainApiUrl}/articles/${slug}/comments`, comment, {headers})
    this.router.navigate([this.router.url]);

  }
  favArticle(slug: string | undefined){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

     'Authorization': `Token ${token}`
     });
    return this.http.post(`${environment.mainApiUrl}/articles/${slug}/favorite`, {}, { headers })
  }
  unFavArticle(slug: string | undefined){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

     'Authorization': `Token ${token}`
     });
    return this.http.delete(`${environment.mainApiUrl}/articles/${slug}/favorite`, {headers})
  }
  deleteARticle(slug: string  | undefined){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

     'Authorization': `Token ${token}`
     });
    return this.http.delete(`${environment.mainApiUrl}/articles/${slug}`, {headers})
  }
  updateArticle(requestBody: updatedArticleRequest, slug: any){
    const token = this.authservice.getToken();
    const headers = new HttpHeaders({

     'Authorization': `Token ${token}`
     });
    return this.http.put(`${environment.mainApiUrl}/articles/${slug}`,requestBody, {headers} )
  }
}
