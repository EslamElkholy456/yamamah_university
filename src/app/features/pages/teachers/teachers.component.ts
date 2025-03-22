import { Component, inject, OnInit } from '@angular/core';

import { Itech } from '../../../shared/interfaces/itech';
import { NgFor } from '@angular/common';
import { InstructorsService } from '../../../core/services/instructors/instructors.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-teachers',
  imports: [NgFor,ReactiveFormsModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.scss'
})
export class TeachersComponent implements OnInit {

  private readonly instructorsService=inject(InstructorsService)

  techear:Itech[]=[]
//   currentPage:any=1
// totalPages:any

  ngOnInit(): void {
   this.instructors()
  }


  instructors():void{
    this.instructorsService.getInstructors().subscribe({
      next: (res) => {
        this.techear = res.users 
        console.log(this.techear);
        
      },
      error: (err) => {
        console.log(err);
        
      }
    });

  }

  // showInstructors():void{
  //  this.usersService.getAllInstructors().subscribe({
  //   next:(res)=>{
  //     console.log(res);
  //     this.tech=res
      
  //   },error:(err)=>{
  //     console.log(err);
      
  //   }
  //  })
  // }

}
