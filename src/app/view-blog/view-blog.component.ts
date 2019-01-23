import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {CategoryService} from '../category.service';
import {BlogService} from '../blog.service';
import {ActivatedRoute} from '@angular/router';
import {Blog} from '../../models/blog';
import {Category} from '../../models/category';

@Component({
  selector: 'app-view-blog',
  templateUrl: './view-blog.component.html',
  styleUrls: ['./view-blog.component.scss']
})
export class ViewBlogComponent implements OnInit {

  idBlog: number;
  blog: Blog;
  categorys: Category[];

  constructor(
    private userService: UserService,
    private categoryService: CategoryService,
    private blogService: BlogService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.getBlogFormRoute();
    this.getBlogById(this.idBlog);
    this.categoryService.getCategoryList().subscribe(cates => this.categorys = cates);
    console.log(this.blog);
  }

  getBlogById(id: number): void {
    this.blog = JSON.parse(localStorage.getItem('previewBlog'));

    if (!this.blog) {
      this.blogService.getBlogById(id).subscribe(blog => this.blog = blog[0]);

      if (!this.blog) {
        alert('bai viet khong ton tai');
        location.replace('/');
      }
      if (this.blog.approve !== 1) {
        alert('bai viet chua duoc phep hien thi');
        location.replace('/');
      }

      // vao trang tang view
      this.blog.view += 1;
      // update
      this.blogService.onEdit(this.blog);
    }

  }

  getCategoryById(id: number): Category {
    return this.categorys.find(cate => cate.id === id);
  }

  getBlogFormRoute(): void {
    this.idBlog = +this.route.snapshot.paramMap.get('id'); // + chuyển string thành số
  }

}
