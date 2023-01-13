import { MatFormFieldModule } from '@angular/material/form-field';
import { PassengersListComponent } from './passengers-list/passengers-list.component';
import { PassengersGraphComponent } from './passengers-graph/passengers-graph.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { NgChartsModule } from 'ng2-charts';
import { PassengersSearchComponent } from './passengers-search/passengers-search.component';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';



@NgModule({
  declarations: [
    PassengersGraphComponent,
    PassengersListComponent,
    PassengersSearchComponent
  ],
  imports: [
    CommonModule,
    NgChartsModule,
    MatCardModule,
    FormsModule,
    MatFormFieldModule,
    MatChipsModule

  ],
  exports: [
    PassengersGraphComponent,
    PassengersListComponent,
    PassengersSearchComponent
  ]
})
export class PassengersModule { }
