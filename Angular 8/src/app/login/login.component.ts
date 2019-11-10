import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { PrivateTodoService } from '../private-todo.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  
  user: User;
  errorMessage = 'Hatalı Kullanıcı Adı veya Şifre';
  successMessage: string;
  invalidLogin = false;
  loginSuccess = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private privateTodoService: PrivateTodoService
  ) { }

  ngOnInit() {
    this.user = new User();
  }

  handleLogin() {
    console.log(this.user.username +  " sifre: " + this.user.password);
     this.privateTodoService.loginUser(this.user).subscribe(data => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Giris başarılı.';
      console.log("sonuc: " + data);
      this.router.navigate(['/user/todocategories']);
    }, error => {
      console.log(error);
      this.invalidLogin = true;
      this.loginSuccess = false;
    
    });
  
  }

}
