import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-setup-website',
  templateUrl: './setup-website.component.html',
  styleUrls: ['./setup-website.component.scss']
})
export class SetupWebsiteComponent implements OnInit {

  setUpForm: FormGroup;
  setup = JSON.parse(localStorage.getItem('setup'));

  constructor(
    private  fb: FormBuilder,
  ) {
  }

  ngOnInit() {
    this.setUpForm = this.fb.group({
      title: this.fb.control(this.setup.title, [Validators.required]),
      dateFormat: this.fb.control(this.setup.dateFormat, [Validators.required]),
      countBlog: this.fb.control(this.setup.countBlog, [Validators.required]),
    });

    console.log(this.setup);
  }

  onSubmit(): void {
    const title = this.setUpForm.value['title'];
    const dateFormat = this.setUpForm.value['dateFormat'];
    const countBlog = +this.setUpForm.value['countBlog'];

    this.setup.title = title;
    this.setup.dateFormat = dateFormat;
    this.setup.countBlog = +countBlog;

    localStorage.setItem('setup', JSON.stringify(this.setup));

  }

}
