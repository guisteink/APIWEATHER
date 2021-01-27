import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  acess_key: string = "77a2ff88";


  constructor(private http: HttpClient) {

  }

  getWeatherDataByCity(city: string, region: string) {
    let url = "https://api.hgbrasil.com/weather?key=" + this.acess_key + "&city_name=" + city + "," + region;
    console.log(url);
    return this.http.get(url)
  }

}
