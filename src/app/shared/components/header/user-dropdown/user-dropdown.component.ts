import {Component, OnInit} from '@angular/core';
import { DropdownComponent } from '../../ui/dropdown/dropdown.component';
import { CommonModule } from '@angular/common';
import {Router, RouterModule} from '@angular/router';
import { DropdownItemTwoComponent } from '../../ui/dropdown/dropdown-item/dropdown-item.component-two';

@Component({
  selector: 'app-user-dropdown',
  templateUrl: './user-dropdown.component.html',
  imports:[CommonModule,RouterModule,DropdownComponent,DropdownItemTwoComponent]
})
export class UserDropdownComponent implements OnInit{
  isOpen = false;
    userName: string | null ='';
    userType: string | null = '';
    email: string | null ='';
  constructor(protected router: Router) {
  }

  ngOnInit(): void {
       this.userName = localStorage.getItem('userName')
       this.userType = localStorage.getItem('userType')
       this.email = localStorage.getItem('email')
    }

  toggleDropdown() {
    this.isOpen = !this.isOpen;
  }

  closeDropdown() {
    this.isOpen = false;
  }

  signOut() {
    localStorage.removeItem('authToken');
    this.router.navigateByUrl('/signin')
  }
}