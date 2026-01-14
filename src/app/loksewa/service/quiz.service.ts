import { Injectable } from '@angular/core';

export interface Question {
  question: string;
  options: string[];
  correctAnswer: number;
}

@Injectable({
  providedIn: 'root'
})
export class QuizService {

  getQuestions(): Question[] {
    return [
      {
        question: 'नेपालको राजधानी कुन हो?',
        options: ['पोखरा', 'ललितपुर', 'काठमाडौँ', 'भरतपुर'],
        correctAnswer: 2
      },
      {
        question: 'लोकसेवा आयोग कहिले स्थापना भएको हो?',
        options: ['२०१५', '२००७', '२०१९', '२०२८'],
        correctAnswer: 1
      },
      {
        question: 'नेपालको राष्ट्रिय फूल कुन हो?',
        options: ['लालीगुराँस', 'कमल', 'सुनाखरी', 'गुलाब'],
        correctAnswer: 0
      },
      {
        question: 'नेपालको सबैभन्दा अग्लो हिमाल कुन हो?',
        options: ['कञ्चनजङ्घा', 'धौलागिरी', 'सगरमाथा', 'मकालु'],
        correctAnswer: 2
      }
    ];
  }
}
