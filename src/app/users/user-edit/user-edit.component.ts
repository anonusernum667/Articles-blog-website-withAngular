import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { UpdateUser, user } from '../../auth/types/user.interface';
@Component({
  selector: 'app-user-edit',
  standalone: true,
  imports: [FormsModule, CommonModule ],
  templateUrl: './user-edit.component.html',
  styleUrl: './user-edit.component.scss'
})
export class UserEditComponent {
  showPassword: boolean = false;

  user:UpdateUser = {
    user: {
      email: '',
      username: '',
      bio: undefined,
      image: undefined,
      password: ''
    }
  }
  username: string | null = ''
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    protected service: UserService
  ){}

  ngOnInit(){
    this.username = this.route.snapshot.paramMap.get('username')
    console.log(this.username)
    if (this.username) {
      this.service.getCurrentUserData().subscribe(
        res => {
          console.log(res)

          this.user.user.email = res.user.email
          this.user.user.bio = res.user.bio || ''
          this.user.user.username = res.user.username
        },
        error => {
          console.log('Error fetching user data', error);
        }
      )
    }

  }
  updateUser(){
    const inputData = {
      user: {
        email: this.user.user.email,
        username: this.user.user.username,
        bio: this.user.user.bio,
        image: undefined,
        password: this.user.user.password
      }
    }
    if(this.username){
      this.service.updateCurrentUser(inputData).subscribe({
        next: (res: user) => {
          console.log(res, 'updated successfully');
          this.router.navigate(['/account']); // Navigate back to admins page
          alert('account updated successfuly')
        },
        error: (error: Error) => {
          console.log('Error updating account', error);
        }
      });
    }

  }
}
