import { Component, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-voice-to-text',
  standalone: true,
  imports: [],
  templateUrl: './voice-to-text.component.html',
  styleUrl: './voice-to-text.component.sass',
})
export class VoiceToTextComponent implements OnInit {
  private recognition: any;
  transcript = '';

  ngOnInit() {
    this.initRecognition();
  }

  initRecognition() {
    this.recognition = new (window as any).webkitSpeechRecognition();
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
    this.recognition.lang = 'en-US';

    this.recognition.onresult = (event: any) => {
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; i++) {
        const transcript = event.results[i][0].transcript;
        if (event.results[i].isFinal) {
          this.transcript += transcript;
        } else {
          interimTranscript += transcript;
        }
      }
    };
  }

  startRecognition() {
    this.recognition.start();
  }

  stopRecognition() {
    this.recognition.stop();
  }
}
