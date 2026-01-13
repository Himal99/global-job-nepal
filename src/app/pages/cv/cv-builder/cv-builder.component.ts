import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {NgClass, NgForOf, NgIf} from "@angular/common";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

@Component({
  selector: 'app-cv-builder',
  imports: [
    NgForOf,
    ReactiveFormsModule,
    NgIf,
    NgClass
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

    this.calculateCompletion();
    this.cvForm.valueChanges.subscribe(() => {
      this.calculateCompletion();
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
  saveCV() {
    // Example: save CV data to localStorage
    const cvData = this.cvForm.value;
    localStorage.setItem('myCV', JSON.stringify(cvData));
    alert('CV saved locally!');
  }
  previewCV() {
    // Get the CV preview HTML
    const cvPreview = document.querySelector('.cv-preview') as HTMLElement;
    if (!cvPreview) return;

    // Open new tab/window
    const previewWindow = window.open('', '_blank');
    if (!previewWindow) return;

    // Write the HTML and include current styles
    const styles = Array.from(document.querySelectorAll('style, link[rel="stylesheet"]'))
        .map(el => el.outerHTML)
        .join('');

    previewWindow.document.write(`
    <html>
      <head>
        <title>CV Preview</title>
        ${styles}
      </head>
      <body>
        ${cvPreview.outerHTML}
      </body>
    </html>
  `);

    previewWindow.document.close();
  }
  async shareCV() {
    const cv = document.querySelector('.cv-preview') as HTMLElement;
    if (!cv) return;

    const canvas = await html2canvas(cv);
    const imgData = canvas.toDataURL('image/png');

    // Convert canvas to blob for Web Share API
    const blob = await (await fetch(imgData)).blob();
    const filesArray = [new File([blob], 'CV.pdf', { type: 'application/pdf' })];

    // Define a hosted CV URL for copy/share fallback
    const hostedCVUrl = `https://mycvapp.com/view?user=123`;

    if (navigator.canShare && navigator.canShare({ files: filesArray })) {
      // Mobile/Web Share API
      navigator.share({
        title: 'My CV',
        files: filesArray,
        text: 'Check out my CV!'
      })
          .then(() => console.log('Shared successfully'))
          .catch(err => console.error('Share failed', err));
    } else if (navigator.clipboard) {
      // Fallback for desktop: copy hosted link
      navigator.clipboard.writeText(hostedCVUrl)
          .then(() => alert('CV link copied to clipboard!'))
          .catch(() => {
            // If clipboard fails, fallback to download PDF
            this.downloadPDF();
            alert('Unable to copy link. CV PDF downloaded instead.');
          });
    } else {
      // Final fallback: download PDF
      this.downloadPDF();
      alert('Sharing not supported. CV PDF downloaded.');
    }
  }
  copyLink() {
    // Your hosted CV link (replace with dynamic user ID if needed)
    const cvLink = 'https://mycvapp.com/view?user=123';

    if (navigator.clipboard && window.isSecureContext) {
      // Modern secure browsers
      navigator.clipboard.writeText(cvLink)
          .then(() => alert('CV link copied to clipboard!'))
          .catch(() => alert('Failed to copy CV link.'));
    } else {
      // Fallback for insecure context or older browsers
      const textArea = document.createElement('textarea');
      textArea.value = cvLink;
      // Avoid scrolling to bottom
      textArea.style.position = 'fixed';
      textArea.style.top = '0';
      textArea.style.left = '0';
      textArea.style.width = '1px';
      textArea.style.height = '1px';
      textArea.style.padding = '0';
      textArea.style.border = 'none';
      textArea.style.outline = 'none';
      textArea.style.boxShadow = 'none';
      textArea.style.background = 'transparent';
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        const successful = document.execCommand('copy');
        alert(successful ? 'CV link copied to clipboard!' : 'Failed to copy CV link.');
      } catch (err) {
        alert('Failed to copy CV link.');
      }

      document.body.removeChild(textArea);
    }
  }
  calculateCompletion() {
    let total = 0;
    let filled = 0;

    const count = (v: any) => {
      total++;
      if (v && v.toString().trim().length > 0) filled++;
    };

    const v = this.cvForm.value;

    // Personal
    count(v.name);
    count(v.title);
    count(v.email);
    count(v.phone);
    count(v.location);
    count(v.website);
    count(v.about);

    // Skills
    v.skills?.forEach((s: string) => count(s));

    // Experience
    v.experience?.forEach((e: any) => {
      count(e.role);
      count(e.company);
      count(e.duration);
      count(e.description);
    });

    // Education
    v.education?.forEach((e: any) => {
      count(e.degree);
      count(e.institute);
      count(e.duration);
      count(e.description);
    });

    // Projects
    v.projects?.forEach((p: any) => {
      count(p.name);
      count(p.tech);
      count(p.description);
      count(p.link);
    });

    // Additional
    count(v.additional?.languages);
    count(v.additional?.hobbies);
    count(v.additional?.certifications);
    count(v.additional?.linkedin);
    count(v.additional?.github);

    this.completionPercentage = Math.round((filled / total) * 100);

    // COLOR LOGIC
    if (this.completionPercentage < 40) this.progressColor = 'low';
    else if (this.completionPercentage < 75) this.progressColor = 'medium';
    else this.progressColor = 'high';
    this.completionPercentage = Math.round((filled / total) * 100);

    if (this.completionPercentage < 40) this.progressColor = 'low';
    else if (this.completionPercentage < 75) this.progressColor = 'medium';
    else this.progressColor = 'high';

    this.isCompleted = this.completionPercentage === 100;
    this.canDownloadPdf = this.completionPercentage >= 70;

  }
  progressColor = 'low';
  completionPercentage = 0;
  missingSuggestions: string[] = [];
  isCompleted = false;
  canDownloadPdf = false;
  lastSaved: string | null = null;

  saveProgress(showAlert = true) {
    const cvData = this.cvForm.value;
    localStorage.setItem('cvProgress', JSON.stringify(cvData));

    // Update last saved time
    const now = new Date();
    this.lastSaved = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });


  }


  resetCV() {
    // Optional: Confirm reset
    const confirmReset = confirm('Are you sure you want to reset all fields? This cannot be undone.');
    if (!confirmReset) return;

    // Reset form to initial empty/default values
    this.cvForm.reset({
      name: '',
      title: '',
      email: '',
      phone: '',
      location: '',
      website: '',
      about: '',
      skills: [],
      experience: [],
      education: [],
      projects: [],
      additional: {
        languages: '',
        hobbies: '',
        certifications: '',
        linkedin: '',
        github: ''
      }
    });

    // Clear form arrays manually
    this.clearFormArray(this.skills);
    this.clearFormArray(this.experience);
    this.clearFormArray(this.education);
    this.clearFormArray(this.projects);

    // Reset progress
    this.calculateCompletion();
    this.lastSaved = null;

    // Remove saved progress from localStorage
    localStorage.removeItem('cvProgress');
  }

// Utility to clear FormArray
  clearFormArray(formArray: any) {
    while (formArray.length !== 0) {
      formArray.removeAt(0);
    }
  }
  resetSection(section: string) {

    switch(section) {
      case 'skills':
        this.clearFormArray(this.skills);
        break;
      case 'experience':
        this.clearFormArray(this.experience);
        break;
      case 'education':
        this.clearFormArray(this.education);
        break;
      case 'projects':
        this.clearFormArray(this.projects);
        break;
      case 'additional':
        this.cvForm.get('additional')?.reset({
          languages: '',
          hobbies: '',
          certifications: '',
          linkedin: '',
          github: ''
        });
        break;
    }

    this.calculateCompletion();
    this.lastSaved = null;
  }

}
