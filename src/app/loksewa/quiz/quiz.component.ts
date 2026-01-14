import {Component, HostListener, OnDestroy} from '@angular/core';
import {Question, QuizService} from "../service/quiz.service";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-quiz',
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './quiz.component.html',
  styleUrl: './quiz.component.css',
})
export class QuizComponent implements OnDestroy{

  questions: Question[] = [];
  answers: UserAnswer[] = [];

  currentIndex = 0;
  selectedOption: number | null = null;
  score = 0;

  quizFinished = false;
  showReview = false;

  timeLeft = 15;
  timer: any;
  showAnswer = false;

  constructor(private quizService: QuizService) {
    this.questions = this.quizService.getQuestions();

    this.answers = this.questions.map(q => ({
      question: q.question,
      options: q.options,
      correctAnswer: q.correctAnswer,
      selectedAnswer: null
    }));

    this.startTimer();
  }

  startTimer() {
    clearInterval(this.timer);
    this.timeLeft = 15;
    this.isTimeWarning = false;

    this.timer = setInterval(() => {
      this.timeLeft--;

      if (this.timeLeft <= 5) {
        this.isTimeWarning = true;
      }

      if (this.timeLeft === 0) {
        this.autoNext();
      }
    }, 1000);
  }


  selectOption(index: number) {
    if (this.showAnswer) return;

    this.selectedOption = index;
    this.answers[this.currentIndex].selectedAnswer = index;
    this.showAnswer = true;

    clearInterval(this.timer);

    if (index === this.questions[this.currentIndex].correctAnswer) {
      this.score += 1;          // correct
    } else {
      this.score -= 0.25;       // negative marking
    }

    setTimeout(() => this.nextQuestion(), 2000);
  }


  autoNext() {
    this.showAnswer = true;
    setTimeout(() => this.nextQuestion(), 1000);
  }

  nextQuestion() {
    this.selectedOption = null;
    this.showAnswer = false;
    this.currentIndex++;

    if (this.currentIndex >= this.questions.length) {
      this.quizFinished = true;
      clearInterval(this.timer);
      return;
    }

    this.startTimer();
  }

  showReviewPage() {
    this.showReview = true;
  }

  restartQuiz() {
    this.currentIndex = 0;
    this.score = 0;
    this.quizFinished = false;
    this.showReview = false;
    this.selectedOption = null;
    this.showAnswer = false;

    this.answers.forEach(a => a.selectedAnswer = null);
    this.startTimer();
  }

  get percentage(): number {
    const maxScore = this.questions.length;
    return Math.max(0, Math.round((this.score / maxScore) * 100));
  }


  get progress(): number {
    const total = this.questions.length;
    const answered = Math.min(this.currentIndex, total);
    return Math.round((answered / total) * 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    const header = document.querySelector('.quiz-header');
    if (window.scrollY > 20) {
      header?.classList.add('scrolled');
    } else {
      header?.classList.remove('scrolled');
    }
  }

  ngOnDestroy() {
    clearInterval(this.timer);
  }

  isTimeWarning = false;

}
interface UserAnswer {
  question: string;
  options: string[];
  correctAnswer: number;
  selectedAnswer: number | null;
}
