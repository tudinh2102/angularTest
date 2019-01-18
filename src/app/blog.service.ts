import {Injectable} from '@angular/core';
import {Blog} from '../models/blog';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {faceBlog} from '../models/fake-blog';
import {catchError, map} from 'rxjs/operators';
import {Util} from './untils/util';

const httpOptions = {
  headers: new HttpHeaders({
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token'
  })
};

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  private postUrl = 'http://localhost/db.json';

  constructor(
    private http: HttpClient) {
  }

  getListBlog2(): Observable<Blog[]> {
    return this.http.get<Blog[]>(this.postUrl, httpOptions)
      .pipe(
        map(
          (listBlog) => {
            console.log(listBlog);
            return listBlog.map(p => Util.copyProps(p, new Blog()));
            // map tach ra thanh tung ban ghi, lay tung ban ghi object chuyen ve Post
          }
        ),
        catchError(error => of([]))
      );
  }

  getListBlog(): Observable<Blog[]> {
    return of(faceBlog);
  }

  getListBlogBycategoryId(id: number): Observable<Blog[]> {

    return of(faceBlog.filter(blog => blog.categoryId === +id));
  }

  searchLikeTitle(str: string): Observable<Blog[]> {
    if (!str) {
      return of(faceBlog);
    }
    return of(faceBlog.filter(blog => blog.title === str));
  }

}
