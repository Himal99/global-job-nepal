import { Component } from '@angular/core';
import {Router} from "@angular/router";
import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-profile-strength',
  imports: [],
  templateUrl: './profile-strength.component.html',
  styleUrl: './profile-strength.component.css',
  animations: [
    // Fade in/out for modal

    trigger('sequentialFade', [
      transition(':enter', [
        query(':self, h1, p, .actions button', [
          style({ opacity: 0, transform: 'translateY(-20px)' }),
          stagger(150, [
            animate('500ms cubic-bezier(0.68, -0.55, 0.27, 1.55)',
                style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('buttonHover', [
      state('normal', style({ transform: 'scale(1)', boxShadow: '0 2px 6px rgba(0,0,0,0.1)' })),
      state('hover', style({ transform: 'scale(1.05)', boxShadow: '0 4px 12px rgba(0,0,0,0.2)' })),
      transition('normal <=> hover', animate('300ms ease-in-out'))
    ])

  ]
})
export class ProfileStrengthComponent {
  hoverState: string = 'normal';

  constructor(protected router: Router) {
  }

  navigateToEditForm() {

    this.router.navigate([`/profile-detail/${localStorage.getItem('email')}`])
  }

  progress = 80;
  nextTarget = 90;

  addExperience() {
    this.progress = Math.min(this.progress + 5, 100);
  }

  addSkills() {
    this.progress = Math.min(this.progress + 10, 100);
  }


}
