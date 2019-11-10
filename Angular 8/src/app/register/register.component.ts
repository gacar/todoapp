import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../user';
import { PrivateTodoService } from '../private-todo.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user: User;
  errorMessage = 'Kayıt İşlemi Başarısız';
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
  handleRegister() {
    console.log(this.user.username +  " sifre: " + this.user.password);
     this.privateTodoService.registerUser(this.user).subscribe(data => {
      this.invalidLogin = false;
      this.loginSuccess = true;
      this.successMessage = 'Kayıt İşlemi başarılı.';
      console.log("sonuc: " + data);
      this.router.navigate(['/user/todocategories']);
    }, error => {
      console.log(error);
      if(error.error === "error001")
      this.errorMessage ="Kayıtlı Kullanıcı";
      else
      this.errorMessage = 'Kayıt İşlemi Başarısız';
      this.invalidLogin = true;
      this.loginSuccess = false;
    
    });
  
  }

}
