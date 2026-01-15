import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';
import { register as registerSwiperElements } from 'swiper/element/bundle';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';

registerSwiperElements();

bootstrapApplication(AppComponent, {
    ...appConfig,
    providers: [
        ...(appConfig.providers || []),           // keep any existing providers
        importProvidersFrom(BrowserAnimationsModule) // ✅ enable animations
    ]
})
    .catch(err => console.error(err));
