
import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course/course.service';
import { Icourse } from '../../../shared/interfaces/icourse';
import { ActivatedRoute, Router } from '@angular/router';

import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-course-details',
  imports: [],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent implements OnInit {

private readonly courseService=inject(CourseService)
private readonly activatedRoute=inject(ActivatedRoute)
private readonly router=inject(Router)


courseDetails:Icourse={} as Icourse
courseId:any
userToken: any;
  userRole: string | undefined;


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
    this.accRole()
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

  delete(id:string):void{
    this.courseService.deleteCourse(id).subscribe({
      next:(res)=>{
        console.log(res);
        this.router.navigate(['/courses'])
        
      },
      error:(err)=>{
        console.log(err);
        
      }
    })
  }

  editCourse():void{
    this.router.navigate(['/updateCourse', { id: this.courseId }]);
  }

  accRole():void{
    this.userToken=jwtDecode(localStorage.getItem('token')!)
       console.log(this.userToken);
       this.userRole=this.userToken.role
       console.log(this.userRole);
   }

}
