import { Component, OnInit } from '@angular/core';
import { ProdukModel } from '../produk.model';
import { ProdukService } from '../produk.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  listProduk !: ProdukModel[]

  constructor(private produkService : ProdukService) { }

  ngOnInit(): void {
    this.getList()
  }

  getList(){
    this.produkService.list().subscribe({
      next: result => {
        this.listProduk = result
      },
      error: err => {
        console.log(err)
      },
      complete: () => {
        console.log("Berhasil mengambil data")
      }
    })
  }

  delete(id:number){
    this.produkService.delete(id).subscribe(response =>{
      if(response.status === 200){
        alert("Berhasil menghapus data")
        window.location.reload
      }else{
        alert("Gagal menghapus data")
      }
    })
  }

}
