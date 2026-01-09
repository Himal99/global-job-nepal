import {Component, OnInit} from '@angular/core';
import {LoksewaService} from "../service/loksewa.service";
import {NgForOf} from "@angular/common";
import {LoaderComponent} from "../../utils/loader/loader.component";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-loksewa-news',
  imports: [
    NgForOf,
    LoaderComponent,
    FormsModule
  ],
  templateUrl: './loksewa-news.component.html',
  styleUrl: './loksewa-news.component.css',
})
export class LoksewaNewsComponent implements OnInit{
  data: any;
  spin= false;
  constructor(protected service: LoksewaService) {
  }
  searchText = '';
  ngOnInit(): void {

    this.spin=true;
    this.service
        .getAllNotice()
        .subscribe( rs => {
          console.log(rs)
          this.data = rs;
          this.spin=false;
        }, err=>{
          this.spin=false;
        })
  }

}
