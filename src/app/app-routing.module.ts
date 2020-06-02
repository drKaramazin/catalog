import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuComponent } from './sections/menu/menu.component';
import { AddSectionComponent } from './sections/add-section/add-section.component';
import { EditSectionComponent } from './sections/edit-section/edit-section.component';
import { AddItemComponent } from './sections/add-item/add-item.component';
import { EditItemComponent } from './sections/edit-item/edit-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'menu', pathMatch: 'full' },
  { path: 'menu', component: MenuComponent },
  { path: 'add-section', component: AddSectionComponent },
  { path: 'add-section/:id', component: AddSectionComponent },
  { path: 'edit-section/:id', component: EditSectionComponent },
  { path: 'add-item', component: AddItemComponent },
  { path: 'add-item/:id', component: AddItemComponent },
  { path: 'edit-item/:id', component: EditItemComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
