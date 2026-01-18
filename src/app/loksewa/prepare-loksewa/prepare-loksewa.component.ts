import { Component, AfterViewInit, ViewChildren, QueryList, ElementRef, Renderer2, HostListener } from '@angular/core';
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-prepare-loksewa',
  templateUrl: './prepare-loksewa.component.html',
  imports: [
    RouterLink
  ],
  styleUrls: ['./prepare-loksewa.component.css']
})
export class PrepareLoksewaComponent implements AfterViewInit {

  @ViewChildren('steps') steps!: QueryList<ElementRef>;
  @ViewChildren('progressFill') progressFill!: QueryList<ElementRef>;
  @ViewChildren('progressContainer') progressContainer!: QueryList<ElementRef>;

  private animated = false;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit(): void {
    setTimeout(() => this.checkScroll(), 100);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.checkScroll();
  }

  checkScroll() {
    if (this.animated) return;

    if (!this.progressContainer || this.progressContainer.length === 0) return;
    if (!this.steps || this.steps.length === 0) return;
    if (!this.progressFill || this.progressFill.length === 0) return;

    const container = this.progressContainer.first.nativeElement;
    const rect = container.getBoundingClientRect();
    const triggerPoint = window.innerHeight / 2;

    if (rect.top < triggerPoint) {
      this.steps.forEach((step, index) => {
        setTimeout(() => {
          if (step.nativeElement) {
            this.renderer.addClass(step.nativeElement, 'active');
          }
          const fill = this.progressFill.first.nativeElement;
          const widthPercent = (index / (this.steps.length - 1)) * 100;
          this.renderer.setStyle(fill, 'width', widthPercent + '%');
        }, index * 600);
      });
      this.animated = true;
    }
  }
}
