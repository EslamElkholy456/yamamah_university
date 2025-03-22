import { Component, inject } from '@angular/core';
import {ReactiveFormsModule,FormGroup, FormControl, Validators, AbstractControl, FormBuilder}from '@angular/forms'
import { AuthService } from '../../../core/services/auth/auth.service';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule,RouterLink,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  selectedRole: string = '';  

    register:FormGroup=new FormGroup({
      role:new FormControl(null,[Validators.required]), // تخزين نوع الحساب
      firstName: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      lastName: new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
      phone: new FormControl(null,[Validators.required]),
      email: new FormControl(null,[Validators.required,Validators.email]),
      password: new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
      timezone: new FormControl(null,[Validators.required]), 
    });
  

private readonly authService=inject(AuthService);
private readonly router=inject(Router)
private readonly toaster=inject(ToastrService)
// register:FormGroup=new FormGroup({
//   firstName:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
//   lastName:new FormControl(null,[Validators.required,Validators.minLength(3),Validators.maxLength(20)]),
//   email:new FormControl(null,[Validators.required,Validators.email]),
//   password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
//   timezone:new FormControl(null,[Validators.required]),

// })

selectAccountType(type: string) {
  this.register.patchValue({ role: type });
  console.log('القيمة المختارة:', this.register.value);
  this.selectedRole = type;
}

submitForm():void{
  this.authService.sendRegisterForm(this.register.value).subscribe({
    next:(res)=>{
      console.log(res);
      if (res.message=='Signup successful') {
        this.toaster.success(res.message,'success')
        this.router.navigate(['/login'])
      }
      
    },
    error:(err)=>{
      console.log(err);
      this.toaster.error(err.error.message,'error')
      
    }
  })
}
  
}
