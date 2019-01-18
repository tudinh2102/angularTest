import {Component, OnInit} from '@angular/core';
import {Blog} from '../../../models/blog';
import {CategoryService} from '../../category.service';
import {BlogService} from '../../blog.service';
import {Category} from '../../../models/category';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: [
    './blog-list.component.scss'
  ],
})
export class BlogListComponent implements OnInit {

  categorys: Category[];
  blogs: Blog[];
  search = '';

  constructor(
    private categoryService: CategoryService,
    private blogService: BlogService
  ) {
  }

  ngOnInit() {
    this.getCategorysFromService();
    this.getBlogsFromService();
  }

  onChange(categor: number) {
    if (+categor === 0) {
      this.getBlogsFromService();
    } else {
      this.blogService.getListBlogBycategoryId(categor).subscribe(cates => this.blogs = cates);
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
    this.blogService.getListBlog().subscribe((blogs => this.blogs = blogs));
  }

}
