import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  uahToUsd: number = 0;
  uahToEur: number = 0;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchExchangeRates();
  }

  fetchExchangeRates() {
    this.http
      .get<any>('https://api.exchangerate-api.com/v4/latest/UAH')
      .subscribe((data) => {
        this.uahToUsd = 1 / data.rates.USD;
        this.uahToEur = 1 / data.rates.EUR;
      });
  }
}
