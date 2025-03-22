import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MarksService } from '../../../core/services/marks/marks.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-marks',
  imports: [ReactiveFormsModule],
  templateUrl: './marks.component.html',
  styleUrl: './marks.component.scss'
})
export class MarksComponent {
  private readonly marksService=inject(MarksService)
  private readonly toastrService=inject(ToastrService)
  private readonly router=inject(Router)

  markForm:FormGroup=new FormGroup({
    userId:new FormControl(null,[Validators.required]),
    courseId:new FormControl(null,[Validators.required]),
    score:new FormControl(null,[Validators.required]),
    officialScore:new FormControl(null,[Validators.required]),

  })

  addMark():void{
this.marksService.postAddMark(this.markForm.value).subscribe({
  next:(res)=>{
    console.log(res);
    this.toastrService.success(res.status,'mark')
    this.router.navigate(['/home'])
    
  },error:(err)=>{
    console.log(err);
    this.toastrService.error(err.error.message)
    
  }
})
  }

}
