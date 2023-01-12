import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Passenger } from '../models/PassengerModel';
import { PassengersDataSharedService } from '../shared/passengers-data.service';

@Component({
  selector: 'app-passengers-list',
  templateUrl: './passengers-list.component.html',
  styleUrls: ['./passengers-list.component.scss']
})
export class PassengersListComponent implements OnInit {

  selectedGender: string[] = [];
  selectedSurvived: string[] = [];
  selectedPclass: string[] = [];

  // Checkbox values form parent
  @Input() maleSelected!: boolean;
  @Input() femaleSelected!: boolean;
  @Input() survived!: boolean;
  @Input() dead!: boolean;
  @Input() firstClassChecked!: boolean;
  @Input() secondClassChecked!: boolean;
  @Input() thirdClassChecked!: boolean;

  // Passengers array
  passengers: Passenger[] = [];

  passengerSubscription: any

  constructor(private passengersDataSharedService: PassengersDataSharedService) {
  }

  ngOnInit(): void {
    this.passengerSubscription = this.passengersDataSharedService.passengerObservable.subscribe(passengers => {
      this.passengers = passengers;
    });
  }

  ngOnDestroy(): void {
    this.passengerSubscription.unsubscribe();
  }

  ngOnChanges() {

    this.onCheck();

  }


  /**
   * 
   * @param form 
   */
  // search(form: NgForm) {
  //   if (form.value['word'] === "") {
  //     this.getPassengers()
  //   } else {
  //     this.passengersService.search(form.value['word']).subscribe({
  //       next: (passengers) => {
  //         this.passengers = passengers;
  //         this.PassengersSent.emit(passengers)
  //       },
  //       error: (e) => {
  //         console.error(e.message);
  //       }
  //     })

  //   }
  // }


  onCheck() {
    console.log(this.maleSelected);

    this.passengersDataSharedService.updatePassengers(this.maleSelected, this.femaleSelected, this.survived, this.dead, this.firstClassChecked, this.secondClassChecked, this.thirdClassChecked)
    // this.passengers = this.passengersDataSharedService.passengers
  }


}
