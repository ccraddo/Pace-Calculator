import { Component, VERSION } from '@angular/core';

@Component({
  selector: 'pace-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  name = 'Pace Calculations';

  gOnInit() {

  }

}
export interface ClockTimeData {
  time: string,
  distance: number,
  unit: string,
  dateDone: string;
  dateSaved: string
}
