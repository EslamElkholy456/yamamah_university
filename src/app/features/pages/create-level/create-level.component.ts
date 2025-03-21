import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LevelService } from '../../../core/services/level/level.service';
import { ToastrService } from 'ngx-toastr';
import { NgFor } from '@angular/common';



@Component({
  selector: 'app-create-level',
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './create-level.component.html',
  styleUrl: './create-level.component.scss'
})
export class CreateLevelComponent implements OnInit {
  levelForm!: FormGroup;

  constructor(private fb: FormBuilder, private levelService: LevelService) {}
  private readonly toastr=inject(ToastrService)

  ngOnInit() {
    this.levelForm = this.fb.group({
      name: ['', Validators.required],
      order: [0, Validators.required],
      isPublished: [false],
      prerequisiteCoursesCount: [0, Validators.required],
      courses: this.fb.array([])
    });
  }

  get coursesFormArray() {
    return this.levelForm.get('courses') as FormArray;
  }

  addCourse() {
    this.coursesFormArray.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number) {
    this.coursesFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.levelForm.valid) {
      this.levelService.postLevel(this.levelForm.value).subscribe(() => {
        console.log('Level created successfully');
        this.toastr.success('Level created successfully')
        // يمكنك إضافة رسالة نجاح للمستخدم
      });
    }
  }
}
