import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {LoginComponent} from './login/login.component';
import {ViewBlogComponent} from './view-blog/view-blog.component';

const routes: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'home/:p', component: HomeComponent},

  {path: 'category-blog/:id', component: HomeComponent},
  {path: 'category-blog/:id/p/:p', component: HomeComponent},

  {path: 'author-blog/:username', component: HomeComponent},
  {path: 'author-blog/:username/p/:p', component: HomeComponent},

  {path: 'view-blog/:id', component: ViewBlogComponent},

  {path: 'home', component: HomeComponent},
  {path: 'home', component: HomeComponent},
  {path: 'login', component: LoginComponent},
  {
    path: 'admin',
    loadChildren: './admin/admin.module#AdminModule'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }



