import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../shared/services/product.service';
import { Products  } from "./../../../shared/models/product.model";


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  products: Products[] = []
  _products: Products[] = []
  productoSeleccionado: any

  constructor(private productservice: ProductService) { }

  ngOnInit() {
    this.obtenerProducto()
  }

  obtenerProducto(){
    this.productservice.getAll().subscribe((result:any) => {
      if(result.success){
        this.products = result.data;
        this._products = result.data;
        this.productoSeleccionado = undefined;
      }
      console.log(result)
    });
  }

  seleccionarProducto(producto: Products){
    this.productoSeleccionado = producto;
    console.log(this.productoSeleccionado);

  }

  alert(){
    alert(`El producto ${this.productoSeleccionado.name} ha sido comprado con éxito`);
  }

}
