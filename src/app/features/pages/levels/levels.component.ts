import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LevelService } from '../../../core/services/level/level.service';
import { Ilevels } from '../../../shared/interfaces/ilevels';
import { IcontentLevel } from '../../../shared/interfaces/icontent-level';
import { Router, RouterLink } from '@angular/router';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-levels',
  imports: [NgIf,NgClass,RouterLink],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss'
})
export class LevelsComponent implements OnInit {
   // 
levelNum:Ilevels[]=[]
levelContent:IcontentLevel[]=[]
levelId:any
userToken: any;
  userRole: string | undefined;


  private readonly levelService=inject(LevelService)
  private readonly router=inject(Router)

  ngOnInit(): void {
    this.getLevels()
    this.accRole()


   
  }

getLevels():void{
  this.levelService.getAllLevels().subscribe({
    next:(res)=>{
      console.log(res.levels);
      this.levelNum=res.levels
      for (let level of res) {
        (level as any).isVisible = false; 
      }
      
      

     
      
      
      
      
    },error:(err)=>{
      console.log(err);
      
    }
  })
}
getLevelById(id:any):void{
  this.levelService.getAllLevelsById(id).subscribe({
    next:(res)=>{
      console.log(res.level.courses);
      this.levelContent=res.level.courses
      
      
      
      
    },error:(err)=>{
      console.log(err);
      
    }
  })
}

 accRole():void{
    this.userToken=jwtDecode(localStorage.getItem('token')!)
       console.log(this.userToken);
       this.userRole=this.userToken.role
       console.log(this.userRole);
   }
   editLevel():void{
    this.router.navigate(['/updateLevel', { id: this.levelId }]);
  }


  toggleContent(level:any): void {
    
    level.isVisible = !level.isVisible;
    
    
  }
}
