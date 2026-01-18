import {Component, OnInit} from '@angular/core';
import {LoksewaService} from "../service/loksewa.service";
import {NgForOf, NgIf} from "@angular/common";
import {LoaderComponent} from "../../utils/loader/loader.component";
import {FormsModule} from "@angular/forms";

import {finalize, tap} from "rxjs";

@Component({
    selector: 'app-loksewa-news',
    imports: [
        NgForOf,
        LoaderComponent,
        FormsModule,
        NgIf
    ],
    templateUrl: './loksewa-news.component.html',
    styleUrl: './loksewa-news.component.css',
})
export class LoksewaNewsComponent implements OnInit {
    data: any;
    spin = false;

    constructor(protected service: LoksewaService) {
    }

    searchText = '';

    ngOnInit(): void {

        this.spin = true;
        this.service
            .getAllNotice().pipe(
            tap(rs => this.data = rs),
            finalize(() => this.spin = false)
        ).subscribe();
    }

}
