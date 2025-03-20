import { NgClass, NgIf } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { LevelService } from '../../../core/services/level/level.service';
import { Ilevels } from '../../../shared/interfaces/ilevels';
import { IcontentLevel } from '../../../shared/interfaces/icontent-level';

@Component({
  selector: 'app-levels',
  imports: [NgIf,NgClass],
  templateUrl: './levels.component.html',
  styleUrl: './levels.component.scss'
})
export class LevelsComponent implements OnInit {
   // 
levelNum:Ilevels[]=[]
levelContent:IcontentLevel[]=[]

  private readonly levelService=inject(LevelService)

  ngOnInit(): void {
    this.getLevels()


   
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




  toggleContent(level:any): void {
    
    level.isVisible = !level.isVisible;
    
    
  }
}
