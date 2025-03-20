import { NgFor } from '@angular/common';
import { Icourse } from '../../../shared/interfaces/icourse';
import { CourseService } from './../../../core/services/course/course.service';
import { Component, inject, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-courses',
  imports: [FormsModule,RouterLink,ReactiveFormsModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
private readonly courseService=inject(CourseService)

courseContent:Icourse[]=[]

currentPage:any=1
totalPages:any



ngOnInit(): void {
  this.getCourses()
}

getCourses():void{
  this.courseService.getAllCourses(this.currentPage).subscribe({
    next:(res)=>{
      console.log(res.courses);
      this.courseContent=res.courses
      this.totalPages=res.totalPages
      
    },error:(err)=>{
      console.log(err);
      
    }
  })
}

nextPage(): void {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.getCourses()
  }
}

prevPage(): void {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.getCourses();
  }
}


getSearch():void{
  this.courseService.searchByName().subscribe({
    next:(res)=>{
      console.log(res);
      
    },error:(err)=>{
      console.log(err);
      
    }
  })
}

}
