import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgForOf, NgIf} from "@angular/common";

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
}
