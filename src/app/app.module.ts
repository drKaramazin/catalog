import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';

import { appInitializer } from './app-initializer';

import { AppComponent } from './app.component';
import { MenuComponent } from './sections/menu/menu.component';
import { SectionComponent } from './widgets/section/section.component';
import { ItemComponent } from './widgets/item/item.component';

import { MenuService } from './services/menu.service';
import { StoreService } from './services/store.service';
import { DataService } from './services/data.service';
import { UtilService } from './services/util.service';
import { AddSectionComponent } from './sections/add-section/add-section.component';
import { AddItemComponent } from './sections/add-item/add-item.component';
import { PopUpMenuComponent } from './widgets/pop-up-menu/pop-up-menu.component';
import { ColorComponent } from './widgets/color/color.component';
import { EditSectionComponent } from './sections/edit-section/edit-section.component';
import { SectionFormComponent } from './forms/section-form/section-form.component';
import { EditItemComponent } from './sections/edit-item/edit-item.component';
import { ItemFormComponent } from './forms/item-form/item-form.component';
import { CanUpPipe } from './pipes/can-up.pipe';
import { CanDownPipe } from './pipes/can-down.pipe';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SectionComponent,
    ItemComponent,
    AddSectionComponent,
    AddItemComponent,
    PopUpMenuComponent,
    ColorComponent,
    EditSectionComponent,
    SectionFormComponent,
    EditItemComponent,
    ItemFormComponent,
    CanUpPipe,
    CanDownPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializer,
      multi: true,
      deps: [MenuService],
    },
    MenuService,
    StoreService,
    DataService,
    UtilService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
