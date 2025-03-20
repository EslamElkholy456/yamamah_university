import { Component, inject } from '@angular/core';
import { AuthService } from '../../../core/services/auth/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  private readonly authService=inject(AuthService);
  private readonly router=inject(Router)
  private readonly toaster=inject(ToastrService)


  loginForm:FormGroup=new FormGroup({
    email:new FormControl(null,[Validators.required,Validators.email]),
    password:new FormControl(null,[Validators.required,Validators.pattern(/^[A-Z]\w{7,}$/)]),
  
  })

  submitForm():void{
    this.authService.sendLoginForm(this.loginForm.value).subscribe({
      next:(res)=>{
        console.log(res);
        if (res.message=='Login successful') {
          localStorage.setItem('token',res.token);

          this.toaster.success(res.message,'success')

          this.authService.userData();

          this.router.navigate(['/home'])
        }
        
      },error:(err)=>{
        console.log(err);
        this.toaster.error(err.error.message,'error')
        
      }
    })
  }
}
