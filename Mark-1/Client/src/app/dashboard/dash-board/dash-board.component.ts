import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../sharedata/api.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrl: './dash-board.component.css'
})
export class DashBoardComponent implements OnInit
{
  public specialEvents : any[] = [];

  constructor(private _api: ApiService, private _router: Router) { }

  ngOnInit()
  {
    this._api.GetDashBoardData()
    .subscribe(
      res => this.specialEvents = res,
      err => 
        {
        if( err instanceof HttpErrorResponse ) 
        {
          if (err.status === 401) 
          {
            this._router.navigate(['/login'])
          }
        }
      }
    )  
  }
}
