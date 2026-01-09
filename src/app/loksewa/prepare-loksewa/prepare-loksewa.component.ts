import {Component, OnInit} from '@angular/core';
import {CommingSoonComponent} from "../../pages/comming-soon/comming-soon.component";
import {LoksewaService} from "../service/loksewa.service";
import {NgForOf} from "@angular/common";


@Component({
  selector: 'app-prepare-loksewa',
  imports: [
    CommingSoonComponent,
    NgForOf
  ],
  templateUrl: './prepare-loksewa.component.html',
  styleUrl: './prepare-loksewa.component.css',
})
export class PrepareLoksewaComponent implements OnInit{
  data: any;
  constructor(protected service: LoksewaService) {
  }

    ngOnInit(): void {

    this.service
        .getAllNotice()
        .subscribe( rs => {
          console.log(rs)
          this.data = rs;
        })
    }

}
