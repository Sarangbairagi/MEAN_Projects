import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupPageComponent } from './signup-page/signup-page.component';

import { ReactiveFormsModule } from '@angular/forms';
import {FormBuilder,Validators} from '@angular/forms'

import { ApiService } from '../sharedata/api.service';
import { HttpClientModule } from '@angular/common/http';


@NgModule({
  declarations: [
    SignupPageComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
 
  ],
  providers:[
    FormBuilder,
    Validators,
    ApiService,
    
  ]
})
export class SignupModule { }
