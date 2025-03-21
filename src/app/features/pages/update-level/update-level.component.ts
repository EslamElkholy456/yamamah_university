import { Component, inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { LevelService } from '../../../core/services/level/level.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NgFor } from '@angular/common';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-update-level',
  imports: [ReactiveFormsModule,NgFor],
  templateUrl: './update-level.component.html',
  styleUrl: './update-level.component.scss'
})
export class UpdateLevelComponent implements OnInit {

  levelForm!: FormGroup;
  levelId!: string; // إضافة levelId لتخزين معرف المستوى

  constructor(
    private fb: FormBuilder,
    private levelService: LevelService,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  private readonly toaster=inject(ToastrService)

  ngOnInit() {
    this.levelId = this.route.snapshot.params['id']; // الحصول على معرف المستوى من الرابط

    this.levelForm = this.fb.group({
      name: [''],
      order: [0],
      isPublished: [false],
      prerequisiteCoursesCount: [0],
      courses: this.fb.array([])
    });

    if (this.levelId) {
      this.levelService.getAllLevelsById(this.levelId).subscribe(level => {
        this.levelForm.patchValue(level);
        // تحديث FormArray بالدورات الموجودة
        this.coursesFormArray.clear();
        level.courses.forEach((course: any) => this.coursesFormArray.push(this.fb.control(course)));
      });
    }
  }

  get coursesFormArray() {
    return this.levelForm.get('courses') as FormArray;
  }

  addCourse() {
    this.coursesFormArray.push(this.fb.control(''));
  }

  removeCourse(index: number) {
    this.coursesFormArray.removeAt(index);
  }

  onSubmit() {
    if (this.levelForm.valid) {
      if (this.levelId) {
        // تحديث المستوى
        this.levelService.putUpdateLevel(this.levelId, this.levelForm.value).subscribe(() => {
          console.log('Level updated successfully');
          this.toaster.success('Level updated successfully')
          this.router.navigate(['/levels']); // التوجيه إلى صفحة عرض المستويات
        });
      } else {
        // إنشاء مستوى جديد
        // this.levelService.postLevel(this.levelForm.value).subscribe(() => {
        //   console.log('Level created successfully');
        //   this.router.navigate(['/levels']); // التوجيه إلى صفحة عرض المستويات
        // });
      }
    }
  }

  delete(id:string):void{
    this.levelService.deleteLevel(id).subscribe({
      next:(res)=>{
        console.log(res);
        
        this.toaster.success('level deleted successfully')
      },error:(err)=>{
        console.log(err)
        this.toaster.warning('something is wrong');
        
      }

    })
  }



}
