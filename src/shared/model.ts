export interface ClockTimeData {
  time: string,
  distance: number,
  unit: string,
  dateDone: string;
  dateSaved: string;
  location: string;
}

export interface Activity {
  dateDone: string// "2023-01-26"
  dateSaved: string   // 1/28/2023 10:27:55 AM
  distance: number    // 3
  time: string;       //"29:00"
  unit: string;       // course "3miles"
  location: string; // Rockmill
  notes: string; // enterd on History page
  id: string; // assigned when retrieved from Firestore
}

export const MY_CLOUD_TOKEN = 'timr-';



export const USER_GOOGLE_ID_TOKEN = MY_CLOUD_TOKEN + 'ggl-id';

export const CLOCK_TIME_DATA_TOKEN = MY_CLOUD_TOKEN + 'clocktimedata';

export const SEPARATOR = '----------------';

export const DISTANCE_OPTIONS = [
  'Workout',
  'Stretch',
  '1mile',
  '2miles',
  '3miles',
  '4miles',
  '5miles',
  '8miles',
  '5k',
  '10k',
  SEPARATOR,
  '26.2',
  '13.1',
  'Kilometers',
  'Miles',
  'Meters',
  'Yards'
];

