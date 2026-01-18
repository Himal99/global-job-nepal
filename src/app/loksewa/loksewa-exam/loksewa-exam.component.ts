import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CKEditorModule} from "@ckeditor/ckeditor5-angular";
import Editor from "@ckeditor/ckeditor5-build-classic";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

@Component({
  selector: 'app-loksewa-exam',
  standalone: true,
  imports: [CommonModule, FormsModule, CKEditorModule, ReactiveFormsModule],
  templateUrl: './loksewa-exam.component.html',
  styleUrls: ['./loksewa-exam.component.css']
})
export class LoksewaExamComponent implements OnInit, OnDestroy {
  public editorConfig: any = {
    placeholder: `Write your answer here.
यहाँ उत्तर लेख्नुहोस्...`
  };

  Editor: any= ClassicEditor;
  questions = [
    {
      marks: 10,
      en: 'Define public administration and explain its importance in modern governance.',
      np: 'सार्वजनिक प्रशासनको परिभाषा दिनुहोस् र आधुनिक शासन व्यवस्थामा यसको महत्त्व स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Discuss the role of civil servants in implementing government policies.',
      np: 'सरकारी नीतिहरू कार्यान्वयन गर्न नागरिक सेवकहरूको भूमिकाबारे छलफल गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Explain the concept of good governance with suitable examples.',
      np: 'उचित उदाहरणसहित सुशासनको अवधारणा स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Describe the principles of public service delivery.',
      np: 'सार्वजनिक सेवा प्रवाहका सिद्धान्तहरू वर्णन गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'What is accountability? Explain its significance in public administration.',
      np: 'उत्तरदायित्व भनेको के हो? सार्वजनिक प्रशासनमा यसको महत्त्व स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Explain transparency and its role in preventing corruption.',
      np: 'पारदर्शिता के हो? भ्रष्टाचार न्यूनीकरणमा यसको भूमिका स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Discuss the relationship between bureaucracy and democracy.',
      np: 'नौकरशाही र लोकतन्त्रबीचको सम्बन्धबारे छलफल गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Define leadership and explain its importance in public organizations.',
      np: 'नेतृत्वको परिभाषा दिनुहोस् र सार्वजनिक संस्थाहरूमा यसको महत्त्व स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Explain the concept of decentralization in governance.',
      np: 'शासन व्यवस्थामा विकेन्द्रीकरणको अवधारणा स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'What is policy formulation? Describe its major stages.',
      np: 'नीति निर्माण भनेको के हो? यसको मुख्य चरणहरू वर्णन गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Explain the role of ethics in public administration.',
      np: 'सार्वजनिक प्रशासनमा नैतिकताको भूमिका स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Describe the functions of the Public Service Commission.',
      np: 'लोक सेवा आयोगका कार्यहरू वर्णन गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'What is e-governance? Explain its benefits.',
      np: 'ई-शासन भनेको के हो? यसको फाइदाहरू स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Discuss the challenges of public administration in Nepal.',
      np: 'नेपालमा सार्वजनिक प्रशासनका चुनौतीहरूबारे छलफल गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Explain performance management in public organizations.',
      np: 'सार्वजनिक संस्थाहरूमा कार्यसम्पादन व्यवस्थापन स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'What is federalism? Explain its administrative implications.',
      np: 'संघीयता भनेको के हो? यसको प्रशासनिक प्रभाव स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Discuss the importance of human resource management in public service.',
      np: 'सार्वजनिक सेवामा मानव संसाधन व्यवस्थापनको महत्त्वबारे छलफल गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Explain the concept of service-oriented administration.',
      np: 'सेवामुखी प्रशासनको अवधारणा स्पष्ट गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'What is planning? Describe its role in national development.',
      np: 'योजना भनेको के हो? राष्ट्रिय विकासमा यसको भूमिका वर्णन गर्नुहोस्।'
    },
    {
      marks: 10,
      en: 'Discuss the role of information technology in public administration.',
      np: 'सार्वजनिक प्रशासनमा सूचना प्रविधिको भूमिकाबारे छलफल गर्नुहोस्।'
    }
  ];

  answers: string[] = new Array(this.questions.length).fill('');
  wordCounts: number[] = new Array(this.questions.length).fill(0);

  timeLeft = 2 * 60 * 60;
  timerText = '02:00:00';
  intervalId: any;

  darkMode = false;


  ngOnInit() {
    this.answers = new Array(this.questions.length).fill('');
    this.wordCounts = new Array(this.questions.length).fill(0);
    this.darkMode = localStorage.getItem('dark') === 'true';

    this.answers.forEach((_, i) => {
      const saved = localStorage.getItem('answer' + i);
      if (saved) {
        this.answers[i] = saved;
        this.updateWordCount(i);
      }
    });

    this.intervalId = setInterval(() => this.updateTimer(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  updateTimer() {
    if (this.timeLeft <= 0) return;
    this.timeLeft--;

    const h = String(Math.floor(this.timeLeft / 3600)).padStart(2, '0');
    const m = String(Math.floor((this.timeLeft % 3600) / 60)).padStart(2, '0');
    const s = String(this.timeLeft % 60).padStart(2, '0');

    this.timerText = `${h}:${m}:${s}`;
  }

  updateWordCount(index: number) {
    const words = this.answers[index]
        .trim()
        .split(/\s+/)
        .filter(w => w).length;

    this.wordCounts[index] = words;
    localStorage.setItem('answer' + index, this.answers[index]);
  }

  toggleDark() {
    this.darkMode = !this.darkMode;
    localStorage.setItem('dark', String(this.darkMode));
  }

}
