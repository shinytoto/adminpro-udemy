import { Component } from '@angular/core';

// Services
import { SettingsService } from './services/service.index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'adminpro';

  constructor(public _ajustes: SettingsService) {}
}
