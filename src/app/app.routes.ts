import { ContactComponent } from './features/pages/contact/contact.component';
import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './features/layout/auth-layout/auth-layout.component';
import { HomeComponent } from './features/pages/home/home.component';
import { CoursesComponent } from './features/pages/courses/courses.component';
import { TeachersComponent } from './features/pages/teachers/teachers.component';
import { LevelsComponent } from './features/pages/levels/levels.component';
import { MainLayoutComponent } from './features/layout/main-layout/main-layout.component';
import { LoginComponent } from './features/auth/login/login.component';
import { RegisterComponent } from './features/auth/register/register.component';
import { ForgetPassComponent } from './features/auth/forget-pass/forget-pass.component';
import { OtpComponent } from './features/auth/otp/otp.component';
import { loggedGuard } from './core/guards/logged.guard';
import { authGuard } from './core/guards/auth.guard';
import { CourseDetailsComponent } from './features/pages/course-details/course-details.component';
import { CreateCourseComponent } from './features/pages/create-course/create-course.component';

export const routes: Routes = [
    {path:'',redirectTo:'home',pathMatch:'full'},
{path:'',component:AuthLayoutComponent,
    canActivate:[loggedGuard],  
    children:[
        {path:'login',component:LoginComponent,title:'Login'},
        {path:'signup',component:RegisterComponent,title:'SignUp'},
        {path:'forgetpass',component:ForgetPassComponent,title:'Forget Password'},
        {path:'otp',component:OtpComponent,title:'OTP'},
    ]
},



    {path:'',component:MainLayoutComponent,
        children:[
            {path:'home',component:HomeComponent,title:'Home',
                canActivate:[authGuard]
            },
            {path:'courses',component:CoursesComponent,title:'Courses'},
            {path:'teachers',component:TeachersComponent,title:'Teachers'},
            {path:'levels',component:LevelsComponent,title:'Levels'},
            {path:'contact',component:ContactComponent,title:'Contact Us'},
            {path:'courseDetails/:id',component:CourseDetailsComponent,title:'CourseDetails'},
            {path:'creatCourse',component:CreateCourseComponent,title:'CreateCourse'},
        ]
    },
    {path:'**',redirectTo:'/home'}
];
