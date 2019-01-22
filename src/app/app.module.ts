import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {HeaderComponent} from './home/header/header.component';
import {FooterComponent} from './home/footer/footer.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ShareModule} from '../share/share.module';
import {HttpClient, HttpClientModule} from '@angular/common/http';
import {CategoryComponent} from './category/category.component';
import {ViewBlogComponent} from './view-blog/view-blog.component';

import {FilterPipeModule} from 'ngx-filter-pipe';

import {TranslateLoader, TranslateModule} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    LoginComponent,
    NotFoundComponent,
    CategoryComponent,
    ViewBlogComponent,
  ],
  imports: [
    ReactiveFormsModule,
    ShareModule.forRoot(),
    HttpClientModule,
    FilterPipeModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,

    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
