import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListItemsComponent } from './list-items/list-items.component';
import { AddItemComponent } from './add-item/add-item.component';
import {  HttpClientModule, HttpClient } from '@angular/common/http';
import {FormBuilder, FormGroup, Validators, ReactiveFormsModule} from "@angular/forms";
import { EditItemComponent } from './edit-item/edit-item.component';
import { ItemGoInComponent } from './item-go-in/item-go-in.component';
import { ItemComeOutComponent } from './item-come-out/item-come-out.component';

@NgModule({
  declarations: [
    AppComponent,
    ListItemsComponent,
    AddItemComponent,
    EditItemComponent,
    ItemGoInComponent,
    ItemComeOutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
