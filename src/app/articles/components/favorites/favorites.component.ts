import { ArticlesService } from './../../services/articles.service';
import { Component } from '@angular/core';
import { RouterModule, RouterLink, Router, Route, ActivatedRoute } from '@angular/router';
import { TagsService } from '../../../tags/tags.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Article, ArticleResponse } from '../../types/articles.interfaces';
@Component({
  selector: 'app-favorites',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, ReactiveFormsModule],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.scss'
})
export class FavoritesComponent {
  constructor(private tagsService: TagsService, private fb: FormBuilder, private ArticlesService:ArticlesService, private router: Router,  private route: ActivatedRoute){}

  articles: Article[] = []


  ngOnInit(){
    this.ArticlesService.getUserFavorited().subscribe(
      (response) => {
        this.articles = response.articles
        console.log(this.articles)
      },
      (error) => {
        console.error('Error fetching articles', error);
      }
    )
  }
    getArticle(slug: string){
    this.ArticlesService.getArticle(slug)
    console.log(slug)
    this.router.navigate(['/articles', slug])
  }
  }



