import {Component, OnInit} from '@angular/core';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
// import Editor from "@ckeditor/ckeditor5-build-classic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import {BlogService} from "../blog.service";
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {required} from "../../shared/components/auth/signin-form/signin-form.component";
@Component({
  selector: 'app-blog-dashboard',
  imports: [
    CKEditorModule,
    ReactiveFormsModule
  ],
  templateUrl: './blog-dashboard.component.html',
  styleUrl: './blog-dashboard.component.css',
})
export class BlogDashboardComponent implements OnInit{


  isOptionSelected=false;
  public editorConfig: any = {
    placeholder: `Write your blog here...`
  };

  Editor:any = ClassicEditor;
  form!: FormGroup;

  constructor(protected service: BlogService,protected formBuilder: FormBuilder,) {
  }

  ngOnInit(): void {
        this.buildForm();
    }

  buildForm(): void {
    this.form = this.formBuilder
        .group({
          title: [ undefined,[required]],
          content: undefined
        })
  }

  post(){
    this.service.post(this.form.value)
        .subscribe((rs: any)=>{

        })
  }
}
