import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../_services/data.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {
  @Input() townList;
  @Input() commList;
  
  @Input() countyID = undefined;
  @Input() countyList;

  globalSearch = true;
  searchMode = false;

  results;

  state = 0;

  constructor(private ds:DataService) { }

  ngOnInit() {
    this.ds.change.subscribe(state => {
      this.state = state;
      if (state==1) {
        this.globalSearch = false;
      }
      console.log(this.state);
    })
  }

  search(query) {
    this.searchMode = false;
    this.ds.search();
    
    if (!this.globalSearch) {
      this.results = [];
      this.results = [...this.townList, ...this.commList];
      this.showResults(query);
    }
    else if (this.globalSearch) {
      this.results = [];
      let countyList = this.ds.getList(1);
      let townList = this.ds.getList(2);
      let commList = this.ds.getList(3);
  
      countyList.subscribe(county => {
        this.results = [...this.results, ...county.counties]
      })
      townList.subscribe(town => {
        this.results = [...this.results, ...town.towns]
      })
      commList.subscribe(comm => {
        this.results = [...this.results, ...comm.communities]
        this.showResults(query);
        console.log(this.results);
      })
    }
  }

  showResults(query) {
    this.results = this.results.filter(item => item.name.toLowerCase() == query);
    this.searchMode = true;
    console.log(this.results);

  }

  toggleGlobalSearch() {
    if (this.state !== 0) {
      this.globalSearch = !this.globalSearch;
    }
  }
  closeResults() {
    this.results = [];
    this.ds.setCounty(this.ds.countyID);
  }

/*   goToResult(entityType, countyID, id) {
    console.log(entityType, countyID, id);
    this.ds.resultClick(entityType, countyID, id);
  } */

}
