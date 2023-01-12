import { Passenger } from './../models/PassengerModel';
import { Component, Input, OnInit } from '@angular/core';
import { PassengersDataSharedService } from '../shared/passengers-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-passengers-graph',
  templateUrl: './passengers-graph.component.html',
  styleUrls: ['./passengers-graph.component.scss']
})
export class PassengersGraphComponent implements OnInit {

  @Input() selectedOption: string = 'chartByGender';

  passengers!: Passenger[]

  barChartData = {
    labels: [""],
    datasets: [
      {
        data: [0],
        label: '',
        backgroundColor: [
          'rgba(55, 200 , 125, 0.7)',
          'rgba(0, 200 , 225, 0.7)'
        ]
      }
    ]
  }

  passengerSubscription: any

  constructor(private passengersDataSharedService: PassengersDataSharedService) { }

  ngOnInit(): void {
    this.passengerSubscription = this.passengersDataSharedService.passengerObservable.subscribe(passengers => {
      this.passengers = passengers;
      this.filterChart(this.passengers);
    });

    this.filterChart(this.passengers)
  }

  ngOnDestroy(): void {
    this.passengerSubscription.unsubscribe();
  }

  ngOnChanges(): void {

    // LE IF A AUSSI PERMIS DE DEBOGUÉ MON SOUCIS DE GRAPH QUI NE SE MET PAS À JOUR ! EN PLUS DE PERMETTRE DE NE PAS CRÉER UN ERREUR EN CONSOLE !
    if (this.passengers) {

      this.filterChart(this.passengers);
    }
  }

  filterChart(passengers: Passenger[]) {

    if (this.selectedOption == "chartByGender") {

      let labels = ['Male', 'Female']
      let datasetMale = passengers.map(p => p.Sex).filter(p => p == "male").length;
      let datasetFemale = passengers.map(p => p.Sex).filter(p => p == "female").length;

      let dataset = [datasetMale, datasetFemale];

      this.barChartData = {
        labels,
        datasets: [{
          data: dataset, label: 'Nombre de passagers', backgroundColor: [
            'rgba(55, 200 , 125, 0.7)',
            'rgba(0, 200 , 225, 0.7)'
          ]
        }],

      }
    } else if (this.selectedOption == "chartByClasse") {
      let labels = ['1', '2', '3']
      let datasetC1 = passengers.map(p => p.Pclass).filter(p => p == "1").length
      let datasetC2 = passengers.map(p => p.Pclass).filter(p => p == "2").length
      let datasetC3 = passengers.map(p => p.Pclass).filter(p => p == "3").length

      let dataset = [datasetC1, datasetC2, datasetC3];

      this.barChartData = {
        labels,
        datasets: [{
          data: dataset, label: 'Nombre de passagers', backgroundColor: [
            'rgba(55, 200 , 125, 0.7)',
            'rgba(0, 200 , 225, 0.7)',
            'rgba(200, 200 , 225, 0.7)'
          ]
        }],

      }
    } else {

      let labels = ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90', '91-100']
      let datasetC1 = passengers.map(p => p.Age).filter(p => p >= "1" && p <= "10").length
      let datasetC2 = passengers.map(p => p.Age).filter(p => p >= "11" && p <= "20").length
      let datasetC3 = passengers.map(p => p.Age).filter(p => p >= "21" && p <= "30").length
      let datasetC4 = passengers.map(p => p.Age).filter(p => p >= "31" && p <= "40").length
      let datasetC5 = passengers.map(p => p.Age).filter(p => p >= "41" && p <= "50").length
      let datasetC6 = passengers.map(p => p.Age).filter(p => p >= "51" && p <= "60").length
      let datasetC7 = passengers.map(p => p.Age).filter(p => p >= "61" && p <= "70").length
      let datasetC8 = passengers.map(p => p.Age).filter(p => p >= "71" && p <= "80").length
      let datasetC9 = passengers.map(p => p.Age).filter(p => p >= "81" && p <= "90").length


      let dataset = [datasetC1, datasetC2, datasetC3, datasetC4, datasetC5, datasetC6, datasetC7, datasetC8, datasetC9];

      this.barChartData = {
        labels,
        datasets: [{
          data: dataset, label: 'Nombre de passagers', backgroundColor: [
            'rgba(55, 200 , 125, 0.7)',
            'rgba(0, 200 , 225, 0.7)',
            'rgba(200, 200 , 225, 0.7)',
            'rgba(255, 0 , 255, 0.7)',
            'rgba(0, 255 , 0, 0.7)',
            'rgba(255, 0 , 0, 0.7)',
            'rgba(200, 150 , 150, 0.7)',
            'rgba(100, 50 , 225, 0.7)',
            'rgba(255, 255 , 0, 0.7)',
          ]
        }],

      }
    }


  }

}
