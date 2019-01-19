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

  id: number;
  coutBlog = 10;
  countPage: number[];
  order = 'id';
  categorys: Category[];
  blogs: Blog[];
  users: User[];
  search = '';

  constructor(
    private categoryService: CategoryService,
    private blogService: BlogService,
    private userService: UserService,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit() {
    this.getBlogFormRoute();

    this.getCategorysFromService();
    this.getBlogsFromService();
    this.getUsersFromService();

    this.countPage = [];
    for (let i = 1; i <= this.blogService.getPage(this.coutBlog); i++) {
      this.countPage.push(i);
    }
  }

  onChangeCategory(categor: number) {
    if (+categor === 0) {
      this.getBlogsFromService();
    } else {
      this.blogService.getListBlogBycategoryId(categor).subscribe(blogs => this.blogs = blogs);
    }
  }

  onChangeUser(username: string) {
    if (+username === 0) {
      this.getBlogsFromService();
    } else {
      this.blogService.getListBlogByUser(username).subscribe(blogs => this.blogs = blogs);
    }
  }


  // onSearch(): void {
  //   console.log(this.search);
  //   this.blogService.searchLikeTitle(this.blogService.getListBlogBycategoryId(categor).
  //   subscribe(cates => this.blogs = cates);this.search).subscribe(blogs => this.blogs = blogs);
  // }

  getCategoryById(id: number): Category {
    return this.categorys.find(cate => cate.id === id);
  }

  getCategorysFromService(): void {
    this.categoryService.getCategoryList().subscribe((cates) => this.categorys = cates);
  }

  getBlogsFromService(): void {
    this.blogService.getListBlog(this.id, this.coutBlog).subscribe((blogs => this.blogs = blogs));
  }

  getUsersFromService(): void {
    this.userService.getuserList().subscribe((users => this.users = users));
  }

  onDelete(id: number): void {
    this.blogService.onDelete(id);

    location.replace('admin');
  }

  getBlogFormRoute(): void {
    this.id = +this.route.snapshot.paramMap.get('id'); // + chuyển string thành số
    if (!this.id || this.id < 0) {
      this.id = 1;
    }

    console.log('page = ' + this.id);
  }

}
