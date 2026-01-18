import {Component} from '@angular/core';


import {NgForOf, NgIf} from "@angular/common";

import {Router} from "@angular/router";

@Component({
    selector: 'app-cv',
    imports: [


        NgForOf,

        NgIf
    ],
    templateUrl: './cv.component.html',
    styleUrl: './cv.component.css',
})
export class CvComponent {

    constructor(protected router: Router) {
    }


    templates: CVTemplate[] = [
        {id: 1, name: 'Modern Blue', previewImage: '/images/logo/cv1.png'},
        {id: 2, name: 'Classic Grey', previewImage: '/images/logo/cv2.png'},
        {id: 3, name: 'Minimal White', previewImage: '/images/logo/cv3.png '},
    ];

    selectedTemplate: number | null = null;
    hoveredTemplate: number | null = null;

    selectTemplate(id: number) {
        this.selectedTemplate = id;
    }

    hoverTemplate(id: number | null) {
        this.hoveredTemplate = id;
    }

    getPreviewImage() {
        const template = this.templates.find(t => t.id === (this.hoveredTemplate || this.selectedTemplate));
        return template ? template.previewImage : '';
    }

    confirmSelection() {
        if (this.selectedTemplate !== null) {
            this.router.navigate([`cv-generator/${this.selectedTemplate}`])
        }
    }
}

interface CVTemplate {
    id: number;
    name: string;
    previewImage: string; // small preview image of template
}