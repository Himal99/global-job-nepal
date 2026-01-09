import {Component, OnInit} from '@angular/core';
import {LoaderComponent} from "../../../utils/loader/loader.component";
import {Router} from "@angular/router";
import {UserDetailService} from "../../user-detail/user-detail.service";


@Component({
    selector: 'app-ecommerce',
    imports: [

        LoaderComponent,
    ],
    templateUrl: './user-dashboard.html',
    styleUrl:'./user-dashboard.css'
})
export class UserDashboard implements OnInit {

    detail: any;
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
}
