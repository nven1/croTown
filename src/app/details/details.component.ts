import { Component, OnInit, OnChanges } from '@angular/core';
import { DataService } from '../_services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {
  state = 0;
  //load = false;
  dialog = false;

  countyData;
  townList;
  commList;

  objectData;

  entityList = ['', 'County', 'Town', 'Community']

  constructor(private ds:DataService) {
    //this.countyData = this.ds.countyData;
  }

  ngOnInit() {
    this.ds.change.subscribe(state => {
      if (state==1) {
        this.setCounty();
      }
      else if (state==2) {
        this.state = 2;
      }
      
    })
  }

  //get county data, town and comm list
  setCounty() {
    let countyData = this.ds.getDetails(1, this.ds.countyID);
    let townList = this.ds.getList(2);
    let commList = this.ds.getList(3);

    countyData.subscribe(object => {
      this.countyData = object;
      this.state = 1;
    })
    townList.subscribe(town => {
      this.townList = town.towns.filter(town => town.countyID == this.ds.countyID);
    })
    commList.subscribe(comm => {
      this.commList = comm.communities.filter(comm => comm.countyID == this.ds.countyID);
    })
  }

  openDialog(entity, id) {
    
    let objectData = this.ds.getDetails(entity, id);

    objectData.subscribe(object => {
      this.objectData = object;
      this.dialog = true;
      console.log(this.objectData);
      
    })

  }

  closeDialog() {
    this.dialog = false;
    this.objectData = null;
  }
  



}
