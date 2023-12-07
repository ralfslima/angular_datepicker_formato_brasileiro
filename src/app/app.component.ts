import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {DateAdapter, MatDateFormats, MatNativeDateModule, NativeDateAdapter} from '@angular/material/core';
import { MAT_DATE_FORMATS } from '@angular/material/core';

// Classe para adaptar o formato da data (funciona em angular 8+ essa estrutura)
export class FormatarData extends NativeDateAdapter {
  // Realizar formatação
  override format(date: Date, displayFormat: Object): string {
    // Caso o input receba a informação
    if (displayFormat === 'input') {
      // Converte o dia
      let day: string = date.getDate().toString();
      day = +day < 10 ? '0' + day : day;
      
      // Converte o mês
      let month: string = (date.getMonth() + 1).toString();
      month = +month < 10 ? '0' + month : month;
      
      // Converte o mês
      let year = date.getFullYear();
      return `${day}-${month}-${year}`;
    }

    // Retorno
    return date.toDateString();
  }
}
 
// Especifica para o Angular Material o formato que desejamos que seja exibido, será convertido: mm/dd/yyyy para dd/mm/yyyy
export const APP_DATE_FORMATS: MatDateFormats = {
  parse: {
    dateInput: {month: 'short', year: 'numeric', day: 'numeric'}
  },
  display: {
    dateInput: 'input',
    monthYearLabel: {year: 'numeric', month: 'numeric'},
    dateA11yLabel: {year: 'numeric', month: 'long', day: 'numeric'},
    monthYearA11yLabel: {year: 'numeric', month: 'long'}
  }
};

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [
    { provide: DateAdapter, useClass: FormatarData },
    { provide: MAT_DATE_FORMATS, useValue: APP_DATE_FORMATS }
  ]
})
export class AppComponent {
  title = 'angular-data';
}
