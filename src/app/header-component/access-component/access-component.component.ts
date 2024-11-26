import { Component, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-access-component',
  standalone: true,
  imports: [RouterLink],
  providers: [UserService],
  templateUrl: './access-component.component.html',
  styleUrl: './access-component.component.css'
})
export class AccessComponentComponent{
  logged:boolean;
  
  constructor(private logCheck:UserService){
    this.logged = logCheck.isLogged
  }

  // logout(){
  //   this.logCheck.signOutUser()
  // }


  

}
