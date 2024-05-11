import { Component } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent 
{
  loginUserData = {email : '', password : ''};

  constructor(private _auth: AuthService,  private _router: Router) { }


  loginUser()
  {
    this._auth.loginUser(this.loginUserData)
    .subscribe(
      res => {
        if(res == "Id Not Match")
        {
          alert("This Id is not register");
          this.loginUserData.email = "";
        }
        else if(res == "Password Not Match")
        {
          alert("Password was not Correct");
        }
        else
        {
          alert("login Successfull")
          console.log(res.token)
          localStorage.setItem('token', res.token)
          this._router.navigate(['/dashboard'])
        }
      },
      err =>
      {
        alert("Something was wrong 404");
        console.log(err);
      }
    )
  }

}

