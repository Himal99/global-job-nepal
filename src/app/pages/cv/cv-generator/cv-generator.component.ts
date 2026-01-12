import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NgIf} from "@angular/common";
import {Vc1Component} from "../vc1/vc1.component";
import {Cv2Component} from "../cv2/cv2.component";
import {Cv3Component} from "../cv3/cv3.component";
import {CvBuilderComponent} from "../cv-builder/cv-builder.component";

@Component({
  selector: 'app-cv-generator',
  imports: [
    NgIf,
    Vc1Component,
    Cv2Component,
    Cv3Component,
    CvBuilderComponent
  ],
  templateUrl: './cv-generator.component.html',
  styleUrl: './cv-generator.component.css',
})
export class CvGeneratorComponent implements OnInit{
constructor(protected activatedRoute: ActivatedRoute) {
}
id: any;
  ngOnInit(): void {
this.id = this.activatedRoute.snapshot.paramMap.get('id');
    console.log(this.id )
    }


}
