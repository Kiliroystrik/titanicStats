import { NgForm } from '@angular/forms';
import { Passenger } from '../passengers/models/PassengerModel';
import { PassengersService } from './../services/passengers.service';
import { Component, OnInit } from '@angular/core';
import { PassengersDataSharedService } from '../passengers/shared/passengers-data.service';
import { Observable, of } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  selectedGenders: string[] = [];
  selectedSurvived: string[] = [];
  maleSelected: boolean = true;
  femaleSelected: boolean = true;
  survived: boolean = true;
  dead: boolean = true;
  firstClassChecked: boolean = true;
  secondClassChecked: boolean = true;
  thirdClassChecked: boolean = true;

  selectedOption: string = 'chartByGender';

  // Incomming value from passengers-list
  passengers: Passenger[] = [];

  passengerSubscription: any

  age!: string;

  constructor(private passengersDataSharedService: PassengersDataSharedService) {
  }

  ngOnInit(): void {
    this.passengerSubscription = this.passengersDataSharedService.passengerObservable.subscribe(passengers => {
      this.passengers = passengers;
    });
    // J'initialise mes données qui seront ensuite disponibles dans le service
    this.passengersDataSharedService.getPassengers();
  }

  ngOnDestroy(): void {
    this.passengerSubscription.unsubscribe();
  }

  ngOnChanges(): void {

  }

  search(form: NgForm) {
    // if (form.value['word'] === "") {
    //   this.getPassengers()
    // } else {
    //   this.passengersService.search(form.value['word']).subscribe({
    //     next: (passengers) => {
    //       this.passengers = passengers;
    //       console.log(passengers);
    //       this.filterChart(passengers);
    //     },
    //     error: (e) => {
    //       console.error(e.message);
    //     }
    //   })

    // }
  }

  onRadioCheck($event: any) {
    this.selectedOption = $event.value
  }

}
