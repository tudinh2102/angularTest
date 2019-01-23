import {Injectable} from '@angular/core';
import {Blog} from '../models/blog';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {faceBlog} from '../models/fake-blog';

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
  blogs: Blog[];

  constructor(
    private http: HttpClient) {
  }

  getBlogById(id: number): Observable<Blog> {
    return of(JSON.parse(localStorage.getItem('blogs')).filter(blog => blog.id === +id));
  }

  // nếu local chưa có data thì get từ fake
  getDataAll(): void {
    if (!localStorage.getItem('blogs')) {
      localStorage.setItem('blogs', JSON.stringify(faceBlog));
    }
  }

  getData(categoryId: number, username: string, approve: number, indexPage: number, countBlog: number): Observable<Blog[]> {

    const blogList = this.getDataFilter(categoryId, username, approve).sort((a: Blog, b: Blog) => {
      return b.id - a.id;
    });

    if (blogList.length === 0) {
      return of([]);
    }

    // xu ly du lieu phan trang
    const begin = (indexPage - 1) * countBlog;
    const end = (indexPage * countBlog);

    return of(blogList.slice(begin, end));
  }

  getCountPage(categoryId: number, username: string, approve: number, indexPage: number, countBlog: number): number {

    const blogList = this.getDataFilter(categoryId, username, approve);

    return Math.ceil(blogList.length / countBlog);

  }

  getDataFilter(categoryId: number, username: string, approve: number): Blog[] {
    this.getDataAll();

    // xu ly loc theo 3 gia tri
    const us = null;
    if (JSON.parse(localStorage.getItem('login'))) {
      // @ts-ignore
      us = JSON.parse(localStorage.getItem('login'))[0].username;
    }

    const blogList = JSON.parse(localStorage.getItem('blogs')).filter(blog => blog.status > 0 || blog.userCreate === us);

    if (+categoryId !== 0) {
      // @ts-ignore
      blogList = blogList.filter(blog => blog.categoryId === +categoryId);
    }
    if (+username !== 0) {
      // @ts-ignore
      blogList = blogList.filter(blog => blog.userCreate === username);
    }
    if (+approve !== 0) {
      // @ts-ignore
      blogList = blogList.filter(blog => blog.approve === +approve);
    }

    return blogList;
  }

  // them
  onAdd(blog: Blog): void {

    this.blogs = JSON.parse(localStorage.getItem('blogs'));
    blog.id = this.blogs[this.blogs.length - 1].id + 1;

    this.blogs.push(blog);

    JSON.stringify(localStorage.setItem('blogs', JSON.stringify(this.blogs)));
  }

  // sua
  onEdit(blog: Blog): void {
    this.blogs = JSON.parse(localStorage.getItem('blogs'));

    for (let i = 0; i < this.blogs.length; i++) {
      if (this.blogs[i].id === blog.id) {
        this.blogs[i] = blog;
      }
    }
    JSON.stringify(localStorage.setItem('blogs', JSON.stringify(this.blogs)));
  }

  // xoa
  onDelete(id: number): void {
    this.blogs = JSON.parse(localStorage.getItem('blogs'));

    const blogIndex = this.blogs.findIndex(u => u.id === +id);

    this.blogs.splice(blogIndex, 1);

    localStorage.setItem('blogs', JSON.stringify(this.blogs));
  }


  searchLikeTitle(str: string): Observable<Blog[]> {
    if (!str) {
      return of(faceBlog);
    }
    return of(faceBlog.filter(blog => blog.title === str));
  }

}
