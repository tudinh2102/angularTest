import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {BlogListComponent} from './blog-list/blog-list.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {AdminComponent} from './admin.component';
import {AuthGuard} from '../auth.guard';

const adminRoutes: Routes = [

  /*{path: '', component: AdminComponent},
  // {path: '', redirectTo: 'blog-list', pathMatch: 'full'},
  {path: 'blog-list', component: AdminComponent},
  {path: 'blog/:id', component: BlogDetailComponent},
  {path: 'user-list', component: UserListComponent},
  {path: 'user/:id', component: UserDetailComponent},*/

  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: '',
        component: BlogListComponent
      },
      {
        path: 'p/:id',
        component: BlogListComponent
      },
      {
        path: 'blog/:id',
        // canActivate: [AuthGuard],
        component: BlogDetailComponent
      },
      {
        path: 'user-list',
        canActivate: [AuthGuard],
        component: UserListComponent
      },
      {
        path: 'user/:username',
        canActivate: [AuthGuard],
        component: UserDetailComponent
      }
    ]
  }

];

@NgModule({
  imports: [
    RouterModule.forChild(adminRoutes)
  ],
  exports: [RouterModule]
})
export class AdminRoutingModule {
}
