import { FormArray, FormBuilder, FormControl, FormControlName, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule, NgFor } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { CourseService } from '../../../core/services/course/course.service';
import { Router } from '@angular/router';

interface Video {
  title: string;
  videoUrl: string;
  materials: string[];
}

interface Module {
  moduleTitle: string;
  videos: Video[];
}


@Component({
  selector: 'app-create-course',
  imports: [NgFor,CommonModule, ReactiveFormsModule],
  templateUrl: './create-course.component.html',
  styleUrl: './create-course.component.scss'
})
export class CreateCourseComponent implements OnInit {

  courseForm: FormGroup;
private readonly router=inject(Router)
  constructor(private fb: FormBuilder, private coursesService: CourseService) {
    this.courseForm = this.fb.group({
      title: ['', Validators.required],
      code: ['', Validators.required],
      description: ['', Validators.required],
      instructor: ['', Validators.required],
      price: [0, Validators.required],
      studentsEnrolled: [0],
      content: this.fb.array([]),
      category: ['', Validators.required],
      reviews: this.fb.array([]),
      rating: [0],
      isPublished: [true],
      creditHours: [0],
      courseType: ['required'],
      prerequisites: this.fb.array([]),
      requirementType: ['college']
    });
  }
  ngOnInit(): void {
    throw new Error('Method not implemented.');
  }

  get contentForms() {
    return this.courseForm.get('content') as FormArray;
  }

  addModule() {
    const module = this.fb.group({
      moduleTitle: ['', Validators.required],
      videos: this.fb.array([])
    });
    this.contentForms.push(module);
  }

  getVideosForms(index: number) {
    return this.contentForms.at(index).get('videos') as FormArray;
  }

  addVideo(index: number) {
    const video = this.fb.group({
      title: ['', Validators.required],
      videoUrl: ['', Validators.required],
      materials: this.fb.array([])
    });
    this.getVideosForms(index).push(video);
  }

  onSubmit() {
    if (this.courseForm.valid) {
      this.coursesService.createCourse(this.courseForm.value).subscribe(
        (response) => {
          console.log('Course created successfully:', response);
          this.router.navigate(['/courses'])
          // يمكنك إضافة أي إجراءات أخرى هنا بعد إنشاء الدورة بنجاح
        },
        (error) => {
          console.error('Error creating course:', error);
          // يمكنك إضافة معالجة الأخطاء هنا
        }
      );
    }
  }
}
