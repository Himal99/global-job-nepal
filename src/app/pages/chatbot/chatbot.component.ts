import {Component, ElementRef, ViewChild} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-chatbot',
  imports: [
    NgClass,
    FormsModule,
    NgForOf
  ],
  templateUrl: './chatbot.component.html',
  styleUrl: './chatbot.component.css',
})
export class ChatbotComponent {
  messages: { text: string, sender: 'bot' | 'user' }[] = [
    { text: 'Hello! I am your assistant.', sender: 'bot' }
  ];
  userInput = '';
  isOpen = false;

  @ViewChild('chatBody') chatBody!: ElementRef;

  toggleChat() {
    this.isOpen = !this.isOpen;
    if(this.isOpen) {
      setTimeout(() => this.scrollToBottom(), 0);
    }
  }

  sendMessage() {
    const text = this.userInput.trim();
    if(!text) return;

    // Add user message
    this.messages.push({ text, sender: 'user' });
    this.userInput = '';
    this.scrollToBottom();

    // Simulate bot response
    setTimeout(() => {
      this.messages.push({ text: 'Bot says: ' + text, sender: 'bot' });
      this.scrollToBottom();
    }, 500);
  }

  scrollToBottom() {
    try {
      this.chatBody.nativeElement.scrollTop = this.chatBody.nativeElement.scrollHeight;
    } catch {}
  }
}
