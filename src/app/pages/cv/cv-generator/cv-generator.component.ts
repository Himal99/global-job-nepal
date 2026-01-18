import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

import {CvBuilderComponent} from "../cv-builder/cv-builder.component";

@Component({
    selector: 'app-cv-generator',
    imports: [

        CvBuilderComponent
    ],
    templateUrl: './cv-generator.component.html',
    styleUrl: './cv-generator.component.css',
})
export class CvGeneratorComponent implements OnInit {
    constructor(protected activatedRoute: ActivatedRoute) {
    }

    id: any;

    ngOnInit(): void {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(this.id)
    }


}
