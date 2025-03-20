import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { authGuard } from '../../../core/guards/auth.guard';
import { AuthService } from '../../../core/services/auth/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-otp',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './otp.component.html',
  styleUrl: './otp.component.scss'
})
export class OtpComponent {

private readonly authService=inject(AuthService)
private readonly router=inject(Router)
private readonly toaster=inject(ToastrService)
verfiyForm:FormGroup=new FormGroup({
  otpCode:new FormControl(null,[Validators.required]),
  email:new FormControl(null,[Validators.required,Validators.email]),
  newPassword:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
})

submitOtp():void{
  this.authService.resetPassword(this.verfiyForm.value).subscribe({
next:(res)=>{
  console.log(res);
  if (res.status==200) {
    this.router.navigate(['/login'])
    this.toaster.success(res.message,'success')
  }
  
  
},error:(err)=>{
  console.log(err);
  this.toaster.error(err.error.message)
  
}


  })
}
}
