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

  getListBlog(indexPage: number, coutBlog: number): Observable<Blog[]> {
    // this.getDataAll();
    this.getDataAll();

    const blogList = null;
    const username = JSON.parse(localStorage.getItem('login'))[0].username;

    // xu ly dieu kien
    if (+JSON.parse(localStorage.getItem('login'))[0].role === 1) {
      // @ts-ignore
      blogList = JSON.parse(localStorage.getItem('blogs')).filter(blog => blog.status > 0 || blog.userCreate === username);
    } else {
      // @ts-ignore
      blogList = JSON.parse(localStorage.getItem('blogs')).filter(blog => blog.userCreate === username);
    }

    // phan trang
    const coutPage = blogList.length % coutBlog;
    if (blogList.length / coutBlog > coutPage) { // neu 1,1 > 1 -> co 2 page
      // @ts-ignore
      coutPage += 1;
    }
    if (indexPage > coutPage) {
      indexPage = coutPage;
    }
    const end = blogList.length - (indexPage - 1) * coutBlog;
    const begin = end - coutBlog;
    if (begin < 0) {
      // @ts-ignore
      begin = 0;
    }

    this.blogs = [];
    for (let i = begin; i < end; i++) {
      this.blogs.push(blogList[i]);
    }

    return of(this.blogs);
  }

  getBlogById(id: number): Observable<Blog> {
    return of(JSON.parse(localStorage.getItem('blogs')).filter(blog => blog.id === +id));
  }

  getListBlogBycategoryId(id: number): Observable<Blog[]> {
    return of(JSON.parse(localStorage.getItem('blogs')).filter(blog => blog.categoryId === +id && blog.status >= 1));
  }

  getListBlogByUser(username: string): Observable<Blog[]> {
    return of(JSON.parse(localStorage.getItem('blogs')).filter(blog => blog.userCreate === username && blog.status >= 1));
  }


  // nếu local chưa có data thì get từ fake
  getDataAll(): void {
    if (!localStorage.getItem('blogs')) {
      localStorage.setItem('blogs', JSON.stringify(faceBlog));
    }
  }

  // data trong phan trang
  getPage(coutBlog: number): number {

    const blogList = null;
    const username = JSON.parse(localStorage.getItem('login'))[0].username;

    // xu ly dieu kien
    if (+JSON.parse(localStorage.getItem('login'))[0].role === 1) {
      // @ts-ignore
      blogList = JSON.parse(localStorage.getItem('blogs')).filter(blog => blog.status > 0 || blog.userCreate === username);
    } else {
      // @ts-ignore
      blogList = JSON.parse(localStorage.getItem('blogs')).filter(blog => blog.userCreate === username);
    }

    // tong so trang
    const coutPage = blogList.length / coutBlog;
    if (blogList.length / coutBlog > blogList.length % coutBlog) { // neu 1,1 > 1 -> co 2 page
      // @ts-ignore
      coutPage += 1;
    }

    if (coutPage < 1) {
      // @ts-ignore
      coutPage = 1;
    }

    return coutPage;
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
