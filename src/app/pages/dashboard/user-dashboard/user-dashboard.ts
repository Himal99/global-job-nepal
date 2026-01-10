import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../../utils/loader/loader.component";
import {Router} from "@angular/router";
import {UserDetailService} from "../../user-detail/user-detail.service";
import {DatePipe, NgForOf, NgIf} from "@angular/common";
import {ButtonComponent} from "../../../shared/components/ui/button/button.component";
import {FormsModule} from "@angular/forms";
import {ModalComponent} from "../../../shared/components/ui/modal/modal.component";
import {InputFieldComponent} from "../../../shared/components/form/input/input-field.component";
import {LabelComponent} from "../../../shared/components/form/label/label.component";
import {CdkDragDrop, CdkDropList, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';

@Component({
    selector: 'app-ecommerce',
    imports: [

        LoaderComponent,
        NgForOf,
        DatePipe,
        ButtonComponent,
        FormsModule,
        ModalComponent,
        InputFieldComponent,
        LabelComponent,
        CdkDropList,
        NgIf,
        DragDropModule
    ],
    templateUrl: './user-dashboard.html',
    styleUrl:'./user-dashboard.css'
})
export class UserDashboard implements OnInit {


    skills = [
        { name: 'Java', match: 92, endorsements: 42, verified: true },
        { name: 'Spring Boot', match: 88, endorsements: 38, verified: true }
        ]

    // Job requirement example (for match %)
    jobSkills = [
        { name: 'Java', required: true },
        { name: 'Angular', required: true },
        { name: 'Spring Boot', required: true },
    ];
    endorse(skill: any) { skill.endorsements++; }

    addSkill(name: string) {
        if(name.trim()) this.skills.push({ name: name.trim(), match: 50, endorsements: 0, verified: false });
    }

    removeSkill(index: number) { this.skills.splice(index, 1); }

    drop(event: CdkDragDrop<any[]>) {
        moveItemInArray(this.skills, event.previousIndex, event.currentIndex);
    }

    getMatch(skill: any): number {
        const jobSkill = this.jobSkills.find(j => j.name.toLowerCase() === skill.name.toLowerCase());
        return jobSkill ? skill.match : Math.floor(skill.match * 0.6);
    }
// Endorse a skill


    isOpen=false;
    detail: any;
    user: any;
    constructor(protected router: Router,
                protected detailService: UserDetailService) {
    }

    userName: string | null = '';
    email: string | null = '';

    ngOnInit(): void {
        this.userName = localStorage.getItem('userName')
        this.email = localStorage.getItem('email')

        this.detailService.getByEmail(this.email)
            .subscribe(rs => {
                console.log(rs)
                this.detail = rs?.data
            })
    }

    navigateToEditForm() {
        this.router.navigate([`/profile-detail/${localStorage.getItem('email')}`])
    }

    openModal() { this.isOpen = true; }
    closeModal() { this.isOpen = false; }
}
