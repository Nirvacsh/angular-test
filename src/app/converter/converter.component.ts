// src/app/converter/converter.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-converter',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './converter.component.html',
  styleUrls: ['./converter.component.css'],
})
export class ConverterComponent implements OnInit {
  currencies = ['USD', 'UAH', 'EUR'];
  rates: any = {};
  amount1: number = 0;
  amount2: number = 0;
  currency1: string = 'USD';
  currency2: string = 'UAH';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.http
      .get<any>('https://api.exchangerate-api.com/v4/latest/UAH')
      .subscribe((data) => {
        this.rates = data.rates;
        this.convertCurrency1();
      });
  }

  convertCurrency1() {
    if (this.currency1 && this.currency2) {
      if (this.currency1 === this.currency2) {
        this.currency2 =
          this.currencies.find((currency) => currency !== this.currency1) ||
          'USD';
      }
      const rate = this.rates[this.currency2] / this.rates[this.currency1];
      this.amount2 = parseFloat((this.amount1 * rate).toFixed(4));
    }
  }

  convertCurrency2() {
    if (this.currency1 && this.currency2) {
      if (this.currency1 === this.currency2) {
        this.currency1 =
          this.currencies.find((currency) => currency !== this.currency2) ||
          'USD';
      }
      const rate = this.rates[this.currency1] / this.rates[this.currency2];
      this.amount1 = parseFloat((this.amount2 * rate).toFixed(4));
    }
  }

  formatAmount1() {
    this.amount1 = parseFloat(this.amount1.toFixed(4));
  }

  formatAmount2() {
    this.amount2 = parseFloat(this.amount2.toFixed(4));
  }
}
