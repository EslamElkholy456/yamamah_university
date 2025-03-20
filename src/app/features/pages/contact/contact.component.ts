import { Component, inject } from '@angular/core';
import { UsersService } from '../../../core/services/users/users.service';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact',
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {


  private readonly usersService=inject(UsersService)
  private readonly toaster=inject(ToastrService)

  contactForm:FormGroup=new FormGroup({
     email:new FormControl(null,[Validators.required,Validators.email]),
     name:new FormControl(null,[Validators.required]),
     message:new FormControl(null,[Validators.required]),
  })

  sendMsg():void{
    this.usersService.postContact(this.contactForm.value).subscribe({
next:(res)=>{
  console.log(res);
  this.toaster.success(res.message)
  
},
error:(err)=>{
console.log(err);
this.toaster.error(err.errors.message)

}
    })
  }
}
