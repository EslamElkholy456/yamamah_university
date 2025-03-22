import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users/users.service';
import { jwtDecode } from 'jwt-decode';
import { Iprofile } from '../../../shared/interfaces/iprofile';
import { ToastrService } from 'ngx-toastr';
import { MarksService } from '../../../core/services/marks/marks.service';
import { Imark } from '../../../shared/interfaces/imark';


@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {

private readonly usersService=inject(UsersService)
private readonly marksService=inject(MarksService)
private readonly toaster=inject(ToastrService)
// profileId:any=this.authService.userId
userToken:any;
userRole: string | undefined;
userId:any
profile:Iprofile={} as Iprofile
mark:Imark[]=[]


// id:any
  ngOnInit(): void {
    this.userData()
    this. userProfile(this.userId)
    this.studentMark(this.userId)
  }

 

  userData():void{
    this.userToken=jwtDecode(localStorage.getItem('token')!)
    
    this.userRole=this.userToken.role
    this.userId=this.userToken.userId
    
  }

  userProfile(id:string):void{
    this.usersService.getUserById(id).subscribe({
      next:(res)=>{
        this.profile=res.user
       
        
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
  deleteUser(id:string):void{
    this.usersService.deleteUserById(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.toaster.success('delete Account')
        
      },
      error:(err)=>{
        console.log(err);
        this.toaster.error(err.errors.message)
        
      }
    })
  }

  studentMark(id:string):void{
    this.marksService.getStudentMark(id).subscribe({
      next:(res)=>{
        this.mark=res.marks
        console.log(this.mark);
        
      },error:(err)=>{
        console.log(err);
        
      }
    })
  }
}
