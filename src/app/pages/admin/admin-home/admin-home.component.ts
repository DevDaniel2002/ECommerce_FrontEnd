import { ProductService } from './../../../shared/services/product.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Products  } from "./../../../shared/models/product.model";
import { FormControl, FormGroup } from '@angular/forms';
import { UserService } from 'src/app/shared/services/user.service';
import { User } from 'src/app/shared/models/user.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.scss']
})
export class AdminHomeComponent implements OnInit {

   products: Products[] = []
  _products: Products[] = []
  productoSeleccionado: any
  productform: FormGroup = new FormGroup({})
  image:any = []

  btnActions = {
    editOrSave: false, // false = editar, true = guardar
    saveButtons: false
  }
  constructor(private router: Router,
              private productService: ProductService,
              private userS:UserService) { 
                let user:User ={
                  id:0,
                  firstName: 'Juan',
                  lastName: 'perez',
                  userName: 'jp01',
                  password: '12345',
                  role: 2,
                  state: true
                }

                userS.insert(user).subscribe(result =>{
                  console.log(result)
                })

              }

  ngOnInit() {
    this.obtenerProducto();
    this.setForm();
    this.setInput();
  }

  obtenerProducto(){
    this.productService.getAll().subscribe((result:any) => {
      if(result.success){
        this.products = result.data;
        this._products = result.data;
        this.productoSeleccionado = undefined;
        this.setForm();
        this.btnActions.saveButtons = false;
      }
    });
  }

  agregarProducto(){
    let obj = this.productform.value
    if(this.image.length > 0)
      obj.image = this.image

    this.productService.insert(obj).subscribe((result:any) => {
      if(result.success){
        this.obtenerProducto();
        alert("Producto agregado con exito")
      }
      else{
        alert("Error al guardar el producto")
        console.log(result)
      }
    });
  }

  editarProducto(){
    if(this.productoSeleccionado){
      Object.assign(this.productoSeleccionado, this.productform.value);
      this.productoSeleccionado.image = this.image

      this.productService.update(this.productoSeleccionado).subscribe((result:any) => {
        if(result.success){
          this.obtenerProducto();
          alert("Producto editado con exito")
        }
        else{
          alert("Error al actualizar el producto")
          console.log(result)
        }
      });
    }
  }

  setForm(enable: boolean = false){
    this.productform = new FormGroup({
      id: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.id : '0'),
      name: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.name : ''),
      price: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.price : 0),
      quantity: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.quantity : 0),
      description: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.description : ''),
      state: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.state : ''),
      image: new FormControl(this.productoSeleccionado ? this.productoSeleccionado.image : ''),
    })
    
    setTimeout(() => {
      enable == true
      ? this.productform.enable() 
      : this.productform.disable();
      
    }, 100);   

  }

  selectProduct(product: Products){
    this.productoSeleccionado = product;this.btnActions.saveButtons = false;
    this.setForm();
  }

  setEdit(){
    this.btnActions.editOrSave = false;
    this.btnActions.saveButtons = true;
    this.image = ""
    this.setForm(true);
  }

  setSave(){
    this.btnActions.editOrSave = true;
    this.btnActions.saveButtons = true;
    this.productoSeleccionado = undefined;
    this.image = ""
    this.setForm(true);
  }

  cancel(){
    this.btnActions.editOrSave == true 
    ? this.productoSeleccionado = undefined
    : this.setForm();


    this.btnActions.saveButtons = false;
    this.setForm();
  }

  save(){
    if(this.btnActions.editOrSave == true){
      this.agregarProducto();
    }
    else{
      this.editarProducto();
    }
  }

  delete(){
    this.productService.delete(this.productoSeleccionado.id).subscribe((result:any) => {
      if(result.success){
        this.obtenerProducto();
        alert("Producto eliminado con exito")
      }
      else{
        alert("Error al eliminar el producto")
        console.log(result)
      }
    });
  }

  search(event: any){
    let value = event.target.value.trim().toLowerCase();

    if(value == undefined || value == ''){
      this.products = this._products;
      return
    }
    this.products = this._products.filter(product => {
      return product.name.toLowerCase().includes(value.toLowerCase())
    });
  }

  toBase64 = (file:any) => new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = error => reject(error);
  });

  setInput(){
    const input:any = document.getElementById('image')
    
    input?.addEventListener('change', async (e:any) => {
      this.image = await this.toBase64(input.files[0]);
    })
  }
}