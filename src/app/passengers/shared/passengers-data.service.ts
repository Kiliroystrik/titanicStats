import { Injectable } from '@angular/core';
import { Passenger } from '../models/PassengerModel';
import { PassengersService } from '../services/passengers.service';
import { Observable, of, BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class PassengersDataSharedService {

    // Passengers array
    passengers: Passenger[] = [];
    _passengerObservable = new BehaviorSubject<Passenger[]>([]);


    constructor(private passengersService: PassengersService) { }

    get passengerObservable(): Observable<Passenger[]> {
        return this._passengerObservable.asObservable();
    }

    /**
    * 
    * @param selectedGender optional
    * @param selectedSurvived optional
    * @param selectedAge optional
    * @param selectedPclass optional
    */
    getPassengers(selectedGender?: string[], selectedSurvived?: string[], selectedAge?: string, selectedPclass?: string[]) {
        this.passengersService.getPassengers(selectedGender, selectedSurvived, selectedAge, selectedPclass).subscribe({
            next: (passengers) => {
                this.passengers = passengers;
                this._passengerObservable.next(passengers);
            },
            error: (e) => {
                console.error(e);
            }
        });
    }


    updatePassengers(maleSelected: boolean, femaleSelected: boolean, survived: boolean, dead: boolean, firstClassChecked: boolean, secondClassChecked: boolean, thirdClassChecked: boolean) {
        this.onCheck(maleSelected, femaleSelected, survived, dead, firstClassChecked, secondClassChecked, thirdClassChecked)
    }

    onCheck(maleSelected: boolean, femaleSelected: boolean, survived: boolean, dead: boolean, firstClassChecked: boolean, secondClassChecked: boolean, thirdClassChecked: boolean) {
        let selectedGender: string[] = [];
        let selectedSurvived: string[] = [];
        let selectedAge: string = '';
        let selectedPclass: string[] = [];

        // Récupération des valeurs sélectionnées pour chaque checkbox
        if (maleSelected) {
            selectedGender.push("male");
        }
        if (femaleSelected) {
            selectedGender.push("female");
        }
        if (survived) {
            selectedSurvived.push("1");
        }
        if (dead) {
            selectedSurvived.push("0");
        }
        if (firstClassChecked) {
            selectedPclass.push("1");
        }
        if (secondClassChecked) {
            selectedPclass.push("2");
        }
        if (thirdClassChecked) {
            selectedPclass.push("3");
        }

        this.getPassengers(selectedGender, selectedSurvived, selectedAge, selectedPclass)

    }



}
