import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ProdukModel } from './produk.model';

@Injectable({
  providedIn: 'root'
})
export class ProdukService {

  // Function untuk panggil data API
  constructor(private http : HttpClient) { }


  // Function list
  list() {
    return this.http.get<ProdukModel[]>(`${environment.baseUrl}/produk`);
  }

  // Function FindId
  findId(id: number) {
    return this.http.get<ProdukModel>(`${environment.baseUrl}/produk/${id}`);
  }

  // Function Insert
  insert(value: ProdukModel) {
    return this.http.post(`${environment.baseUrl}/produk/create`, value, {observe: "response"})
  }

  // Function Update
  update(value: ProdukModel) {
    return this.http.put(`${environment.baseUrl}/produk/update`, value, {observe: "response"})
  }

  // Function Delete
  delete(id: number) {
    return this.http.delete(`${environment.baseUrl}/produk/delete/${id}`, {observe: "response"})
  }

}
