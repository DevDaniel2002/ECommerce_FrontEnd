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
  cantidad: number = 1;

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
    });
  }

  seleccionarProducto(producto: Products){
    this.productoSeleccionado = producto;
  }

  alert(){
    alert(`El producto ${this.productoSeleccionado.name} ha sido comprado con éxito`);
  }
  
  sumar(){
    this.productoSeleccionado.quantity = this.productoSeleccionado.quantity + 1;
  }
  restar(){
    this.productoSeleccionado.quantity = this.productoSeleccionado.quantity - 1;
  }
  update(){
    this.productservice.update(this.productoSeleccionado);
  }
}
