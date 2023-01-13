import { NgForm } from '@angular/forms';
import { Passenger } from './../models/PassengerModel';
import { PassengersDataSharedService } from './../shared/passengers-data.service';
import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-passengers-search',
  templateUrl: './passengers-search.component.html',
  styleUrls: ['./passengers-search.component.scss']
})
export class PassengersSearchComponent implements OnInit {

  passengerSubscription!: Subscription;
  passengers!: Passenger[];
  searchWord!: string;
  constructor(private passengersDataSharedService: PassengersDataSharedService) { }

  ngOnInit(): void {
    this.passengerSubscription = this.passengersDataSharedService.passengerObservable.subscribe(passengers => {
      this.passengers = passengers;
    });
  }

  ngOnDestroy(): void {
    this.passengerSubscription.unsubscribe();
  }

  /**
   * 
   * @param form 
   */
  search(form: NgForm) {
    if (form.value['word'] === "") {
      // J'initialise mes données depuis getPassengers()
      this.passengersDataSharedService.getPassengers();
    } else {
      // J'initialise mes données d'après le résultat de ma recherche
      this.passengersDataSharedService.updateWithSearch(form.value['word'])

    }
  }
}
