import { AuthService } from './../../auth/services/auth.service';
import { Component } from '@angular/core';
import { user } from '../../auth/types/user.interface';
import { UserService } from '../services/user.service';
import { HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '../../articles/services/articles.service';
import { Article, ArticleResponse } from '../../articles/types/articles.interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

userData: user | undefined
username: string | null = '';
user: string = ''
userArticles : Article[] =[]
doUserHaveArticles: boolean | undefined
constructor(private userService: UserService,private AuthService:AuthService, private articleService: ArticlesService, private route: ActivatedRoute, public router:Router){

}

ngOnInit(){
  if (this.userArticles.length > 0 ){
    this.doUserHaveArticles = true
  }
  else {
    this.doUserHaveArticles = false
  }


  this.username = this.route.snapshot.paramMap.get('username');

    this.userService.getCurrentUserData().subscribe({
      next: (res: user) => {
        this.userData = res
        this.user = res.user.username
        console.log(res.user.token)
      },
      error: (error: Error) => {
        alert(error.message)
      }
    })
    this.articleService.getUserArticles(this.userData?.user.username).subscribe(
    {
      next: (res: ArticleResponse) => {
        console.log(this.userData?.user.username)
        this.userArticles = res.articles
      }
    }
    )
}
logout(){
  this.AuthService.logout()
}

}
