import {Component, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Location, NgForOf, NgIf} from "@angular/common";
import {ActivatedRoute, Router} from "@angular/router";
import {UserDetailService} from "./user-detail.service";
import {LoaderComponent} from "../../utils/loader/loader.component";
import {FooterComponent} from "../../shared/layout/footer/footer.component";

@Component({
    selector: 'app-user-detail',
    imports: [
        ReactiveFormsModule,
        NgIf,
        NgForOf,
        LoaderComponent,
        FooterComponent
    ],
    templateUrl: './user-detail.component.html',
    styleUrl: './user-detail.component.css',
})
export class UserDetailComponent implements OnInit {
    userForm!: FormGroup;
    isEditMode = false;
    email: any;
    detail: any;

    constructor(
        private fb: FormBuilder,
        protected service: UserDetailService,
        protected activatedRoute: ActivatedRoute,
        protected router: Router,
        public location: Location
    ) {
    }

    ngOnInit(): void {

        this.initForm();
        this.email = this.activatedRoute.snapshot.paramMap.get('id');
        console.log(this.email)

        // this.spin= true;
        this.service.getByEmail(this.email)
            .subscribe(rs => {
                this.detail = rs?.data
                this.initForm();
                this.spin = false;
            }, err => {
                this.spin = false;
            })

    }

    initForm() {
        this.userForm = this.fb.group({
                firstName: this.detail?.firstName,
                lastName: this.detail?.lastName,
                email: undefined,

                phone: [this.detail?.phone, [Validators.required, Validators.pattern('^[0-9]{10}$')]],
                education: this.fb.array([]),
                skills: [this.detail?.skills],
                about: [this.detail?.about],
                profilePicture: [this.detail?.profilePicture],
                resumeLinks: [this.detail?.resumeLinks],
                socialMediaLinks: this.fb.array([]),

                address: this.fb.group({
                    country: [this.detail?.address?.country],
                    state: [this.detail?.address?.state],
                    city: [this.detail?.address?.city],
                    street: [this.detail?.address?.street],
                    zip: [this.detail?.address?.zip]
                }),

                experience: this.fb.array([]),
                projects: this.fb.array([])
            }
        );

        if (this.detail?.experience?.length) {
            this.detail.experience.forEach((exp: any) => {
                this.experienceArray.push(this.createExperience(exp));
            });
        }

        if (this.detail?.projects?.length) {
            console.log('yes')
            this.detail.projects.forEach((exp: any) => {
                console.log('sas')
                this.projects.push(this.createProjects(exp));
            });
        }
        console.log('here', this.detail)
        if (this.detail?.education?.length) {
            console.log('yes eddd')
            this.detail?.education.forEach((exp: any) => {
                console.log('edu cx')
                this.education.push(this.createEducation(exp));
            });
        }

        if (this.detail?.socialMediaLinks?.length) {
            console.log('yes eddd')
            this.detail?.socialMediaLinks.forEach((exp: any) => {
                console.log('edu cx')
                this.mediaLink.push(this.createMediaLink(exp));
            });
        }

        // // this.addEducation();
        // this.addMediaLink();
    }

    createExperience(exp?: any): FormGroup {
        return this.fb.group({
            company: [exp?.company || ''],
            position: [exp?.position || ''],
            projects: [exp?.projects || '']
        });
    }

    createEducation(exp?: any): any {
        return this.fb.group({
            collegeName: [exp?.collegeName || ''],
            faculty: [exp?.faculty || ''],
            startDate: [exp?.startDate || ''],
            endDate: [exp?.endDate || ''],
            status: [exp?.status || ''],
            degreeType: [exp?.degreeType || ''],
        })
    }

    createMediaLink(exp?: any): any {
        return this.fb.group({
            link: [exp?.link || ''],
            mediaType: [exp?.mediaType || ''],
        })
    }

    createProjects(exp?: any): FormGroup {

        return this.fb.group({
            company: [exp?.company || ''],
            position: [exp?.position || ''],
            projectName: [exp?.projectName || ''],
            projectDescription: [exp?.projectDescription || '']
        });
    }


    get experienceArray(): FormArray {
        return this.userForm.get('experience') as FormArray;
    }


    // ================= EXPERIENCE =================
    get experience(): FormArray {
        return this.userForm.get('experience') as FormArray;
    }

    addExperience() {
        this.experience.push(this.fb.group({
            company: [''],
            position: [''],
            projects: ['']
        }));
    }

    get education(): FormArray {
        return this.userForm.get('education') as FormArray;
    }

    get mediaLink(): FormArray {
        return this.userForm.get('socialMediaLinks') as FormArray;
    }

    addEducation() {
        this.education.push(this.fb.group({
            collegeName: [''],
            faculty: [''],
            startDate: [''],
            endDate: [''],
            status: [''],
            degreeType: [''],
        }));
    }

    addMediaLink() {
        this.mediaLink.push(this.fb.group({
            link: [''],
            mediaType: ['']
        }));
    }

    removeEducation(index: number) {
        this.education.removeAt(index);
    }

    removeMediaLink(index: number) {
        this.mediaLink.removeAt(index);
    }

    removeExperience(index: number) {
        this.experience.removeAt(index);
    }

    // ================= PROJECTS =================
    get projects(): FormArray {
        return this.userForm.get('projects') as FormArray;
    }

    addProject() {
        this.projects.push(this.fb.group({
            company: [''],
            position: [''],
            projectName: [''],
            projectDescription: ['']
        }));
    }

    removeProject(index: number) {
        this.projects.removeAt(index);
    }

    // ================= SUBMIT =================
    spin = false;
    isOpen = false;

    submit() {


        this.spin = true;
        // if (this.userForm.invalid) {
        //     this.userForm.markAllAsTouched();
        //     return;
        // }
        this.userForm.patchValue({
            email: this.email
        })

        this.service.updateDetail(this.userForm.value)
            .subscribe(rs => {
                console.log(rs)
                this.spin = false
                this.router.navigate(['/home'])
            }, err => {
                this.spin = false;
            })


    }

    closeModal() {

    }


}
