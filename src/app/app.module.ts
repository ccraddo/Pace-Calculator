import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { PaceComponent } from './pace.component';
import { Common } from 'src/shared/common';
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from 'src/environments/environment';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase)],
  declarations: [AppComponent, PaceComponent],
  bootstrap: [AppComponent],
  providers: [Common, AngularFirestoreModule]
})
export class AppModule { }
