import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forget-pass',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './forget-pass.component.html',
  styleUrl: './forget-pass.component.scss'
})
export class ForgetPassComponent {

  private readonly authService=inject(AuthService)
  private readonly router=inject(Router)
  private readonly toaster=inject(ToastrService)

  forgetForm:FormGroup=new FormGroup({
    identifier:new FormControl(null,[Validators.required,Validators.email])
  })

  submitEmail():void{
    this.authService.forgetPassword(this.forgetForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.status==200) {
          this.toaster.success(res.message,'success')
          this.router.navigate(['/otp'])
        }
        
      },error:(err)=>{
        console.log(err);
        this.toaster.error(err.error.message,'error')
        
      }
    })
  }
}
