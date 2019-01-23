import {NgModule} from '@angular/core';
import {AdminComponent} from './admin.component';
import {AdminRoutingModule} from './admin-routing.module';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {BlogListComponent} from './blog-list/blog-list.component';
import {BlogDetailComponent} from './blog-detail/blog-detail.component';
import {UserListComponent} from './user-list/user-list.component';
import {UserDetailComponent} from './user-detail/user-detail.component';
import {HttpClientModule} from '@angular/common/http';
import {AngularEditorModule} from '@kolkov/angular-editor';
import {OrderModule} from 'ngx-order-pipe';
import {SetupWebsiteComponent} from './setup-website/setup-website.component';


@NgModule({
  declarations: [
    // component
    AdminComponent,
    BlogListComponent,
    BlogDetailComponent,
    UserListComponent,
    UserDetailComponent,
    SetupWebsiteComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    HttpClientModule,
    AngularEditorModule,
    OrderModule
  ],
  providers: [
    // service
  ],
})

export class AdminModule {
}
