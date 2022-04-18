import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { UserService } from '../../../shared/services/user.service';

@Component({
  selector: 'app-registrarse',
  templateUrl: './registrarse.component.html',
  styleUrls: ['./registrarse.component.scss']
})
export class RegistrarseComponent implements OnInit {

  error: boolean = false;
  nuevousuarioform: FormGroup = new FormGroup({})

  constructor(private router: Router,
              private userservice : UserService) { }

  ngOnInit() {
    this.setForm()
  }

  registrarse(){
    let obj = this.nuevousuarioform.value;
    obj.role = Number(obj.role);
    console.log(obj);

    this.userservice.insert(obj).subscribe((result: any)=>{
      if(result.success){
        this.router.navigate(['/public/login']);
        alert("Usuario agregado con existo");
      }
      else{
        alert("Error al registrar el usuario");
        console.log(result);
      }
      
    })  
  }


  setForm(enable: boolean = false){
    this.nuevousuarioform = new FormGroup({
      id: new FormControl(0),
      firstName: new FormControl(''),
      lastName: new FormControl(''),
      userName: new FormControl(''),
      password: new FormControl(''),
      role: new FormControl(0),
      state: new FormControl(true)
    })
  }

  guest(){
    sessionStorage.setItem('user_role', '3');
    this.router.navigate(['/public/home']);
  }

}
