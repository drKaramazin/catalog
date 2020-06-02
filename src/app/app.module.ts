import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';

import { appInitializer } from './app-initializer';

import { AppComponent } from './app.component';
import { MenuComponent } from './sections/menu/menu.component';

import { MenuService } from './services/menu.service';
import { StoreService } from './services/store.service';
import { DataService } from './services/data.service';
import { SectionComponent } from './widgets/section/section.component';
import { ItemComponent } from './widgets/item/item.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SectionComponent,
    ItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
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
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
