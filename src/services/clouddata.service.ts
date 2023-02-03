import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { CLOCK_TIME_DATA_TOKEN, USER_GOOGLE_ID_TOKEN } from '../shared/model';
import { Common } from '../shared/common';
import { Activity } from '../shared/model';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CloudDataService<T> {

  constructor(
    private afs: AngularFirestore,
    private common: Common) {

  }

  _emptyActivity: Activity = {
    dateDone: '',
    dateSaved: '',
    distance: 0,
    time: '00:00:00',
    unit: ''
  }

  _cd!: any;
  _id = '';

  get userId() {
    if (!this._id)
      this._id = localStorage.getItem(USER_GOOGLE_ID_TOKEN);

    if (!this._id) console.log(`MUST Login to use data service`)

    return this._id;
  };

  saveClockData(data: T, noDate: boolean = false) {
    if (!this.userId) return;
    const now = new Date();
    let d = null;
    if (!noDate)
      d = new Date((data as { dateDone: string }).dateDone + ' 00:00:00');
    const id = this.common.dataKey(d);
    (data as { dateSaved: string }).dateSaved = now.toLocaleDateString() + ' ' + now.toLocaleTimeString();
    this.afs.collection('activities').doc(this.userId).collection('clock').doc(id).set(data);
  }

  deleteClockData(date: Date) {
    if (!this.userId) return;
    let k = CLOCK_TIME_DATA_TOKEN + this.common.dataKey(date);
    console.log(`deleteClockData removing k=${k}`)
    const id = this.common.dataKey(date);
    this.afs.collection('activities').doc(this.userId).collection('clock').doc(id).delete();
  }

  getClockTimeData<T>(date: Date = new Date()): Observable<T> {
    if (!this.userId) return;
    const id = this.common.dataKey(date);

    return this.afs.collection<T>('activities').doc(this.userId).collection('clock').doc(id).get().pipe(map(doc => {
      if (doc.exists) {
        this._cd = doc.data() as T;
      } else {
        this._cd = this._emptyActivity as T;
      }
      console.log(`getClockTimeData returning "${this._cd}"`);
      return this._cd;
    }), catchError(error => {
      console.log(`getClockTimeData error returning "${error}"`);
      return of(this._emptyActivity as T);
    }));
  }
}

