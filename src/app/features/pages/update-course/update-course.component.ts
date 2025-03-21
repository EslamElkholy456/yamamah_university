import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course/course.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-course',
  imports: [ReactiveFormsModule],
  templateUrl: './update-course.component.html',
  styleUrl: './update-course.component.scss'
})
export class UpdateCourseComponent implements OnInit {

  courseId?:string;
  id:any
  
private readonly courseService=inject(CourseService)
private readonly router=inject(Router)
private readonly route =inject(ActivatedRoute)


ngOnInit(): void {
  this.id = this.route.snapshot.params['id'];
  this.courseService.getCourseById(this.id).subscribe(data => {
    this.updateForm.patchValue({
      title: data.title,
      code: data.code,
      description: data.description,
      price: data.price,
      imageUrl: data.imageUrl,
      
      isPaid: data.isPaid
    });
  });
}


updateForm:FormGroup=new FormGroup({
  title:new FormControl(''),
      code:new FormControl(''),
      description:new FormControl(''),
      price: new FormControl(0),
      imageUrl:new FormControl(''),
})

updateCourse() {
  if (this.updateForm.valid) {
    this.courseService.putUpdateCourse(this.id, this.updateForm.value).subscribe(() => {
      this.router.navigate(['/courses']);
    });
  }
}


}
