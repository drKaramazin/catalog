import { Component, OnInit } from '@angular/core';

import { MenuService } from '../../services/menu.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit {

  constructor(
    public menuService: MenuService,
    public router: Router,
  ) { }

  ngOnInit(): void {
  }

  addSection() {
    this.router.navigate(['/add-section']);
  }

  addItem() {
    this.router.navigate(['/add-item']);
  }

}
