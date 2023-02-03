import { Component, Input, OnInit } from '@angular/core';
import { CloudDataService } from 'src/services/clouddata.service';
import { Common } from 'src/shared/common';
import { Activity } from 'src/shared/model';

@Component({
  selector: 'pace',
  templateUrl: './pace.component.html',
  styles: [`h1 { font-family: Lato; }`],
})
export class PaceComponent implements OnInit {
  @Input() name: string;
  // Time vars
  public timeHours: number = null;
  public timeMinutes: number = null;
  public timeSeconds: number = null;
  // Distance vars
  public distance: number = null;
  public distanceType: string = 'Miles';
  public distanceValue: number = 0;
  // Pace vars
  public paceHours: number = null;
  public paceMinutes: number = null;
  public paceSeconds: number = null;
  public paceType: string = 'miles';
  // data vars
  public selectedDate: string;

  // Constants
  HRS = 60 * 60; // sec in an hour
  MINS = 60; // sec in a minute
  MESSAGE = "Enter any 2 to calculate the third"
  SEPARATOR = '------------------';
  DISTANCE_OPTIONS = [
    'Kilometers',
    'Miles',
    'Meters',
    'Yards',
    this.SEPARATOR,
    'Marathon',
    'Half Marathon',
    '5miles',
    '8miles',
    '5k',
    '10k',
  ];

  METRIC_KM = ['Kilometers', '5k', '10k'];

  US_MILES = ['Miles', '5miles', '8miles', 'Marathon', 'Half Marathon'];


  // General vars
  public errorMessage = this.MESSAGE;
  public calcType: string = '';
  public validForm = true;

  constructor(
    private common: Common,
    public cloudData: CloudDataService<Activity>,

  ) {
    this.selectedDate = this.common.formatDate(new Date());
  }

  ngOnInit() {
    console.log('ngOnInit');
    console.log(`current date ${this.selectedDate}`);


    // login to google to get user id
    // set id in localstorage
    // call cloudstorage to get time
    // 
  }

  timeInSeconds(): number {
    let tot =
      this.timeHours * this.HRS +
      this.timeMinutes * this.MINS +
      this.timeSeconds;
    return tot;
  }

  paceInSeconds(): number {
    let tot =
      this.paceHours * this.HRS +
      this.paceMinutes * this.MINS +
      this.paceSeconds;
    return tot;
  }

  // total time = pace * distance
  calculateTotalTime() {
    let factor = 0;
    if (this.paceType == 'miles')
      switch (this.distanceType) {
        case 'Kilometers':
        case '5k':
        case '10k':
          factor = 0.625;
          break;
        case 'Meters':
          factor = 0.000621371;
          break;
        case 'Yards':
          factor = 1 / 1760;
          break;

        default:
          factor = 1;
      }
    else
      switch (this.distanceType) {
        case 'Miles':
        case '5miles':
        case '8miles':
          factor = 1.6;
          break;
        case 'Yards':
          factor = 0.0009144;
          break;
        default:
          factor = 1;
      }

    let tot = Math.round(this.paceInSeconds() * factor * this.distance);

    // update Time
    let hrs = Math.trunc(tot / this.HRS);
    let mins = Math.trunc((tot - hrs * this.HRS) / this.MINS);
    let secs = Math.round(tot - hrs * this.HRS - mins * this.MINS);
    console.log(hrs, mins, secs);
    this.timeHours = hrs ? hrs : null;
    this.timeMinutes = mins;
    this.timeSeconds = secs;
    //this.distanceType = 'Miles';
  }

  // pace = time/distance
  calculatePace() {
    if (this.validInput()) {
      let pace =
        (this.timeHours * this.HRS +
          this.timeMinutes * this.MINS +
          this.timeSeconds) /
        this.convertDistance(this.distance);

      let hrs = Math.trunc(pace / this.HRS);
      let mins = Math.trunc((pace - hrs) / this.MINS);
      let secs = Math.round(pace - hrs - mins * this.MINS);
      console.log(hrs, mins, secs);
      this.paceHours = hrs ? hrs : null;
      this.paceMinutes = mins;
      this.paceSeconds = secs;
    }
  }

  convertDistance(distance): number {
    let factor = 1;

    console.log(
      ` ${this.distanceType} ${this.METRIC_KM.includes(this.distanceType)}`
    );
    if (
      this.paceType == 'miles' &&
      (this.US_MILES.includes(this.distanceType) ||
        this.distanceType == 'Yards')
    ) {
      if (this.distanceType == 'Yards') {
        return distance / 1760;
      }
      return distance;
    }

    if (
      this.paceType == 'miles' &&
      (this.METRIC_KM.includes(this.distanceType) ||
        this.distanceType == 'Meters')
    ) {
      if (this.distanceType == 'Meters') {
        return (0.625 * distance) / 1000;
      }
      return distance * 0.625;
    }
    if (
      (this.paceType == 'km' && this.METRIC_KM.includes(this.distanceType)) ||
      this.distanceType == 'Meters'
    ) {
      if (this.distanceType == 'Meters') {
        return distance / 1000;
      }
      return distance;
    }

    return distance;
  }
  // distance = tot time / pace
  calculateDistance() {
    // Set form distance to metric or US
    if (this.paceType == 'per Mile') {
      this.distanceType = 'Kilometers';
    } else {
      this.distanceType = 'Miles';
    }

    let totalTimeSecs =
      this.timeHours * this.HRS +
      this.timeMinutes * this.MINS +
      this.timeSeconds;

    let paceTimeSecs =
      this.paceHours * this.HRS +
      this.paceMinutes * this.MINS +
      this.paceSeconds;

    this.distance = totalTimeSecs / paceTimeSecs;
  }

