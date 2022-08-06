import { ProdusenModel } from "../produsen/produsen.model"

export class ProdukModel{
  id !: number
  nama !: string
  jenis !: string
  berat !: string
  harga !: number
  produsen_id !: number
  produsen_nama !: string
  produsen !: ProdusenModel
}
