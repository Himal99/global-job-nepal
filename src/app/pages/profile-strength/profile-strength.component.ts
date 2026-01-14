import { Component } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile-strength',
  imports: [],
  templateUrl: './profile-strength.component.html',
  styleUrl: './profile-strength.component.css',
})
export class ProfileStrengthComponent {


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
