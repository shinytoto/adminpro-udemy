import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';

// Modules
import { PagesModule } from './pages/pages.module';

// Components
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './login/register.component';

// Routes
import { APP_ROUTES } from './app.routing';

@NgModule({
  declarations: [AppComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, PagesModule, APP_ROUTES],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
