import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products  } from "./../../../shared/models/product.model";
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

  producto: Products[] = []
  productoSeleccionado: Products | undefined
  productform: FormGroup = new FormGroup({})
  constructor(private router: Router,
              private productService: ProductService) { 

              }

  ngOnInit() {
    this.obtenerProducto();
    this.productform = new FormGroup({
      id: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.id : 0),
      name: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.name : ''),
      price: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.price : 0),
      quantity: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.quantity : 0),
      description: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.description : ''),
      state: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.state : ''),
      image: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.image : ''),
    })
  }

  obtenerProducto(){
    this.productService.getAll().subscribe((result:any) => this.producto = result.data);
  }

  agregarProducto(){
    if(this.productoSeleccionado){
      this.productService.insert(this.productoSeleccionado).subscribe((result:any) => result.data);
    }
  }
}
