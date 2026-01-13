import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../utils/loader/loader.component";
import {JobService} from "./job.service";
import {FormsModule} from "@angular/forms";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {debounceTime, Subject} from "rxjs";
import {InfiniteScrollDirective} from "ngx-infinite-scroll";
import {Router} from "@angular/router";
import {ChatbotComponent} from "../chatbot/chatbot.component";

@Component({
  selector: 'app-jobs',
    imports: [
        LoaderComponent,
        FormsModule,
        NgForOf,
        DatePipe,
        NgIf,
        InfiniteScrollDirective,
        ChatbotComponent
    ],
  templateUrl: './jobs.component.html',
  styleUrl: './jobs.component.css',
})
export class JobsComponent implements OnInit{
    jobs: any[] = [];
    searchText = '';
    page = 0;
    totalPages = 0;
    size=10;
  constructor(protected service: JobService, protected router: Router) {
  }
spin=false;
    ngOnInit(): void {
        this.search$.pipe(debounceTime(400))
            .subscribe(() => {
                this.page = 0;
                this.loadJobs();
            });

        this.loadJobs();
    }
    filters = {
        keyword: '',
        location: '',
        jobType: '',
        minSalary: null,
        maxSalary: null,
        isNew: false
    };
    loadJobs() {
        this.spin=true;
        this.service.getJobsList(this.filters, this.page, this.size)
            .subscribe(res => {
                const content = res?.data?.content || [];
                this.totalPages = res?.data?.totalPages || 0;

                this.jobs = [...this.jobs, ...content]; // append new jobs
                this.page++;
                this.spin = false;
            }, err => {
                console.error(err);
                this.spin = false;
            });
    }

    search() {
        this.page = 0;
        this.loadJobs();
    }

    next() {
        if (this.page + 1 < this.totalPages) {
            this.page++;
            this.loadJobs();
        }
    }

    prev() {
        if (this.page > 0) {
            this.page--;
            this.loadJobs();
        }
    }

    private search$ = new Subject<void>();
    onFilterChange() {
        this.applyFilters();
    }
    resetFilters() {
        this.filters = {
            keyword: '',
            location: '',
            jobType: '',
            minSalary: null,
            maxSalary: null,
            isNew: false
        };
        this.page = 0;
        this.loadJobs();
    }

    onScroll() {
        // Called when user scrolls near bottom
        this.loadJobs();
    }

    applyFilters() {
        this.page = 0;       // Reset page
        this.jobs = [];      // Clear old jobs
        this.totalPages = 0; // Reset total pages
        this.loadJobs();     // Fetch filtered jobs from page 0
    }

    detail() {
        this.router.navigateByUrl('/jobs-desc')
    }
}
