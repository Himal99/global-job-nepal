import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../../utils/loader/loader.component";
import {Router} from "@angular/router";
import {UserDetailService} from "../../user-detail/user-detail.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "../../../shared/components/ui/modal/modal.component";
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {FooterComponent} from "../../../shared/layout/footer/footer.component";
import {ProfileStrengthComponent} from "../../profile-strength/profile-strength.component";


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
        ProfileStrengthComponent
    ],
    templateUrl: './user-dashboard.html',
    styleUrl: './user-dashboard.css'
})
export class UserDashboard implements OnInit {
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

        this.detailService.getByEmail(this.email)
            .subscribe(rs => {
                console.log(rs)
                this.detail = rs?.data
            })

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
      const  body = {
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
}
