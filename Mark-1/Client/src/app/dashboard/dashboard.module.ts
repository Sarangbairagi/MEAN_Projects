import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashBoardComponent } from './dash-board/dash-board.component';
import { ApiService } from '../sharedata/api.service';
import { HttpClientModule } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';


@NgModule({
  declarations: [
    DashBoardComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    HttpClientModule
  ],
  providers:[
    provideClientHydration(),
    ApiService
  ]
})
export class DashboardModule { }
