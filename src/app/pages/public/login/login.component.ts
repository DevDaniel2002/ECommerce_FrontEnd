import { UserService } from './../../../shared/services/user.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {
  
  username: string = '';
  password: string = '';
  error: boolean = false;
  msgerror: string = "";

  constructor(private router: Router,
               private userService: UserService) { 
  }

  ngOnInit() {
    let activate = sessionStorage.getItem('user_id') != null;
    if(sessionStorage.getItem('user_role') == '1' && activate){
      this.router.navigate(['/admin/home']);
    }
    else if(activate){
      this.router.navigate(['/public/home']);
    }
  }

  
  login(){
    if(this.username === "" && this.password === ""){
      this.error = true
      this.msgerror = 'Todos los campos son obligatorios';
      setTimeout(() => {
        this.error = false;
      }, 3000);
      return;
    }
    this.userService.login(this.username, this.password)
                    .subscribe( (result:any) => {
                      if (result.success){
                        console.log(result);
                        sessionStorage.setItem('user_role', String(result.data.role));
                        sessionStorage.setItem('user_id', String(result.data.id));

                        if(result.data.role == 1){
                          this.router.navigate(['/admin/home']);
                        }
                        else{
                          this.router.navigate(['/public/home']);
                        }
                      } else {
                        this.error = true
                        this.msgerror = 'Usuario o contraseña incorrectos';
                      }
                    })
  }

  guest(){
    sessionStorage.setItem('user_role', '3');
    this.router.navigate(['/public/home']);
  }
}
