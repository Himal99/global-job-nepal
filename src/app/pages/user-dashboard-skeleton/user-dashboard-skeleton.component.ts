import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-dashboard-skeleton',
  standalone: true,
  imports: [CommonModule],
  template: `
    <!-- Header -->
    <div class="skeleton-header">
      <div class="skeleton-avatar"></div>
      <div class="skeleton-info">
        <div class="skeleton-line title"></div>
        <div class="skeleton-line sub"></div>
        <div class="skeleton-line sub short"></div>
      </div>
    </div>

    <!-- Profile Stats -->
    <div class="skeleton-stats">
      <div class="skeleton-box" *ngFor="let stat of stats"></div>
    </div>

    <!-- Skills (Draggable style) -->
    <div class="skeleton-skills">
      <div class="skeleton-skill-card" *ngFor="let skill of skills"></div>
    </div>

    <!-- Buttons -->
    <div class="skeleton-actions">
      <div class="skeleton-button" *ngFor="let btn of buttons"></div>
    </div>
  `,
  styles: [`
    /* Shimmer animation */
    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    .shimmer {
      background: linear-gradient(90deg,#e0e0e0 25%,#f0f0f0 50%,#e0e0e0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    /* Header */
    .skeleton-header {
      display: flex;
      align-items: center;
      gap: 16px;
      padding: 16px;
    }
    .skeleton-avatar {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: linear-gradient(90deg,#e0e0e0 25%,#f0f0f0 50%,#e0e0e0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    .skeleton-info {
      flex: 1;
      display: flex;
      flex-direction: column;
      gap: 8px;
    }
    .skeleton-line {
      height: 16px;
      border-radius: 8px;
      background: linear-gradient(90deg,#e0e0e0 25%,#f0f0f0 50%,#e0e0e0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
    .skeleton-line.title { width: 200px; height: 24px; }
    .skeleton-line.sub { width: 150px; }
    .skeleton-line.sub.short { width: 100px; }

    /* Stats */
    .skeleton-stats {
      display: flex;
      gap: 12px;
      padding: 16px;
    }
    .skeleton-box {
      flex: 1;
      height: 60px;
      border-radius: 8px;
      background: linear-gradient(90deg,#e0e0e0 25%,#f0f0f0 50%,#e0e0e0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    /* Skills */
    .skeleton-skills {
      display: flex;
      flex-wrap: wrap;
      gap: 12px;
      padding: 16px;
    }
    .skeleton-skill-card {
      width: 120px;
      height: 36px;
      border-radius: 12px;
      background: linear-gradient(90deg,#e0e0e0 25%,#f0f0f0 50%,#e0e0e0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }

    /* Buttons */
    .skeleton-actions {
      display: flex;
      gap: 12px;
      padding: 16px;
    }
    .skeleton-button {
      width: 120px;
      height: 36px;
      border-radius: 8px;
      background: linear-gradient(90deg,#e0e0e0 25%,#f0f0f0 50%,#e0e0e0 75%);
      background-size: 200% 100%;
      animation: shimmer 1.5s infinite;
    }
  `]
})
export class UserDashboardSkeletonComponent {
  stats = Array(3);
  skills = Array(6);  // Matches real skill card count
  buttons = Array(3);
}
