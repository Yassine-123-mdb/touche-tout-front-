
import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../model/User';
import { AuthService } from '../service/auth.service';
@Component({
  selector: 'app-verif-email',
  templateUrl: './verif-email.component.html',
  styleUrls: ['./verif-email.component.css']
  })
  export class VerifEmailComponent implements OnInit{
  code:string="";
  user:User=new User();
  err="";
  public roles!:string[];
  public regitredUser : User = new User();
  
  constructor(private route:ActivatedRoute,private authService:AuthService,
  private router:Router
  ) {}
  ngOnInit(): void {
  this.user =this.authService.getRegistredUser();
  }
  onValidateEmail() {
    this.authService.validateEmail(this.code).subscribe({
      next: (res) => {
        alert("Login successful");
       
            this.regitredUser = res;
            this.roles = res.roles;
            if (this.roles?.includes('ADMIN')) {
              this.router.navigate(['/admin']);
            } else if (this.roles?.includes('CLIENT')) {
              this.router.navigate(['/client']);
            } else {
              this.router.navigate(['/prestataire']);
            }
          },
          error: (err: any) => {
            console.log(err);
          },
        });
      }
  }