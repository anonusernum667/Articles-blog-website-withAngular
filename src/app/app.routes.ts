import { Routes } from '@angular/router';
import { HomeFeedComponent } from './articles/components/home-feed/home-feed.component';
import { LoginComponent } from './auth/components/login/login.component';
import { SignupComponent } from './auth/components/signup/signup.component';
import { FavoritesComponent } from './articles/components/favorites/favorites.component';
import { NewarticleComponent } from './articles/components/newarticle/newarticle.component';
import { AuthGuard } from './shared/guards/auth.guard';
import { UserComponent } from './users/user/user.component';
import { UserEditComponent } from './users/user-edit/user-edit.component';
import { RedirectIfAuthenticatedGuard } from './shared/guards/redirect-if-authenticated.guard';
import { ArticleDetailsComponent } from './articles/components/article-details/article-details.component';
import { EditarticleComponent } from './articles/components/editarticle/editarticle.component';
import { ViewUserComponent } from './users/view-user/view-user.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: HomeFeedComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [RedirectIfAuthenticatedGuard], // Prevent access if logged in
  },
  {
    path: 'sign-up',
    component: SignupComponent,
    canActivate: [RedirectIfAuthenticatedGuard], // Prevent access if logged in
  },
  {
    path: 'favorites',
    component: FavoritesComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'Create',
    component: NewarticleComponent,
    canActivate: [AuthGuard],
  },

  {
    path: 'account',
    component: UserComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'edit/:username',
    component: UserEditComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'articles/:slug',
    component: ArticleDetailsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'article/:slug/edit',
    component: EditarticleComponent,
    title: 'Edit Article details',
    canActivate: [AuthGuard],

  },
  {
    path: ':username',
    component:ViewUserComponent,
    canActivate:[AuthGuard]
  }
];
