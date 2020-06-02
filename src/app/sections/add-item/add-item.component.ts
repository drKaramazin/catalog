import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuService } from '../../services/menu.service';
import { ItemForm } from '../../models/item-form';
import { filter, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit, OnDestroy {

  willBeDestroyed = new Subject();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private router: Router,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.menuService.getItemForm({
      name: '',
      sale: null,
      section: null,
    }));

    this.route.params.pipe(
      filter(params => !!params.id),
      takeUntil(this.willBeDestroyed)
    ).subscribe(params => this.form.controls.section.patchValue(params.id));
  }

  submit(value: ItemForm) {
    this.menuService.addItem(value);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.willBeDestroyed.next();
    this.willBeDestroyed.complete();
  }

}
