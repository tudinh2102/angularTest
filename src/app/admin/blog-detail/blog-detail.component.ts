import {Component, OnInit} from '@angular/core';
import {Category} from '../../../models/category';
import {CategoryService} from '../../category.service';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {BlogService} from '../../blog.service';
import {Blog} from '../../../models/blog';
import {AngularEditorConfig} from '@kolkov/angular-editor';

@Component({
  selector: 'app-blog-detail',
  templateUrl: './blog-detail.component.html',
  styleUrls: ['./blog-detail.component.scss']
})
export class BlogDetailComponent implements OnInit {

  roleUser = JSON.parse(localStorage.getItem('login'))[0].role;
  id: number;
  title: string;
  categorys: Category[];
  blog: Blog;
  blogForm: FormGroup;

  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '25rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    uploadUrl: 'v1/images', // if needed
    customClasses: [ // optional
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(
    private categoryService: CategoryService,
    private route: ActivatedRoute,
    private blogService: BlogService,
    private fb: FormBuilder,
  ) {
  }

  getCategorysByService(): void {
    this.categoryService.getCategoryList().subscribe((cates) => this.categorys = cates);
  }

  ngOnInit() {
    this.getCategorysByService();
    this.getBlogFormRoute();

    if (this.id === 0) { // them
      this.blogForm = this.fb.group({
        categoryId: this.fb.control(0, [Validators.required]),
        id: this.fb.control(0, [Validators.required]),
        title: this.fb.control('', [Validators.required]),
        describe: this.fb.control('', [Validators.required]),
        body: this.fb.control('', [Validators.required]),
        status: this.fb.control(0, [Validators.required]),
        timeApprover: this.fb.control('', [Validators.required]),
        timeCreate: this.fb.control('', [Validators.required]),
        userCreate: this.fb.control('', [Validators.required]),
        timeUpdate: this.fb.control('', [Validators.required]),
        userUpdate: this.fb.control('', [Validators.required]),
        view: this.fb.control(0, [Validators.required]),
        image: this.fb.control('', [Validators.required]),
      });
    } else {
      this.blogForm = this.fb.group({
        categoryId: this.fb.control(+this.blog.categoryId, [Validators.required]),
        id: this.fb.control(+this.blog.id, [Validators.required]),
        title: this.fb.control(this.blog.title, [Validators.required]),
        describe: this.fb.control(this.blog.describe, [Validators.required]),
        body: this.fb.control(this.blog.body, [Validators.required]),
        status: this.fb.control(+this.blog.status, [Validators.required]),
        timeApprover: this.fb.control(this.blog.timeApprover, [Validators.required]),
        timeCreate: this.fb.control(this.blog.timeCreate, [Validators.required]),
        userCreate: this.fb.control(this.blog.userCreate, [Validators.required]),
        timeUpdate: this.fb.control(this.blog.timeUpdate, [Validators.required]),
        userUpdate: this.fb.control(this.blog.userUpdate, [Validators.required]),
        view: this.fb.control(+this.blog.view, [Validators.required]),
        image: this.fb.control(this.blog.image, [Validators.required]),
      });
      document.getElementById('imga').setAttribute('src', this.blog.image);
    }
  }

  onSubmit(): void {

    const blog = new Blog();

    if (this.id === 0) { // them
      // @ts-ignore
      blog = this.loadDataForm();
      blog.userCreate = JSON.parse(localStorage.getItem('login'))[0].username;
      blog.timeCreate = new Date();

      this.blogService.onAdd(blog);
      alert('them thanh cong');
      location.replace('/admin/blog/0');
    } else { // sua
      // @ts-ignore
      blog = this.loadDataForm();
      blog.userUpdate = JSON.parse(localStorage.getItem('login'))[0].username;
      blog.timeUpdate = new Date();

      this.blogService.onEdit(blog);
      alert('sua thanh cong');
      location.replace('/admin');
    }
  }

  loadDataForm(): Blog {
    const blog = new Blog();

    blog.categoryId = +this.blogForm.value['categoryId'];
    blog.id = +this.blogForm.value['id'];
    blog.title = this.blogForm.value['title'];
    blog.describe = this.blogForm.value['describe'];
    blog.body = this.blogForm.value['body'];
    blog.status = +this.blogForm.value['status'];
    blog.timeApprover = this.blogForm.value['timeApprover'];
    blog.timeCreate = this.blogForm.value['timeCreate'];
    blog.userCreate = this.blogForm.value['userCreate'];
    blog.timeUpdate = this.blogForm.value['timeUpdate'];
    blog.userUpdate = this.blogForm.value['userUpdate'];
    blog.view = +this.blogForm.value['view'];
    blog.image = this.blogForm.value['image'];

    return blog;
  }


  setImg(link) {

    // http://thuthuatphanmem.vn/uploads/2018/09/11/hinh-anh-dep-10_044127763.jpg
    document.getElementById('imga').setAttribute('src', link);
  }

  getBlogFormRoute(): void {
    this.id = +this.route.snapshot.paramMap.get('id'); // + chuyển string thành số
    console.log(`+this.route.snapshot.paramMap.get('id') = ${JSON.stringify(+this.route.snapshot.paramMap.get('id'))}`);

    if (this.id === 0) { // them
      this.title = 'new Blog';
    } else {
      this.title = 'Edit Blog';
      this.blogService.getBlogById(this.id).subscribe(value => this.blog = value[0]);

      // loi
      if (!this.blog) {
        alert('Mã không hợ lệ!');
        location.replace('/admin');
      }
    }
  }

}
