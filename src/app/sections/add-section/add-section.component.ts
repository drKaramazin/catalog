import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';

import { MenuService } from '../../services/menu.service';
import { SectionForm } from '../../models/section-form';

@Component({
  selector: 'app-add-section',
  templateUrl: './add-section.component.html',
  styleUrls: ['./add-section.component.scss']
})
export class AddSectionComponent implements OnInit, OnDestroy {

  willBeDestroyed = new Subject();

  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group(this.menuService.getSectionForm({
      name: '',
      color: null,
      section: null,
    }));

    this.route.params.pipe(
      takeUntil(this.willBeDestroyed),
      filter((params) => !!params.id),
    ).subscribe((params) => this.form.controls.section.patchValue(params.id));
  }

  submit(value: SectionForm) {
    this.menuService.addSection(value);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.willBeDestroyed.next();
    this.willBeDestroyed.complete();
  }

}
