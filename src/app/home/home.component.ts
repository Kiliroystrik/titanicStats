import { Passenger } from './../Models/PassengerModel';
import { PassengersService } from './../services/passengers.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {


  public passengers: Passenger[] = [];

  constructor(private passengersService: PassengersService) {
  }

  ngOnInit(): void {
    this.getPassengers()
  }

  getPassengers() {
    this.passengersService.getPassengers().subscribe({
      next: (result) => {
        this.passengers = result;
      },
      error: (e) => {
        console.error(e);
      }
    })
  }

}
