import { Component } from '@angular/core';
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-cv2',
  imports: [
    NgForOf,
    NgIf,
    NgOptimizedImage
  ],
  templateUrl: './cv2.component.html',
  styleUrl: './cv2.component.css',
})
export class Cv2Component {
  user = {
    name: 'Himal Rai',
    title: 'Senior Software Engineer',
    profilePicture: 'https://randomuser.me/api/portraits/men/75.jpg',
    email: 'himal.rai@example.com',
    phone: '+977 9841234567',
    address: 'Kathmandu, Nepal',
    website: 'https://himalportfolio.com',
    about: `I am a passionate software engineer with over 6 years of experience in developing enterprise and fintech applications. Skilled in Java, Spring Boot, Angular, and modern web technologies. I love solving complex problems, optimizing systems, and learning new frameworks and tools.`,

    skills: [
      'Java', 'Spring Boot', 'Angular', 'TypeScript',
      'PostgreSQL', 'Redis', 'REST APIs', 'Docker', 'Microservices',
      'AWS', 'CI/CD', 'Unit Testing'
    ],

    experience: [
      {
        position: 'Head of Digital Loan Department',
        company: 'Global IME Bank',
        startDate: 'Mar 2025',
        endDate: 'Present',
        description: `Leading the digital loan division. Implemented online loan platforms, customer portals, and integrated real-time share valuation services. Managing a team of developers and overseeing project architecture.`
      },
      {
        position: 'Senior Software Engineer',
        company: 'Code Himalaya Pvt. Ltd.',
        startDate: 'Jan 2022',
        endDate: 'Feb 2025',
        description: `Worked on full-stack enterprise applications for banking clients. Implemented microservices in Spring Boot, frontend modules in Angular, caching strategies with Redis, and automated report generation.`
      },
      {
        position: 'Software Engineer',
        company: 'SB Solutions',
        startDate: 'Jun 2019',
        endDate: 'Dec 2021',
        description: `Developed full-stack web applications, implemented SQL Server stored procedures, optimized database queries, and integrated third-party APIs.`
      }
    ],

    education: [
      {
        degree: 'Bachelor of Computer Application (BCA)',
        institution: 'Everest Innovative College',
        startDate: '2016',
        endDate: '2019',
        description: `Studied core programming, database management, web development, and completed multiple projects using Java and web technologies.`
      },
      {
        degree: 'Higher Secondary Education (Science)',
        institution: 'Kathmandu Model College',
        startDate: '2014',
        endDate: '2016',
        description: `Completed science stream with focus on mathematics and computer science.`
      }
    ],

    customFields: [
      { label: 'Languages', value: 'English, Nepali, Hindi' },
      { label: 'Hobbies', value: 'Reading, Coding, Travelling, Chess' },
      { label: 'Certifications', value: 'Java SE 11 Developer, AWS Certified Solutions Architect, Scrum Master' },
      { label: 'LinkedIn', value: 'https://linkedin.com/in/himalrai' },
      { label: 'GitHub', value: 'https://github.com/himalrai' },
      { label: 'References', value: 'Available upon request' }
    ]
  };
}
