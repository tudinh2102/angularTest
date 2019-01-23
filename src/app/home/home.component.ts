import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {BlogService} from '../blog.service';
import {Blog} from '../../models/blog';
import {fakeUser} from '../../models/fake-user';
import {CategoryService} from '../category.service';
import {Category} from '../../models/category';
import {ActivatedRoute} from '@angular/router';
import {FilterPipe} from 'ngx-filter-pipe';
import {TranslateService} from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  setup = {
    'title:': '',
    'dateFormat': '',
    'countBlog': 0
  };
  indexPage: number;
  countBlog: number;
  countPage: number[];
  blogs: Blog[];
  categorys: Category[];
  search: '';

  categoryId = 0;
  username = '0';
  home = 1;

  constructor(
    private userService: UserService,
    private blogService: BlogService,
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private filterPipe: FilterPipe,
    private translate: TranslateService
  ) {
    translate.setDefaultLang('vie');
  }

  ngOnInit() {
    // localStorage.removeItem('users');
    // localStorage.removeItem('blogs');
    // localStorage.removeItem('setup');

    // xoa doi tuọng preview
    localStorage.removeItem('previewBlog');

    if (!localStorage.getItem('setup')) {
      const setup = {
        'title': 'Trang Blog',
        'dateFormat': 'dd/MM/yyyy',
        'countBlog': 10,
      };
      localStorage.setItem('setup', JSON.stringify(setup));
    }

    this.setup = JSON.parse(localStorage.getItem('setup'));
    this.countBlog = this.setup.countBlog;

    console.log(this.countBlog);

    console.log('userLogin: ');
    console.log(JSON.parse(localStorage.getItem('login')));
    console.log('userList: ');
    console.log(JSON.parse(localStorage.getItem('users')));
    console.log('blogList: ');
    console.log(JSON.parse(localStorage.getItem('blogs')));
    console.log('setup: ');
    console.log(JSON.parse(localStorage.getItem('setup')));

    console.log('-------------');

    this.route.params.subscribe(
      params => {
        this.getBlogFormRoute();
        this.getData();
        this.load();
        this.categoryService.getCategoryList().subscribe(cates => this.categorys = cates);
      }
    );
  }

  switchLanguage(language: string) {
    this.translate.use(language);
  }

  // nếu local chưa có data thì get từ fake
  getData(): void {
    if (!localStorage.getItem('users')) {
      localStorage.setItem('users', JSON.stringify(fakeUser));
    }
  }

  load(): void {
    this.blogService.getData(+this.categoryId, this.username, 1, this.indexPage, this.countBlog)
      .subscribe(blogs => this.blogs = blogs);

    this.getPage();
  }


  getPage(): void {
    this.countPage = [];
    for (let i = 1; i <= this.blogService.getCountPage(+this.categoryId, this.username, 1, this.indexPage, this.countBlog); i++) {
      this.countPage.push(i);
    }
  }

  //

  getCategoryById(id: number): Category {
    return this.categorys.find(cate => cate.id === id);
  }

  getBlogFormRoute(): void {
    this.indexPage = +this.route.snapshot.paramMap.get('p'); // + chuyển string thành số
    if (!this.indexPage || this.indexPage < 0) {
      this.indexPage = 1;
    }

    if (this.route.snapshot.url[0].path === 'category-blog') {
      this.categoryId = +this.route.snapshot.url[1].path;
      this.username = '0';
      this.home = 0;
      console.log('categoryId: ' + this.categoryId);
    }

    if (this.route.snapshot.url[0].path === 'author-blog') {
      this.username = this.route.snapshot.url[1].path;
      this.categoryId = 0;
      this.home = 0;
      console.log('author: ' + this.username);
    }
  }

  onSearch(search: string): void {
    console.log(search);

    if (!search) {
      this.load();
    } else {
      this.blogs = JSON.parse(localStorage.getItem('blogs'));
      this.blogs = this.filterPipe.transform(this.blogs, {title: '' + search});
      this.countPage = [1];
    }
  }

}
