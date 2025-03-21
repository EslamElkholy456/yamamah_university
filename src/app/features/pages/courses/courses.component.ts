
import { Icourse } from '../../../shared/interfaces/icourse';
import { CourseService } from './../../../core/services/course/course.service';
import { Component, inject, OnInit } from '@angular/core';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { SearchPipe } from '../../../shared/pipes/search.pipe';



@Component({
  selector: 'app-courses',
  imports: [FormsModule,RouterLink,ReactiveFormsModule,SearchPipe],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent implements OnInit {
private readonly courseService=inject(CourseService)

courseContent:Icourse[]=[]

currentPage:any=1
totalPages:any

coursesSearch:string=''
userToken: any;
  userRole: string | undefined;



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
