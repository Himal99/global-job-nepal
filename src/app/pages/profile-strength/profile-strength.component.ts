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
}
