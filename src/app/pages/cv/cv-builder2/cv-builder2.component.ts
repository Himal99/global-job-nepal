import { Component } from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-cv-builder2',
  imports: [
    NgForOf,
    ReactiveFormsModule
  ],
  templateUrl: './cv-builder2.component.html',
  styleUrl: './cv-builder2.component.css',
})
export class CvBuilder2Component {
  cvForm!: FormGroup;
  selectedTemplate = 'blue';

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cvForm = this.fb.group({
      name: [''],
      title: [''],
      email: [''],
      phone: [''],
      location: [''],
      website: [''],
      about: [''],
      skills: this.fb.array(['Java', 'Spring Boot']),
      experience: this.fb.array([this.expGroup()]),
      education: this.fb.array([this.eduGroup()])
    });

    this.loadDraft();
  }

  expGroup() {
    return this.fb.group({
      role: [''],
      company: [''],
      duration: [''],
      description: ['']
    });
  }

  eduGroup() {
    return this.fb.group({
      degree: [''],
      institute: [''],
      duration: [''],
      description: ['']
    });
  }

  get skills() { return this.cvForm.get('skills') as FormArray; }
  get experience() { return this.cvForm.get('experience') as FormArray; }
  get education() { return this.cvForm.get('education') as FormArray; }

  addSkill() { this.skills.push(this.fb.control('')); }
  addExperience() { this.experience.push(this.expGroup()); }
  addEducation() { this.education.push(this.eduGroup()); }

  saveDraft() {
    localStorage.setItem('cv_draft', JSON.stringify(this.cvForm.value));
  }

  loadDraft() {
    const draft = localStorage.getItem('cv_draft');
    if (draft) this.cvForm.patchValue(JSON.parse(draft));
  }

  async downloadPDF() {
    const element = document.getElementById('cvPreview')!;
    const canvas = await html2canvas(element, { scale: 2 });
    const pdf = new jsPDF('p', 'mm', 'a4');
    const img = canvas.toDataURL('image/png');
    pdf.addImage(img, 'PNG', 0, 0, 210, 297);
    pdf.save('cv.pdf');
  }

  async takeScreenshot() {
    const element = document.getElementById('cvPreview')!;
    const canvas = await html2canvas(element, { scale: 2 });
    const link = document.createElement('a');
    link.download = 'cv.png';
    link.href = canvas.toDataURL();
    link.click();
  }
}
