import { Injectable } from '@angular/core';
import { Section } from '../models/section';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  read(): Observable<Section[]> {
    return this.http.get('/data/menu.json') as Observable<Section[]>;
  }

}
