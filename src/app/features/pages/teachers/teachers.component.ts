import { Component, inject, OnInit } from '@angular/core';
import { UsersService } from '../../../core/services/users/users.service';
import { Itech } from '../../../shared/interfaces/itech';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-teachers',
  imports: [NgFor],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent implements OnInit {

  private readonly usersService=inject(UsersService)

  tech:Itech[]=[]
//   currentPage:any=1
// totalPages:any

  ngOnInit(): void {
    this.showInstructors()
  }


  showInstructors():void{
   this.usersService.getAllInstructors().subscribe({
    next:(res)=>{
      console.log(res);
      this.tech=res
      
    },error:(err)=>{
      console.log(err);
      
    }
   })
  }

}
