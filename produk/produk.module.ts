import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProdukRoutingModule } from './produk-routing.module';
import { ListComponent } from './list/list.component';
import { FormComponent } from './form/form.component';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    ListComponent,
    FormComponent
  ],
  imports: [
    CommonModule,
    ProdukRoutingModule,

    // Add Module Form
    ReactiveFormsModule,
    FormsModule,

    // Agar bisa akses service api (Get, Post)
    HttpClientModule
  ]
})
export class ProdukModule { }
