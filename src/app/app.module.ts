import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { PaceComponent } from './pace.component';
import { environment } from 'src/environments/environment';
import { Common } from 'src/shared/common';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';

const routes: Routes = [
  { path: 'clock', component: AppComponent }
];

import { RouterModule, Routes } from '@angular/router';
import { FullScreenService } from 'src/services/full-screen.service';
@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    AngularFireModule.initializeApp(environment.firebase)],
  declarations: [AppComponent, PaceComponent],
  exports: [RouterModule],
  bootstrap: [AppComponent],
  providers: [Common, AngularFirestoreModule, FullScreenService]
})
export class AppModule {


}
