import { Passenger } from './../models/PassengerModel';
import { Component, Input, OnInit } from '@angular/core';
import { PassengersDataSharedService } from '../shared/passengers-data.service';
import { Observable, Subscription } from 'rxjs';

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

  passengerSubscription!: Subscription;

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

    switch (this.selectedOption) {
      case "chartByGender":
        this.getChartByGender(passengers)
        break;

      case "chartByClasse":
        this.getChartByClasse(passengers)
        break;

      case "chartByAge":
        this.getChartByAge(passengers)
        break
      case "chartByAverageAge":
        this.getChartByAverageAgeByGender(passengers)
        break
      default:
        this.getChartByGender(passengers)

        break;
    }

  }

  getChartByGender(passengers: Passenger[]) {

    let labels = ['Male', 'Female']
    let datasetMale = passengers.map(p => p.Sex).filter(p => p == "male").length;
    let datasetFemale = passengers.map(p => p.Sex).filter(p => p == "female").length;

    let dataset = [datasetMale, datasetFemale];

    this.barChartData = {
      labels,
      datasets: [{
        data: dataset, label: 'Nombre de passagers', backgroundColor: [
          'rgba(204, 255, 102, 0.7)',
          'rgba(0, 255, 255, 0.7)'
        ]
      }],
    }
  }

  getChartByClasse(passengers: Passenger[]) {
    let labels = ['1', '2', '3']
    let datasetC1 = passengers.map(p => p.Pclass).filter(p => p == "1").length
    let datasetC2 = passengers.map(p => p.Pclass).filter(p => p == "2").length
    let datasetC3 = passengers.map(p => p.Pclass).filter(p => p == "3").length

    let dataset = [datasetC1, datasetC2, datasetC3];

    this.barChartData = {
      labels,
      datasets: [{
        data: dataset, label: 'Nombre de passagers', backgroundColor: [
          'rgba(204, 255, 153, 0.7)',
          'rgba(153, 255, 204, 0.7)',
          'rgba(255, 102, 153, 0.7)',
        ]
      }],

    }
  }

  getChartByAge(passengers: Passenger[]) {
    let labels = ['1-10', '11-20', '21-30', '31-40', '41-50', '51-60', '61-70', '71-80', '81-90']
    let datasetA1 = passengers.map(p => p.Age).filter(p => p >= "1" && p <= "10").length
    let datasetA2 = passengers.map(p => p.Age).filter(p => p >= "11" && p <= "20").length
    let datasetA3 = passengers.map(p => p.Age).filter(p => p >= "21" && p <= "30").length
    let datasetA4 = passengers.map(p => p.Age).filter(p => p >= "31" && p <= "40").length
    let datasetA5 = passengers.map(p => p.Age).filter(p => p >= "41" && p <= "50").length
    let datasetA6 = passengers.map(p => p.Age).filter(p => p >= "51" && p <= "60").length
    let datasetA7 = passengers.map(p => p.Age).filter(p => p >= "61" && p <= "70").length
    let datasetA8 = passengers.map(p => p.Age).filter(p => p >= "71" && p <= "80").length
    let datasetA9 = passengers.map(p => p.Age).filter(p => p >= "81" && p <= "90").length


    let dataset = [datasetA1, datasetA2, datasetA3, datasetA4, datasetA5, datasetA6, datasetA7, datasetA8, datasetA9];

    this.barChartData = {
      labels,
      datasets: [{
        data: dataset, label: 'Nombre de passagers', backgroundColor: [
          'rgba(255, 153, 204, 0.7)',
          'rgba(204, 255, 153, 0.7)',
          'rgba(153, 255, 204, 0.7)',
          'rgba(255, 102, 153, 0.7)',
          'rgba(153, 102, 255, 0.7)',
          'rgba(102, 153, 255, 0.7)',
          'rgba(204, 153, 255, 0.7)',
          'rgba(255, 153, 102, 0.7)',
          'rgba(102, 255, 153, 0.7)',
        ]
      }],

    }
  }

  // age en fonction des genres
  // ecart type en fonction des genres
  getChartByAverageAgeByGender(passengers: Passenger[]) {

    let labels = ['M 1-10', 'F 1-10', 'M 11-20', 'F 11-20', 'M 21-30', 'F 21-30', 'M 31-40', 'F 31-40', 'M 41-50', 'F 41-50', 'M 51-60', 'F 51-60', 'M 61-70', 'F 61-70', 'M 71-80', 'F 71-80', 'M 81-90', 'F 81-90']

    let totalMale = passengers.filter(p => p.Sex == "male").length;
    let totalFemale = passengers.filter(p => p.Sex == "female").length;

    let datasetA1Male = passengers.filter(p => (p.Age >= "1") && (p.Age <= "10") && (p.Sex == "male")).length
    let datasetA1Female = passengers.filter(p => (p.Age >= "1") && (p.Age <= "10") && (p.Sex == "female")).length
    let datasetA2Male = passengers.filter(p => (p.Age >= "11") && (p.Age <= "20") && (p.Sex == "male")).length
    let datasetA2Female = passengers.filter(p => (p.Age >= "11") && (p.Age <= "20") && (p.Sex == "female")).length
    let datasetA3Male = passengers.filter(p => (p.Age >= "21") && (p.Age <= "30") && (p.Sex == "male")).length
    let datasetA3Female = passengers.filter(p => (p.Age >= "21") && (p.Age <= "30") && (p.Sex == "female")).length
    let datasetA4Male = passengers.filter(p => (p.Age >= "31") && (p.Age <= "40") && (p.Sex == "male")).length
    let datasetA4Female = passengers.filter(p => (p.Age >= "31") && (p.Age <= "40") && (p.Sex == "female")).length
    let datasetA5Male = passengers.filter(p => (p.Age >= "41") && (p.Age <= "50") && (p.Sex == "male")).length
    let datasetA5Female = passengers.filter(p => (p.Age >= "41") && (p.Age <= "50") && (p.Sex == "female")).length
    let datasetA6Male = passengers.filter(p => (p.Age >= "51") && (p.Age <= "60") && (p.Sex == "male")).length
    let datasetA6Female = passengers.filter(p => (p.Age >= "51") && (p.Age <= "60") && (p.Sex == "female")).length
    let datasetA7Male = passengers.filter(p => (p.Age >= "61") && (p.Age <= "70") && (p.Sex == "male")).length
    let datasetA7Female = passengers.filter(p => (p.Age >= "61") && (p.Age <= "70") && (p.Sex == "female")).length
    let datasetA8Male = passengers.filter(p => (p.Age >= "71") && (p.Age <= "80") && (p.Sex == "male")).length
    let datasetA8Female = passengers.filter(p => (p.Age >= "71") && (p.Age <= "80") && (p.Sex == "female")).length
    let datasetA9Male = passengers.filter(p => (p.Age >= "81") && (p.Age <= "90") && (p.Sex == "male")).length
    let datasetA9Female = passengers.filter(p => (p.Age >= "81") && (p.Age <= "90") && (p.Sex == "female")).length

    let AverageMale1 = +((datasetA1Male / totalMale) * 100).toFixed(1);
    let AverageFemale1 = +((datasetA1Female / totalFemale) * 100).toFixed(1);
    let AverageMale2 = +((datasetA2Male / totalMale) * 100).toFixed(1);
    let AverageFemale2 = +((datasetA2Female / totalFemale) * 100).toFixed(1);
    let AverageMale3 = +((datasetA3Male / totalMale) * 100).toFixed(1);
    let AverageFemale3 = +((datasetA3Female / totalFemale) * 100).toFixed(1);
    let AverageMale4 = +((datasetA4Male / totalMale) * 100).toFixed(1);
    let AverageFemale4 = +((datasetA4Female / totalFemale) * 100).toFixed(1);
    let AverageMale5 = +((datasetA5Male / totalMale) * 100).toFixed(1);
    let AverageFemale5 = +((datasetA5Female / totalFemale) * 100).toFixed(1);
    let AverageMale6 = +((datasetA6Male / totalMale) * 100).toFixed(1);
    let AverageFemale6 = +((datasetA6Female / totalFemale) * 100).toFixed(1);
    let AverageMale7 = +((datasetA7Male / totalMale) * 100).toFixed(1);
    let AverageFemale7 = +((datasetA7Female / totalFemale) * 100).toFixed(1);
    let AverageMale8 = +((datasetA8Male / totalMale) * 100).toFixed(1);
    let AverageFemale8 = +((datasetA8Female / totalFemale) * 100).toFixed(1);
    let AverageMale9 = +((datasetA9Male / totalMale) * 100).toFixed(1);
    let AverageFemale9 = +((datasetA9Female / totalFemale) * 100).toFixed(1);

    let dataset = [AverageMale1, AverageFemale1, AverageMale2, AverageFemale2, AverageMale3, AverageFemale3, AverageMale4, AverageFemale4, AverageMale5, AverageFemale5, AverageMale6, AverageFemale6, AverageMale7, AverageFemale7, AverageMale8, AverageFemale8, AverageMale9, AverageFemale9];

    this.barChartData = {
      labels,
      datasets: [{
        data: dataset, label: 'Moyenne d\'age par genre', backgroundColor: [
          'rgba(100, 50 , 225, 0.7)',
          'rgba(255, 255 , 0, 0.7)',
          'rgba(100, 50 , 225, 0.7)',
          'rgba(255, 255 , 0, 0.7)',
          'rgba(100, 50 , 225, 0.7)',
          'rgba(255, 255 , 0, 0.7)',
          'rgba(100, 50 , 225, 0.7)',
          'rgba(255, 255 , 0, 0.7)',
          'rgba(100, 50 , 225, 0.7)',
          'rgba(255, 255 , 0, 0.7)',
          'rgba(100, 50 , 225, 0.7)',
          'rgba(255, 255 , 0, 0.7)',
          'rgba(100, 50 , 225, 0.7)',
          'rgba(255, 255 , 0, 0.7)',
          'rgba(100, 50 , 225, 0.7)',
          'rgba(255, 255 , 0, 0.7)',
          'rgba(100, 50 , 225, 0.7)',
          'rgba(255, 255 , 0, 0.7)',
        ]
      }],

    }
  }

}
