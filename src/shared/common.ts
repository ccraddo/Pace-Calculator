import { CLOCK_TIME_DATA_TOKEN } from './model'

export class Common {
    declare distance;
    public dateStr(date?: Date): string {
        let key = "";
        if (date) {
            key = date.getFullYear().toString() + this.addLeadingZeros((date.getMonth() + 1)).toString() + this.addLeadingZeros(date.getDate()).toString();
        }

        return key;
    }

    public addLeadingZeros(n: number) {
        if (n <= 9) {
            return "0" + n;
        }
        return n
    }

    public dataKey(date?: Date) {
        const d = date || new Date();
        return CLOCK_TIME_DATA_TOKEN + this.dateStr(d)
    }

    // is ISO but the ISOString returns GMT which will be the next day after 7pm EST
    public formatDate(d: Date): string {
        let ds = d.toLocaleDateString().slice(0, 10);
        let da = ds.split('/');
        let rv = this.padWithZero(Number.parseInt(da[2])) + '-' + this.padWithZero(Number.parseInt(da[0])) + '-' + this.padWithZero(Number.parseInt(da[1]));
        return rv;
    }

    public padWithZero(n: number): string {
        if (n > 9) {
            return '' + n;
        } else {
            return '0' + n;
        }
    }


    checkStandardDistances(event): void {
        console.log(event);
        let distanceType = event.value;

        // dont override distance if a standard type is not selected
        if (
            distanceType != 'Meters' &&
            distanceType != 'Yards' &&
            distanceType != 'Kilometers' &&
            distanceType != 'Miles'
        )
            this.distance = 0;

        // standard distances
        if (distanceType == '26.2') this.distance = 26.2188;
        if (distanceType == '13.1') this.distance = 26.2188 / 2;
        if (distanceType == '1mile') this.distance = 1;
        if (distanceType == '2miles') this.distance = 2;
        if (distanceType == '3miles') this.distance = 3;
        if (distanceType == '4miles') this.distance = 4;
        if (distanceType == '5miles') this.distance = 5;
        if (distanceType == '8miles') this.distance = 8;
        if (distanceType == '5k') this.distance = 5;
        if (distanceType == '10k') this.distance = 10;
    }


}