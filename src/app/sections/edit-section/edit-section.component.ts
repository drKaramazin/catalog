import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { filter, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

import { MenuService } from '../../services/menu.service';
import { SectionForm } from '../../models/section-form';
import { FoundedSection } from '../../models/founded-section';

@Component({
  selector: 'app-edit-section',
  templateUrl: './edit-section.component.html',
  styleUrls: ['./edit-section.component.scss']
})
export class EditSectionComponent implements OnInit, OnDestroy {

  willBeDestroyed = new Subject();

  form: FormGroup;

  section: FoundedSection;
  id: string;

  constructor(
    private route: ActivatedRoute,
    private menuService: MenuService,
    private formBuilder: FormBuilder,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.pipe(
      takeUntil(this.willBeDestroyed),
      filter((params) => !!params.id),
    ).subscribe((params) => {
      this.id = params.id;
      this.section = this.menuService.getSection(this.id);
      const parent = this.menuService.getParent(this.section.parent[this.section.index].id);

      this.form = this.formBuilder.group(this.menuService.getSectionForm({
        name: this.section.parent[this.section.index].name,
        color: this.section.parent[this.section.index].color,
        section: parent ? parent.id : null,
      }));
    });
  }

  submit(value: SectionForm) {
    this.menuService.editSection(this.id, value);
    this.router.navigate(['/']);
  }

  ngOnDestroy() {
    this.willBeDestroyed.next();
    this.willBeDestroyed.complete();
  }

}
