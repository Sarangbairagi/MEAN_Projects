import { Component } from '@angular/core';
import { AbstractControl, FormBuilder,FormGroup,Validators} from '@angular/forms';
import { OnInit } from '@angular/core';
import { ApiService } from '../../sharedata/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup-page',
  templateUrl: './signup-page.component.html',
  styleUrl: './signup-page.component.css'
})
export class SignupPageComponent implements OnInit
{

  signupForm!: FormGroup

  public Data : any ;

  emailRegex = /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/ ;

  constructor(private _fbObj : FormBuilder,private _api : ApiService, private _router : Router )
  {

  }

  ngOnInit(): void
  {
    this.signupForm = this._fbObj.group
    (
      {
        email : ['',[Validators.required,Validators.pattern(this.emailRegex)]],
        name : ['',[Validators.required]],
        phonenumber : ['',[Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")]],
        password : ['',Validators.required],
        Confirmpassword : ['',Validators.required],
      }
    )
  }


   
  SignUpData() 
  {
    console.log(this.signupForm.value);
      this._api.SignupDataInsert(this.signupForm.value).subscribe(res=>
      {
        console.log(res);
        if(res == false)
        {
          alert('This Email id is already used');
        }
        else
        {
          alert('Signup Successfully');
          this.signupForm.reset();
          this._router.navigate(['/login']);
        }
      }), 
      (err: any)=>
      {
        console.log(err);
        alert('Signup Error');
      }  
  }
}
