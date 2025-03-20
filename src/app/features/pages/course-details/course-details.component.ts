import { Video } from './../../../shared/interfaces/icourse';
import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course/course.service';
import { Icourse } from '../../../shared/interfaces/icourse';
import { ActivatedRoute } from '@angular/router';
import { Idetail } from '../../../shared/interfaces/idetail';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-course-details',
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {

private readonly courseService=inject(CourseService)
private readonly activatedRoute=inject(ActivatedRoute)


courseDetails:Icourse={} as Icourse
courseId:any
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next:(res)=>{
        this.courseId=res.get('id')
        console.log(this.courseId);
        
      },error:(err)=>{
        console.log(err);
        
      }
    })

    this.getCourse()
  }

  getCourse():void{
    this.courseService.getCourseById(this.courseId).subscribe({
      next:(res)=>{
this.courseDetails=res.course
console.log(this.courseDetails);




console.log(this.courseDetails);

      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }


}
