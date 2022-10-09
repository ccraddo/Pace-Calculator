import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaceComponent } from './pace.component';

@NgModule({
  imports: [BrowserModule, FormsModule],
  declarations: [AppComponent, PaceComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
