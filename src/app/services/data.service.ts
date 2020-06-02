import { Injectable } from '@angular/core';
import { DataSection } from '../models/data-section';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Section } from '../models/section';
import { UtilService } from './util.service';
import { DataItem } from '../models/data-item';
import { Item } from '../models/item';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(
    private http: HttpClient,
  ) { }

  dataItemToItem(source: DataItem): Item {
    return {
      id: UtilService.guid(),
      name: source.name,
      sale: source.sale,
    };
  }

  dataSectionToSection(source: DataSection[]): Section[] {
    const result: Section[] = [];

    source.forEach((section) => {
      const newSection: Section = {
        name: section.name,
        id: UtilService.guid(),
        sections: section.sections && section.sections.length ? this.dataSectionToSection(section.sections) : [],
        items: section.items && section.items.length ? section.items.map((item) => this.dataItemToItem(item)) : [],
        color: null,
      };
      result.push(newSection);
    });

    return result;
  }

  read(): Observable<DataSection[]> {
    return this.http.get('/data/menu.json') as Observable<DataSection[]>;
  }

}
