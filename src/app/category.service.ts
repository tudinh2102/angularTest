import {Injectable} from '@angular/core';
import {Category} from '../models/category';
import {Observable, of} from 'rxjs';
import {fakeCategory} from '../models/fake-category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  getCategoryList(): Observable<Category[]> {
    return of(fakeCategory);
  }

  getCategoryById(id: number): Observable<Category> {

    return of(fakeCategory.find(cate => cate.id === id));
  }

  constructor() {
  }
}
