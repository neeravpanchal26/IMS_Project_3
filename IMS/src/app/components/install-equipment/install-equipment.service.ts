import { Injectable} from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import * as L from 'leaflet';
import 'leaflet/dist/images/marker-icon.png';

@Injectable()
export class InstallEquipmentService {

     // Global variable
  apiUrl = environment.api;
  public marker: any;
  // Default Constructor
  constructor(private http:HttpClient) { }

  getCoords():Observable<any>
  {
      return this.http.get(this.apiUrl+'/api/BLL/installEquipment.php?action=coords')as Observable<any>;
  }
  loadMap(mymap,lat,long)
  {
      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}',
      {
          attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox.streets',
          accessToken: 'pk.eyJ1IjoibWxhbmdldmVsZDE1IiwiYSI6ImNqa2R1a3A5aTFpeXkza252cDlkbDQ2MXIifQ.uTJ2w8n_rjeHtl1usY3K9Q'
        }).addTo(mymap);
        this.marker = L.marker([lat, long],{
            icon: L.icon({
                iconSize: [ 25, 41 ],
                iconAnchor: [ 13, 41 ],
                iconUrl: '../assets/marker-icon.png',
                shadowUrl: '../assets/marker-shadow.png'
            })
        }).openTooltip().addTo(mymap);
        this.marker.bindPopup(lat+', '+long).openPopup();
    }
}