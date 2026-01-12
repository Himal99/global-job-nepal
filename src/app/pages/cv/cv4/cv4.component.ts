import { Component } from '@angular/core';
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-cv4',
  imports: [
    NgForOf,
    NgIf
  ],
  templateUrl: './cv4.component.html',
  styleUrl: './cv4.component.css',
})
export class Cv4Component {
  user: User = {
    name: 'Himal Rai',
    title: 'Senior Software Engineer',
    profilePicture: 'https://i.pravatar.cc/150?img=3',
    email: 'himal.rai@example.com',
    phone: '+977 9841234567',
    address: 'Kathmandu, Nepal',
    website: 'https://github.com/himalrai',
    about: `Passionate software engineer with 5+ years of experience in full-stack development, 
            specializing in Java, Spring Boot, Angular, and modern web technologies.`,
    skills: ['Java', 'Spring Boot', 'Angular', 'Redis', 'PostgreSQL', 'Docker', 'REST API'],
    customFields: [
      { label: 'Languages', value: 'Nepali, English' },
      { label: 'Hobbies', value: 'Coding, Reading, Traveling' }
    ],
    experience: [
      {
        position: 'Senior Software Engineer',
        company: 'Code Himalaya',
        startDate: 'Jan 2023',
        endDate: 'Present',
        description: 'Leading the digital loan platform development and managing full-stack projects.'
      },
      {
        position: 'Software Engineer',
        company: 'SB Solutions',
        startDate: 'Aug 2020',
        endDate: 'Dec 2022',
        description: 'Developed enterprise banking applications using Java, Spring Boot, Angular, MSSQL.'
      }
    ],
    education: [
      {
        degree: 'Bachelor in Computer Application (BCA)',
        institution: 'Everest Innovative College',
        startDate: '2017',
        endDate: '2020',
        description: 'Focused on Java, Web Development, and Database Management.'
      }
    ]
  };
}
interface CustomField {
  label: string;
  value: string;
}

interface Experience {
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface Education {
  degree: string;
  institution: string;
  startDate: string;
  endDate?: string;
  description: string;
}

interface User {
  name: string;
  title: string;
  profilePicture: string;
  email: string;
  phone: string;
  address: string;
  website: string;
  about: string;
  skills: string[];
  customFields: CustomField[];
  experience: Experience[];
  education: Education[];
}