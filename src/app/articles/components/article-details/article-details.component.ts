import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { ArticlesService } from '../../services/articles.service';
import { Article, ArticleRes, CommentRequest, CommentsResponse } from '../../types/articles.interfaces';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { user } from '../../../auth/types/user.interface';
import { UserService } from '../../../users/services/user.service';
import { NotExpr } from '@angular/compiler';
@Component({
  selector: 'app-article-details',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, RouterLink],
  templateUrl: './article-details.component.html',
  styleUrl: './article-details.component.scss'
})
export class ArticleDetailsComponent {
  commentForm!: FormGroup;  // Form group for the comment input
  likesCount = 0;
  slug: string = '';
  Slug: string | null = null;
  articleDetails: Article | null = null;
  commentsResponse: CommentsResponse | null = null;
  currentUser: string | undefined;
  yourPost: boolean = false;
  user1!: string;
  user2!: string;
  liked: boolean = false;
  isFollowing: boolean = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articleService: ArticlesService,
    private userService: UserService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Retrieve the slug from the route
    this.route.paramMap.subscribe(params => {
      this.Slug = params.get('slug'); // Assign the 'slug' to the class property
      this.fetchPostDetails();
      this.getArticlesComments();
    });

    // Fetch the current user data
    this.userService.getCurrentUserData().subscribe({
      next: (res: user) => {
        this.user1 = res.user.username;

        // Fetch the article details after getting user1
        this.articleService.getArticle(this.Slug).subscribe({
          next: (res: ArticleRes) => {
            this.user2 = res.article.author.username;
            this.likesCount = res.article.favoritesCount;
            this.isFollowing = res.article.author.following;
            this.liked = res.article.favorited;

            // Check if the current user is the author of the post
            if (this.user1 === this.user2) {
              this.yourPost = true;
            }
          }
        });
      }
    });

    this.commentForm = this.fb.group({
      commentBody: ['', Validators.required]  // Form control with required validator
    });
  }

  fetchPostDetails() {
    if (this.Slug) {
      // Use the service to fetch post details by slug
      this.articleService.getArticle(this.Slug).subscribe({
        next: (res: ArticleRes) => {
          this.articleDetails = res.article;
          this.user2 = res.article.author.username;
          this.liked = res.article.favorited;
          this.isFollowing = res.article.author.following;
        },
        error: (error) => {
          console.log(error, 'an error occurred');
        }
      });
    }
  }

  getArticlesComments() {
    if (this.slug) {
      // Use the service to fetch comments for the article
      this.articleService.getComments(this.slug).subscribe({
        next: (res: CommentsResponse) => {
          this.commentsResponse = res;
        },
        error: (error) => {
          console.log(error, 'an error occurred');
        }
      });
    }
  }

  onDeleteComment(id: number, slug: string | undefined) {
    this.articleService.deletComment(id, slug).subscribe({
      next: (res: any) => {
        console.log('Comment deleted', res);
        this.getArticlesComments();  // Refetch comments after deletion
      },
      error: (error: Error) => {
        console.log('Error occurred while deleting the comment');
        console.log(id, slug);
      }
    });
  }

  onSubmitComment(slug: string | undefined) {
    if (this.commentForm.valid) {
      const commentBody = this.commentForm.value.commentBody;

      // Create the comment request object
      const commentRequest = {
        comment: {
          body: commentBody
        }
      };

      console.log('New comment:', commentRequest);

      // Call the service to add the comment
      this.articleService.AddComment(slug, commentRequest).subscribe({
        next: (res: object) => {
          console.log('Comment added');
          this.getArticlesComments();  // Refetch comments after adding

          // Clear the form input after successful submission
          this.commentForm.reset();
        },
        error: (error: Error) => {
          console.log(error, 'There was an error adding your comment');
        }
      });
    }
  }

  onDeleteArticle(slug: string | undefined) {
    this.articleService.deleteARticle(slug).subscribe({
      next: (res: any) => {
        console.log(res);
        this.router.navigate(['/home']);  // Redirect to home after deletion
      }
    });
  }

  like(slug: string | undefined) {
    this.articleService.favArticle(slug).subscribe({
      next: (res: any) => {
        console.log('Article liked', res);
        this.liked = true;
        this.likesCount += 1;

        // Update article details locally
        if (this.articleDetails) {
          this.articleDetails.favorited = true;
          this.articleDetails.favoritesCount += 1;
        }
      }
    });
  }

  unlike(slug: string | undefined) {
    this.articleService.unFavArticle(slug).subscribe({
      next: (res: any) => {
        console.log('Article unliked', res);
        this.liked = false;
        this.likesCount -= 1;

        // Update article details locally
        if (this.articleDetails) {
          this.articleDetails.favorited = false;
          this.articleDetails.favoritesCount -= 1;
        }
      }
    });
  }

  follow(username: string | undefined) {
    this.userService.followUser(username).subscribe({
      next: (res: any) => {
        console.log(`Now following ${username}`);
        this.isFollowing = true;

        // Update article details locally
        if (this.articleDetails && this.articleDetails.author) {
          this.articleDetails.author.following = true;
        }
      }
    });
  }

  unFollow(username: string | undefined) {
    this.userService.unFollowUser(username).subscribe({
      next: (res: any) => {
        console.log(`Unfollowing ${username}`);
        this.isFollowing = false;

        // Update article details locally
        if (this.articleDetails && this.articleDetails.author) {
          this.articleDetails.author.following = false;
        }
      }
    });
  }
}

