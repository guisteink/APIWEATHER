import { Component, OnInit } from '@angular/core';
import { WeatherService } from '../weather.service';
import { CardService } from '../card.service';
import { Card } from '../card';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  city: string = "";
  region: string = "";
  unit: string = "m";

  city_get: string = "";
  region_get: string = "";
  temperature_get: number = 0;
  wind_speed_get: number = 0;
  humidity_get: number = 0;
  localtime_get: number = 0;

  weather: any;
  cards: Card[] = [];

  constructor(
    private WeatherService: WeatherService,
    private CardService: CardService,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.CardService.get()
      .subscribe((cards) => this.cards = cards);
  }

  getData() {
    this.WeatherService.getWeatherDataByCity(this.city, this.region).subscribe((data: any) => {
      this.weather = data;
      this.city_get = data.results.city_name;
      this.region_get = data.results.city;
      this.temperature_get = data.results.temp;
      this.wind_speed_get = data.results.wind_speedy;
      this.humidity_get = data.results.humidity;
      this.localtime_get = data.results.date + data.results.time;
    });
    this.clearFields();
    this.exibeCard('single_card')
  }

  save() {
    this.CardService.add({
      city: this.weather.results.city_name,
      region: this.weather.results.city,
      temperature: this.weather.results.temp,
      wind_speed: this.weather.results.wind_speedy,
      humidity: this.weather.results.humidity,
      localtime: this.weather.results.date
    })
      .subscribe(
        (card) => {
          this.clearFields();
        },
        (erro) => {
          console.error(erro);
        })
    this.clearFields();
    this.notify(`Saved`);
  }

  clearFields() {
    this.city = "";
    this.region = "";
  }

  delete(card: Card) {
    console.log(card);
    this.CardService.del(card)
      .subscribe(
        (erro) => console.log(erro)
      )
    this.notify('Removed');
  }

  reload() {
    window.location.reload();
  }

  notify(msg: string) {
    this.snackBar.open(msg, "OK", { duration: 3000 });
    this.reload();
  }

  exibeCard(name_div: string) {
    let flag = document.getElementById(name_div);
    if (flag) {
      if (flag.style.display == 'block') {
        flag.style.display = 'none';
      }
      else
        flag.style.display = 'block';
    }
  }

}
