import { ArticlesService } from './../../services/articles.service';
import { Component } from '@angular/core';
import { RouterModule, RouterLink } from '@angular/router';
import { TagsService } from '../../../tags/tags.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleResponse, ArticleRes } from '../../types/articles.interfaces';
@Component({
  selector: 'app-newarticle',
  standalone: true,
  imports: [RouterModule, RouterLink, CommonModule , ReactiveFormsModule],
  templateUrl: './newarticle.component.html',
  styleUrl: './newarticle.component.scss'
})
export class NewarticleComponent {
  articleForm: FormGroup;
  articleSLug:string | undefined
  constructor(private tagsService: TagsService, private fb: FormBuilder, private ArticlesService:ArticlesService){
    this.articleForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      body: ['', Validators.required],
      tagList: ['', Validators.required]
    });
  }
  onSubmit() {
    if (this.articleForm.invalid) {
      // Mark all fields as touched to show validation errors
      this.articleForm.markAllAsTouched();
      return;
    }

    const formValue = this.articleForm.value;
    const articleRequest = {
      article: {
        ...formValue,
        tagList: formValue.tagList.split(',').map((tag: string) => tag.trim())
      }
    };
    console.log(articleRequest);
    this.ArticlesService.createArticle(articleRequest).subscribe({
      next: (res: ArticleRes) => {
        console.log(res)
        this.articleSLug = res.article.slug
        this.ArticlesService.setValue(this.articleSLug);
      },
      error: (error: Error) => {
        console.log(error)
      }
    })

}
}
