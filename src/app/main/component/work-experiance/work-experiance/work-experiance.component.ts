import { Component, OnInit, ElementRef, ViewChild, NgZone, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ExperinceDataService } from '../../../services/main-service/experience-data.service';
import { SpinnerService } from '../../../../shared/spinner/spinner.service';
@Component({
  selector: 'app-work-experiance',
  templateUrl: './work-experiance.component.html',
  styleUrls: ['./work-experiance.component.css']
})
export class WorkExperianceComponent implements OnInit {
  experiences: any;
  @ViewChild('search') public searchElementRef: ElementRef;
  constructor(
    private _spinnerService: SpinnerService,
    public _expereince_data_service: ExperinceDataService,
    @Inject(NgZone) private zone: NgZone) { }

  ngOnInit() {
    this._spinnerService.show('app-work-experiance');
    this._expereince_data_service.getExperience()
      .subscribe(response => {
        let y = response.map(function(x){
          
          let ws = new Date(parseInt(Date.parse(x.work_start).toString()))
          let we = new Date(parseInt(Date.parse(x.work_end || new Date).toString()))
          x.work_start = `${ws.getDate()}/${ws.getMonth()}/${ws.getFullYear()}`
          x.work_end = `${we.getDate()}/${we.getMonth()}/${we.getFullYear()}`
          
          var startStamp = ws.getTime();
          var newStamp = we.getTime();
          var diff = Math.round((newStamp-startStamp)/1000);
          var d = Math.floor(diff/(24*60*60)); /* though I hope she won't be working for consecutive days :) */
          // diff = diff-(d*24*60*60);
          
          x.total_month = Math.ceil(d/30)
          return x
        })
        
        this.experiences = y
        this.experiences.sort((a, b) => parseFloat(b.id) - parseFloat(a.id));

        // response.forEach((value, index) => {
        //   console.log(index); // 0, 1, 2
        //   console.log(value); // 9, 2, 5
        //   var x = this.getDates(value.work_start, value.work_end)
        // });
        this._spinnerService.hide('app-work-experiance');

      },
      (error) => {
      });
  }


  // getDates(start, end) {
  //   var datesArray = [];
  //   var startDate = new Date(start);
    
  //   while (startDate <= end) {
  //       datesArray.push(new Date(startDate));
  //       startDate.setDate(startDate.getDate() + 1);
  //   }
  //   return datesArray;
  // }
}
