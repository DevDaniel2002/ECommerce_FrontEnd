import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'eCommerceFE';
  showNavBar = true;

  constructor(private router: Router,http : HttpClient, private activatedRoute: ActivatedRoute) { 
    
  }
  
  ngOnInit() {
    this.router.events.subscribe( event => {
        if(this.router.url.split("/").includes("login") || this.router.url.split("/").includes("registrarse")){
          this.showNavBar = false;
        } else {
          this.showNavBar = true;
        }
    })
    if(this.router.url.split("/").includes("login") || this.router.url.split("/").includes("registrarse")){
      this.showNavBar = false;
    } else {
      this.showNavBar = true;
    }

    let activateId = sessionStorage.getItem('user_id') != null;
    let role = sessionStorage.getItem('user_role');

    if (!activateId && role != '3') {
      this.router.navigate(['/public/login']);
    }
    else if('1' == role && activateId){
      this.router.navigate(['/admin/home']);
    }
  }
}
