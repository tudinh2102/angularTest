import {Component, OnInit} from '@angular/core';
import {CategoryService} from '../category.service';
import {Category} from '../../models/category';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categorys: Category[];

  constructor(private categoryService: CategoryService) {
  }

  ngOnInit() {
    this.getCategorysFromService();
  }

  getCategorysFromService(): void {
    this.categoryService.getCategoryList().subscribe((cates) => this.categorys = cates);
  }

}
