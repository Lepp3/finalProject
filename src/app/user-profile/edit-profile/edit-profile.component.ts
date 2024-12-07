import { Component, OnInit, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SignedUser, UserInfo } from '../models/userModel';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.css'
})
export class EditProfileComponent implements OnInit{
    profileId!: string;
    currentUser!: SignedUser | null;
    currentUserInfo!: UserInfo | null;
    @ViewChild('profileEditForm') form!:NgForm

    constructor(
      private activeRoute:ActivatedRoute,
      private userService:UserService,
      private router:Router
    ){}

    ngOnInit(): void {
      this.currentUser = this.userService.user;
      this.profileId = this.activeRoute.snapshot.params['id'];
      if(this.profileId){
        this.loadUserInfo();
      }
      
    }


    loadUserInfo(){
      this.userService.getUserInfo(this.profileId).subscribe((data)=>{
        this.currentUserInfo = data;
      })
    }

    onEditSubmit(){
      const form = this.form;
      const id = this.profileId;
      const username = form.value.username;
      const bio = form.value.bio;
      const imageSrc = form.value.imageSrc;
      
      const submitInfo:UserInfo = {
        _id: id,
        bio: bio,
        profileImgSrc: imageSrc,
        username: username
      }

      this.userService.updateUserInfo(id,submitInfo).subscribe({
        next:()=>{
          this.router.navigate([`/profile/${id}`])
        }
      })
      
    }
}
