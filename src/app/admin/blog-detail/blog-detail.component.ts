import {Component, OnInit} from '@angular/core';
import {Category} from '../../../models/category';
import {CategoryService} from '../../category.service';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  categorys: Category[];
  img: string;

  constructor(private categoryService: CategoryService) {
  }

  getCategorysByService(): void {
    this.categoryService.getCategoryList().subscribe((cates) => this.categorys = cates);
  }

  ngOnInit() {
    this.getCategorysByService();
  }

  setImg(link) {

    // http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-10_044127763.jpg
    
    document.getElementById('imga').setAttribute('src', link);
  }

}
