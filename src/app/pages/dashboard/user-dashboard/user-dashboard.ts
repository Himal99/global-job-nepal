import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../../utils/loader/loader.component";
import {Router} from "@angular/router";
import {UserDetailService} from "../../user-detail/user-detail.service";
import {CommonModule, DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "../../../shared/components/ui/modal/modal.component";
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {FooterComponent} from "../../../shared/layout/footer/footer.component";
import {ProfileStrengthComponent} from "../../profile-strength/profile-strength.component";
import {animate, query, stagger, state, style, transition, trigger} from "@angular/animations";
import {UserDashboardSkeletonComponent} from "../../user-dashboard-skeleton/user-dashboard-skeleton.component";
import {firstValueFrom} from "rxjs";

@Component({
    selector: 'app-ecommerce',
    imports: [

        LoaderComponent,
        NgForOf,
        DatePipe,
        FormsModule,
        ModalComponent,
        CdkDropList,
        NgIf,
        DragDropModule,
        FooterComponent,
        ProfileStrengthComponent,
        CommonModule,
        UserDashboardSkeletonComponent
    ],
    templateUrl: './user-dashboard.html',
    styleUrl: './user-dashboard.css',
    animations: [
        // Fade in/out for modal

        trigger('sequentialFade', [
            transition(':enter', [
                query(':self, h1, p, .actions button,.learning-card', [
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
        ]),
        trigger('snakeAnimation', [
            transition(':enter', []),
            transition(':leave', []),
            transition('* => *', [
                query(':self', [
                    style({ transform: 'translateY(0)', opacity: 0.3 }),
                    stagger(100, [
                        animate('600ms ease-in-out', style({ transform: 'translateY(-15px)', opacity: 1 })),
                        animate('600ms ease-in-out', style({ transform: 'translateY(0)', opacity: 0.3 }))
                    ])
                ], { optional: true })
            ])
        ])


    ]
})
export class UserDashboard implements OnInit {
    blocks = Array(6).fill(0);
    hoverState: string = 'normal';
    profileViews = 1245;
    jobViews = 532;
    searchAppearances = 87;
    spin = false;
    about: any;
    skills = [
        {name: 'Java', match: 92, endorsements: 42, verified: true},
        {name: 'Spring Boot', match: 88, endorsements: 38, verified: true}
    ]

    // Job requirement example (for match %)
    jobSkills = [
        {name: 'Java', required: true},
        {name: 'Angular', required: true},
        {name: 'Spring Boot', required: true},
    ];

    endorse(skill: any) {
        skill.endorsements++;
    }

    addSkill(name: string) {
        if (name.trim()) this.skills.push({name: name.trim(), match: 50, endorsements: 0, verified: false});
    }

    removeSkill(index: number) {
        this.skills.splice(index, 1);
    }

    drop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
    }

    getMatch(skill: any): number {
        const jobSkill = this.jobSkills.find(j => j.name.toLowerCase() === skill.name.toLowerCase());
        return jobSkill ? skill.match : Math.floor(skill.match * 0.6);
    }

// Endorse a skill


    isOpen = false;
    detail: any;
    user: any;

    constructor(protected router: Router,
                protected detailService: UserDetailService) {
    }

    userName: string | null = '';
    email: any;

     ngOnInit(): void {


        this.userName = localStorage.getItem('userName')
        this.email = localStorage.getItem('email')


        const minDelay = new Promise(resolve => setTimeout(resolve, 1000));

        // Start API call
        const apiCall = this.detailService.getByEmail(this.email).toPromise();

        // Wait for BOTH to finish
        Promise.all([apiCall, minDelay])
            .then(([rs]) => {
                if (rs) {
                    this.detail = rs.data;
                }
            })
            .catch(err => console.error(err))
            .finally(() => {
                this.spin = false; // hide skeleton
            });
        this.animateCount('profileViews', 0, this.profileViews, 1500);
        this.animateCount('jobViews', 0, this.jobViews, 1500);
        this.animateCount('searchAppearances', 0, this.searchAppearances, 1500);
    }

    animateCount(field: string, start: number, end: number, duration: number) {
        let range = end - start;
        let current = start;
        let increment = end > start ? 1 : -1;
        let stepTime = Math.abs(Math.floor(duration / range));
        const timer = setInterval(() => {
            current += increment;
            // @ts-ignore
            this[field] = current;
            if (current === end) clearInterval(timer);
        }, stepTime);
    }

    navigateToEditForm() {
        this.router.navigate([`/profile-detail/${localStorage.getItem('email')}`])
    }

    openModal() {
        this.isOpen = true;
    }

    closeModal() {
        this.isOpen = false;
    }

    updateAboutSection() {
        this.spin = true;
        const body = {
            data: this.about
        }
        this.detailService.updateDetailSection(body, this.email, 'ABOUT')
            .subscribe(rs => {
                this.spin = false;
                this.detailService.getByEmail(this.email)
                    .subscribe(rs => {
                        console.log(rs)
                        this.detail = rs?.data
                    })
                this.closeModal();

            }, err => {
                this.spin = false;
            })
    }

    navigateToCvForm() {
        this.router.navigate(['/cv'])
    }


    ngAfterViewInit() {
        this.countUp('.count-up', [this.profileViews, this.jobViews, this.searchAppearances]);
    }

    countUp(selector: string, values: number[]) {
        const elements = document.querySelectorAll(selector);
        elements.forEach((el, i) => {
            let start = 0;
            const end = values[i] || parseInt(el.textContent || '0', 10);
            const duration = 1000;
            const stepTime = Math.abs(Math.floor(duration / end));
            const timer = setInterval(() => {
                start += 1;
                el.textContent = start.toString();
                if (start >= end) clearInterval(timer);
            }, stepTime);
        });
    }
}

