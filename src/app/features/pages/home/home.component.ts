import { Component, inject, OnInit } from '@angular/core';
import { CoursesComponent } from "../courses/courses.component";
import { UsersService } from '../../../core/services/users/users.service';
import { AuthService } from '../../../core/services/auth/auth.service';
import { jwtDecode } from 'jwt-decode';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CoursesComponent,RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  private readonly usersService=inject(UsersService)
  private readonly authService=inject(AuthService)

  orgCount:any;
  stdCount:any;
  facCount:any;
  userToken: any;
  userRole: string | undefined;

  ngOnInit(): void {
    this.orgnizationCount();
    this.faculityCount();
    this.studentCount();
   this.accRole()
  }

  orgnizationCount():void{
    this.usersService.getAllOrgnizationCount().subscribe({
      next:(res)=>{
        console.log(res);
        this.orgCount=res
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  studentCount():void{
    this.usersService.getAllStudentCount().subscribe({
      next:(res)=>{
        console.log(res);
        this.stdCount=res
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  faculityCount():void{
    this.usersService.getAllFacCount().subscribe({
      next:(res)=>{
        console.log(res);
        this.facCount=res
        
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }
  
accRole():void{
 this.userToken=jwtDecode(localStorage.getItem('token')!)
    console.log(this.userToken);
    this.userRole=this.userToken.role
    console.log(this.userRole);
}

}
