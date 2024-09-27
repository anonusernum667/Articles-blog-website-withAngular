import { Component } from '@angular/core';
import { ArticlesService } from './../../services/articles.service';
import { RouterModule, RouterLink, ActivatedRoute, Router, Route } from '@angular/router';
import { TagsService } from '../../../tags/tags.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleResponse, ArticleRes, Article, updatedArticleRequest } from '../../types/articles.interfaces';
import { UserService } from '../../../users/services/user.service';
@Component({
  selector: 'app-editarticle',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, ReactiveFormsModule,FormsModule],
  templateUrl: './editarticle.component.html',
  styleUrl: './editarticle.component.scss'
})
export class EditarticleComponent {
  slug!: string | null;
  article: updatedArticleRequest = {
    article: {
      title: '',
      description: '',
      body: '',
    }
  };

  constructor(
    private route: ActivatedRoute,
    private articleService: ArticlesService,
    private router: Router
  ) {}

  ngOnInit() {
    this.slug = this.route.snapshot.paramMap.get('slug');
    console.log(this.slug);

    // Fetch article data and populate the article object
    if (this.slug) {
      this.articleService.getArticle(this.slug).subscribe({
        next: (res: ArticleRes) => {
          // Update the article object with the data retrieved
          this.article.article.title = res.article.title;
          this.article.article.description = res.article.description;
          this.article.article.body = res.article.body;
        },
        error: (error: Error) => {
          console.log(error, 'Error occurred while fetching the article');
        }
      });
    }
  }

  saveData() {
    const reqBody: updatedArticleRequest = {
      article: {
        title: this.article.article.title,
        description: this.article.article.description,
        body: this.article.article.body,
      }
    };

    this.articleService.updateArticle(reqBody, this.slug).subscribe({
      next: (res: any) => {
        alert('Article updated successfully');
        this.router.navigate(['/home']);
      },
      error: (error: Error) => {
        console.log(error, 'Error occurred while updating the article');
      }
    });
  }
}

