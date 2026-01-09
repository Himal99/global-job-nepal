import { Component } from '@angular/core';
import {Location} from "@angular/common";

@Component({
  selector: 'app-job-desc',
  imports: [],
  templateUrl: './job-desc.component.html',
  styleUrl: './job-desc.component.css',
})
export class JobDescComponent {
constructor(protected location: Location) {
}
  back() {
    this.location.back();
  }
}
