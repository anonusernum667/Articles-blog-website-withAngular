import { ArticlesService } from './../../services/articles.service';
import { Component } from '@angular/core';
import { RouterModule, RouterLink, Router, Route, ActivatedRoute } from '@angular/router';
import { TagsService } from '../../../tags/tags.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { Article, ArticleResponse } from '../../types/articles.interfaces';
import { ShufflePipe } from "../../../shuffle.pipe";
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-home-feed',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule, ReactiveFormsModule, ShufflePipe, FormsModule],
  templateUrl: './home-feed.component.html',
  styleUrl: './home-feed.component.scss'
})
export class HomeFeedComponent {
  articleForm: FormGroup;

  articles: Article[] = []
  constructor(private tagsService: TagsService, private fb: FormBuilder, private ArticlesService:ArticlesService, private router: Router,  private route: ActivatedRoute
  ){
    this.articleForm = this.fb.group({
      title: [''],
      description: [''],
      body: [''],
      tagList: [''] // This will be a comma-separated string
    });
  }
  tags:string[] = []
  ngOnInit(){

    this.tagsService.getTags().subscribe(
      response => {
        console.log(response); // Check what the API is returning
        this.tags = response.tags; // Ensure you access the 'tags' property which should be an array
      },
      error => {
        console.error('Error fetching tags:', error);
      }
    )
    this.ArticlesService.getHomeFeedArticles().subscribe(
      {
        next: (res: ArticleResponse) => {
          this.articles = res.articles
        },
        error: (error: Error) => {
          console.error('Error fetching articles', error);
        }
      }
      // (response) => {
      //
      // },
      // (error) => {
      //
      // }
    )
  }
  getArticle(slug: string){
    // this.ArticlesService.setValue();
    this.ArticlesService.getArticle(slug)
    console.log(slug)
    this.router.navigate(['/articles', slug])
  }





}
