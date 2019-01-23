import {Component, OnInit} from '@angular/core';
import {Blog} from '../../../models/blog';
import {CategoryService} from '../../category.service';
import {BlogService} from '../../blog.service';
import {Category} from '../../../models/category';
import {ActivatedRoute} from '@angular/router';
import {UserService} from '../../user.service';
import {User} from '../../../models/user';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: [
    './blog-list.component.scss'
  ],
})
export class BlogListComponent implements OnInit {

  role = JSON.parse(localStorage.getItem('login'))[0].role;

  indexPage: number;
  coutBlog = 10;
  countPage: number[];
  order = 'id';
  categorys: Category[];
  blogs: Blog[];
  users: User[];
  search = '';

  categoryId = 0;
  username = '0';
  approve = 0;

  constructor(
    private categoryService: CategoryService,
    private blogService: BlogService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {

    if (JSON.parse(localStorage.getItem('login'))[0].role > 1) {
      this.username = JSON.parse(localStorage.getItem('login'))[0].username;
    }

    this.getBlogFormRoute();

    this.getCategorysFromService();
    this.getBlogsFromService();
    this.getUsersFromService();
  }

  onChangeCategory(category: number) {
    this.categoryId = category;
    this.getBlogsFromService();
  }

  onChangeUser(username: string) {
    this.username = username;
    this.getBlogsFromService();
  }

  onChangeApprove(approve: number) {
    this.approve = approve;
    this.getBlogsFromService();
  }

  getBlogsFromService(): void {
    this.blogService.getData(this.categoryId, this.username, this.approve, this.indexPage, this.coutBlog)
      .subscribe(blogs => this.blogs = blogs);

    this.getPage();
  }

  getPage(): void {
    this.countPage = [];
    for (let i = 1; i <= this.blogService.getCountPage(this.categoryId, this.username, this.approve, this.indexPage, this.coutBlog); i++) {
      this.countPage.push(i);
    }
  }

  //

  getCategoryById(id: number): Category {
    return this.categorys.find(cate => cate.id === id);
  }

  //

  getCategorysFromService(): void {
    this.categoryService.getCategoryList().subscribe((cates) => this.categorys = cates);
  }

  getUsersFromService(): void {
    this.userService.getuserList().subscribe((users => this.users = users));
  }

  onDelete(id: number): void {
    this.blogService.onDelete(id);

    location.replace('admin');
  }

  getBlogFormRoute(): void {
    this.indexPage = +this.route.snapshot.paramMap.get('id'); // + chuyển string thành số
    if (!this.indexPage || this.indexPage < 0) {
      this.indexPage = 1;
    }

    console.log('page = ' + this.indexPage);
  }

  nextPage(indexPage: string): void {
    this.indexPage = +indexPage;

    this.getBlogsFromService();
  }

}