  reset() {
    this.timeReset();
    this.distReset();
    this.paceReset();
    this.resetOther();
  }

  distReset() {
    this.distance = null;
    this.distanceType = 'Miles';
    this.resetOther();
  }

  paceReset() {
    this.paceHours = null;
    this.paceMinutes = null;
    this.paceSeconds = null;
    this.paceType = 'miles';
    this.resetOther();
  }

  timeReset() {
    this.timeHours = null;
    this.timeMinutes = null;
    this.timeSeconds = null;
    this.resetOther();
  }

  resetOther() {
    this.calcType = '';
    this.errorMessage = this.MESSAGE;
    this.validForm = true;
  }

  validInput(): boolean {
    let hasDist: boolean = !!this.distance;
    let hasPace: boolean = !!(
      this.paceHours ||
      this.paceMinutes ||
      this.paceSeconds
    );
    let hasTime: boolean = !!(
      this.timeSeconds ||
      this.timeMinutes ||
      this.timeHours
    );

    console.log(
      `has dist= ${hasDist}, has pace= ${hasPace}, has time= ${hasTime}`
    );

    if (
      (!hasDist && !hasPace && !hasTime) || // has nothing
      (hasDist && !hasPace && !hasTime) || // only distance
      (!hasDist && hasPace && !hasTime) || // only pace
      (!hasDist && !hasPace && hasTime) // only time
    ) {
      this.errorMessage = this.MESSAGE;
      this.validForm = false;
      return false;
    }

    if (hasDist && hasTime && hasPace) {
      this.errorMessage = 'Enter only 2 of distance, time or pace';
      this.validForm = false;
      return false;
    }

    this.errorMessage = this.MESSAGE;
    this.validForm = true;
    return true;
  }

  typeOfCalculation(): string {
    let calcType = '';
    if (this.validInput()) {
      if (
        (this.timeSeconds || this.timeMinutes || this.timeHours) &&
        this.distance
      ) {
        calcType = 'Pace';
      }

      if (
        ((this.timeSeconds || this.timeMinutes || this.timeHours) &&
          this.paceHours) ||
        this.paceMinutes ||
        this.paceSeconds
      ) {
        calcType = 'Distance';
      }

      if (
        (this.paceHours || this.paceMinutes || this.paceSeconds) &&
        this.distance
      ) {
        calcType = 'Time';
      }
    }
    this.calcType = calcType;
    return calcType;
  }

  convertPace(event) {
    console.log(event);
    let paceTimeSecs = this.convertPace2Seconds();

    if (paceTimeSecs) {
      // convert to miles
      if (event.target.value == 'km') {
        let pace = paceTimeSecs * 0.625;
        this.convertSeconds2Pace(pace);
      } // convert to km
      else {
        let pace = paceTimeSecs * 1.6;
        this.convertSeconds2Pace(pace);
      }
    }
  }

  convertSeconds2Pace(paceSecs) {
    let hrs = Math.trunc(paceSecs / this.HRS);
    let mins = Math.trunc((paceSecs - hrs) / this.MINS);
    let secs = Math.round(paceSecs - hrs - mins * this.MINS);
    console.log(hrs, mins, secs);
    this.paceHours = hrs ? hrs : null;
    this.paceMinutes = mins ? mins : null;
    this.paceSeconds = secs;
  }

  convertPace2Seconds(): number {
    let paceTimeSecs =
      this.paceHours * this.HRS +
      this.paceMinutes * this.MINS +
      this.paceSeconds;
    return paceTimeSecs;
  }

  checkStandardDistances(event): void {
    console.log(event);
    let distanceType = event.target.value;

    // dont override distance if a standard type is not selected
    if (
      distanceType != 'Meters' &&
      distanceType != 'Yards' &&
      distanceType != 'Kilometers' &&
      distanceType != 'Miles'
    )
      this.distance = 0;

    // standard distances
    if (distanceType == 'Marathon') this.distance = 26.2188;
    if (distanceType == 'Half Marathon') this.distance = 26.2188 / 2;
    if (distanceType == '5miles') this.distance = 5;
    if (distanceType == '8miles') this.distance = 8;
    if (distanceType == '5k') this.distance = 5;
    if (distanceType == '10k') this.distance = 10;
  }

  calculate() {
    switch (this.typeOfCalculation()) {
      case 'Pace':
        this.calculatePace();
        break;
      case 'Distance':
        this.calculateDistance();
        break;
      case 'Time':
        this.calculateTotalTime();
    }
  }

  loadData() {
    // sign in & set google id
    // 
    this.cloudData.getClockTimeData<Activity>(new Date(this.selectedDate + " 00:00:00")).subscribe(ctd => {
      if (ctd.time) { }

    });
  }
}
