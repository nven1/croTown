import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-county-list',
  templateUrl: './county-list.component.html',
  styleUrls: ['./county-list.component.scss']
})
export class CountyListComponent implements OnInit {
  $counties;
  counties;

  constructor(private ds:DataService) { }

  ngOnInit() {
    this.$counties = this.ds.getList(1);
    this.$counties.subscribe(data => {
      this.counties = data.counties;
      console.log(this.counties);
    })
  }
}
