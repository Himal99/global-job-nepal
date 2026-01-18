import {Component, HostListener} from '@angular/core';
import { RouterModule } from '@angular/router';
import {ChatbotComponent} from "./pages/chatbot/chatbot.component";
import {DeviceService} from "./shared/services/device.service";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-root',
  standalone: true,
    imports: [
        RouterModule,
        ChatbotComponent,
        NgIf,
    ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Angular Ecommerce Dashboard | TailAdmin';


    isMobile = false;

    constructor(private deviceService: DeviceService) {
        this.checkDevice();
    }

    @HostListener('window:resize')
    checkDevice() {
        this.isMobile = this.deviceService.isMobile();
    }
}
