import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms'; // temporal

// Modules
import { PagesModule } from './pages/pages.module';

// Routes
import { APP_ROUTES } from './app.routing';

// Services
import { ServiceModule } from './services/service.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, FormsModule, PagesModule, ServiceModule, APP_ROUTES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
