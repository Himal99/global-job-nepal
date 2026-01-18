import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-loksewa-mcq',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loksewa-mcq.component.html',
  styleUrls: ['./loksewa-mcq.component.css']
})
export class LoksewaMcqComponent implements OnInit, OnDestroy {

  timeLeft = 60 * 60; // 1 hour
  timerText = '01:00:00';
  interval: any;

  submitted = false;
  score = 0;
  negativeMark = 0.25;

  sections = [
    {
      name: 'Public Administration',
      questions: [
        {
          en: 'Which body conducts Loksewa examinations?',
          np: 'लोक सेवा परीक्षा कुन निकायले सञ्चालन गर्छ?',
          options: [
            { en: 'Ministry of Education', np: 'शिक्षा मन्त्रालय' },
            { en: 'Public Service Commission', np: 'लोक सेवा आयोग' },
            { en: 'Parliament', np: 'संसद' },
            { en: 'Supreme Court', np: 'सर्वोच्च अदालत' }
          ],
          correct: 1,
          selected: null
        },
        {
          en: 'What is good governance?',
          np: 'सुशासन भनेको के हो?',
          options: [
            { en: 'Rule by force', np: 'बल प्रयोग गरेर शासन' },
            { en: 'Transparent and accountable governance', np: 'पारदर्शी र उत्तरदायी शासन' },
            { en: 'Centralized power', np: 'केन्द्रीय शक्ति' },
            { en: 'Political control', np: 'राजनीतिक नियन्त्रण' }
          ],
          correct: 1,
          selected: null
        }
      ]
    },
    {
      name: 'General Knowledge',
      questions: [
        {
          en: 'Who is the head of government of Nepal?',
          np: 'नेपाल सरकारको प्रमुख को हो?',
          options: [
            { en: 'President', np: 'राष्ट्रपति' },
            { en: 'Prime Minister', np: 'प्रधानमन्त्री' },
            { en: 'Chief Justice', np: 'प्रधानन्यायाधीश' },
            { en: 'Speaker', np: 'सभामुख' }
          ],
          correct: 1,
          selected: null
        }
      ]
    }
  ];

  ngOnInit() {
    this.randomizeAll();

    this.sections.forEach((s, si) => {
      s.questions.forEach((q, qi) => {
        const saved = localStorage.getItem(`mcq_${si}_${qi}`);
        if (saved !== null) { // @ts-ignore
          q.selected = Number(saved);
        }
      });
    });

    this.interval = setInterval(() => this.tick(), 1000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  tick() {
    if (this.timeLeft <= 0) {
      this.submit();
      return;
    }
    this.timeLeft--;
    const h = String(Math.floor(this.timeLeft / 3600)).padStart(2, '0');
    const m = String(Math.floor((this.timeLeft % 3600) / 60)).padStart(2, '0');
    const s = String(this.timeLeft % 60).padStart(2, '0');
    this.timerText = `${h}:${m}:${s}`;
  }

  select(si: any, qi: any, oi: any) {
    this.sections[si].questions[qi].selected = oi;
    localStorage.setItem(`mcq_${si}_${qi}`, String(oi));
  }

  submit() {
    this.score = 0;
    this.sections.forEach(sec => {
      sec.questions.forEach(q => {
        if (q.selected === q.correct) this.score += 1;
        else if (q.selected !== null) this.score -= this.negativeMark;
      });
    });
    this.submitted = true;
    clearInterval(this.interval);
  }

  randomizeAll() {
    this.sections.forEach(sec => {
      sec.questions = this.shuffle(sec.questions);
      sec.questions.forEach(q => q.options = this.shuffle(q.options));
    });
  }

  shuffle(arr: any[]) {
    return arr.sort(() => Math.random() - 0.5);
  }
}
