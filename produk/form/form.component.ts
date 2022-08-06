import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ProdusenModel } from 'src/app/produsen/produsen.model';
import { ProdusenService } from 'src/app/produsen/produsen.service';
import { ProdukModel } from '../produk.model';
import { ProdukService } from '../produk.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  menu: string = "Tambah"
  formProduk !: FormGroup
  formProdusen !: FormGroup
  listProdusen !: ProdusenModel[]

  id !: number

  constructor(
    private produsenService : ProdusenService,
    private activedRoute : ActivatedRoute,
    private formBuilder : FormBuilder,
    private produkService : ProdukService,
    private router : Router) {

    this.formProduk = formBuilder.group({
        'nama' : new FormControl(null, [Validators.required]),
        'produsen' : new FormControl(null, [Validators.required]),
        'jenis' : new FormControl(null, [Validators.required]),
        'berat' : new FormControl(null, [Validators.required]),
        'harga' : new FormControl(null, [Validators.required]),

    })
  }

  ngOnInit(): void {
    this.getListProdusen()
    this.activedRoute.params.subscribe(route => {
      this.id = route['id']
    })
    if(this.id){
      this.findId()
      this.menu = "Update"
    }
  }

  getListProdusen(){
    this.produsenService.list().subscribe({
      next: result => {
        this.listProdusen = result
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
        console.log("Berhasil mengambil data")
      }
    })
  }

  findId(){
    this.produkService.findId(this.id).subscribe(response =>{
      this.formProduk.patchValue(response)
    })
  }

  save(){
    let produk: ProdukModel = this.formProduk.value
    produk.produsen = new ProdusenModel();
    produk.produsen_id = this.formProduk.controls['produsen'].value
    if(this.id){
      produk.id = this.id
      this.produkService.update(produk).subscribe(response =>{
        if(response.status === 200){
          this.router.navigate(['/', 'produk'])
          alert("Berhasil mengupdate data")
        }else{
          alert("gagal")
          console.log(response.body)
        }
      })
    }else{
      this.produkService.insert(produk).subscribe(response =>{
        if(response.status === 200){
          this.router.navigate(['/', 'produk'])
          alert("Berhasil menginput data")
        }else{
          alert("gagal")
          console.log(response.body)
        }
      })
    }
  }

}
