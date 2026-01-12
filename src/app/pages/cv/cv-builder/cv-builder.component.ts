import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'app-cv-builder',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf
  ],
  templateUrl: './cv-builder.component.html',
  styleUrl: './cv-builder.component.css',
})
export class CvBuilderComponent implements OnInit{

  cvForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.cvForm = this.fb.group({
      name: ['Himal Rai'],
      title: ['Senior Software Engineer'],
      email: ['himal.rai@example.com'],
      phone: ['+977 9841234567'],
      location: ['Kathmandu, Nepal'],
      website: ['https://himalportfolio.com'],
      about: [''],

      skills: this.fb.array([
        this.fb.control('Java'),
        this.fb.control('Spring Boot'),
        this.fb.control('Angular')
      ]),

      experience: this.fb.array([this.experienceGroup()]),
      education: this.fb.array([this.educationGroup()]),
      projects: this.fb.array([this.projectGroup()]),

      additional: this.fb.group({
        languages: ['English, Nepali, Hindi'],
        hobbies: ['Reading, Coding, Traveling, Chess'],
        certifications: ['AWS Certified Developer'],
        linkedin: ['https://linkedin.com/in/himalrai'],
        github: ['https://github.com/himalrai']
      })
    });
  }

  // ----- Form Groups -----
  experienceGroup(): FormGroup {
    return this.fb.group({
      role: [''],
      company: [''],
      duration: [''],
      description: ['']
    });
  }

  educationGroup(): FormGroup {
    return this.fb.group({
      degree: [''],
      institute: [''],
      duration: [''],
      description: ['']
    });
  }

  projectGroup(): FormGroup {
    return this.fb.group({
      name: [''],
      tech: [''],
      link: [''],
      description: ['']
    });
  }

  // ----- Getters -----
  get skills() { return this.cvForm.get('skills') as FormArray; }
  get experience() { return this.cvForm.get('experience') as FormArray; }
  get education() { return this.cvForm.get('education') as FormArray; }
  get projects() { return this.cvForm.get('projects') as FormArray; }

  // ----- Add Methods -----
  addSkill() { this.skills.push(this.fb.control('')); }
  addExperience() { this.experience.push(this.experienceGroup()); }
  addEducation() { this.education.push(this.educationGroup()); }
  addProject() { this.projects.push(this.projectGroup()); }

// Collapsed state for each section
  collapsed = {
    skills: false,
    languages: false,
    hobbies: false,
    certifications: false,
    social: false
  };

// Toggle function
  toggleSection(section: string) {
    // @ts-ignore
    this.collapsed[section] = !this.collapsed[section];
  }

  captureScreenshot() {
    const cvElement = document.querySelector('.cv-preview') as HTMLElement;
    if (!cvElement) return;

    html2canvas(cvElement, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      // Open in new tab (optional)
      const w = window.open('');
      if (w) w.document.write('<img src="' + imgData + '"/>');
    });
  }

  // Download PDF
  downloadPDF() {
    const cvElement = document.querySelector('.cv-preview') as HTMLElement;
    if (!cvElement) return;

    // Capture the CV as canvas
    html2canvas(cvElement, { scale: 2 }).then(canvas => {
      const imgData = canvas.toDataURL('image/png');

      const pdf = new jsPDF('p', 'mm', 'a4'); // Portrait A4
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      // Canvas dimensions
      const imgProps = pdf.getImageProperties(imgData);
      const imgWidth = pdfWidth;
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      // Add first page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pdfHeight;

      // Add more pages if content exceeds one page
      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save('my-cv.pdf');
    });
  }

}
