import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '../../articles/services/articles.service';
import { UserService } from '../services/user.service';
import { AuthService } from '../../auth/services/auth.service';
import { CommonModule } from '@angular/common';
import { user } from '../../auth/types/user.interface';
import { Article, ArticleResponse } from '../../articles/types/articles.interfaces';

@Component({
  selector: 'app-view-user',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './view-user.component.html',
  styleUrl: './view-user.component.scss'
})
export class ViewUserComponent {
  userData: any; // Should be updated to the correct interface based on the API structure
  userArticles: Article[] = [];
  username: string | null = '';

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private articleService: ArticlesService,
    private route: ActivatedRoute,
    public router: Router
  ) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    if (this.username) {
      this.userService.getProfile(this.username).subscribe({
        next: (response) => {
          console.log('API Response:', response); // Log the response to check the structure
          this.userData = response;

          // Now we access profile.username instead of user.username
          if (this.userData?.profile?.username) {
            this.loadUserArticles(this.userData.profile.username);
          } else {
            console.error('Profile data or username is undefined.');
          }
        },
        error: (err) => {
          console.error('Error fetching profile:', err);
        }
      });
    } else {
      console.error('Username is null or undefined.');
    }
  }

  loadUserArticles(username: string) {
    this.articleService.getUserArticles(username).subscribe({
      next: (res: ArticleResponse) => {
        console.log(username);
        this.userArticles = res.articles;
      },
      error: (err) => {
        console.error('Error fetching articles:', err);
      }
    });
  }
}
