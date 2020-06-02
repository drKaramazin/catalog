import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';

import { ItemForm } from '../../models/item-form';
import { MenuService } from '../../services/menu.service';
import { Item } from '../../models/item';

@Component({
  selector: 'app-edit-item',
  templateUrl: './edit-item.component.html',
  styleUrls: ['./edit-item.component.scss']
})
export class EditItemComponent implements OnInit, OnDestroy {

  willBeDestroyed = new Subject();

  form: FormGroup;
  item: Item;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private menuService: MenuService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.willBeDestroyed),
      filter((params) => !!params.id),
    ).subscribe((params) => {
      this.item = this.menuService.getItem(params.id);
      this.form = this.formBuilder.group(this.menuService.getItemForm({
        name: this.item.name,
        section: this.menuService.getItemSection(params.id).id,
        sale: this.item.sale,
      }));
    });
  }

  submit(value: ItemForm) {
    this.menuService.editItem(this.item.id, value);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.willBeDestroyed.next();
    this.willBeDestroyed.complete();
  }

}
