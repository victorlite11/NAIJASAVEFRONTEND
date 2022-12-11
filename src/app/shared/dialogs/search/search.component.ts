import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { ContributorModel } from '../../models/contributor-model/contributor-model';
import { SearchService } from '../../services/search/search.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchKeyword = "";
  selected: ContributorModel[] = [];
  searchResult: ContributorModel[] = []
  searching = false;
  constructor(
    private searchService: SearchService,
    private matDialogRef: MatDialogRef<SearchComponent>,
    private route: ActivatedRoute,
    @Inject(MAT_DIALOG_DATA) public data: {
      overseer_id: string,
      title: string,
      selection: "single" | "multiple"
    }
  ) { }

  ngOnInit(): void {
  }

  async search() {
    this.searching = true;
    this.searchResult = await this.searchService.searchContributorsUnified(this.data.overseer_id, this.searchKeyword);
    this.searching = false;
  }

  select(id: string, card: any) {
    let interest = this.searchResult.filter(result => result._id == id)[0];

    card.classList.toggle("margin-point-5em");
    card.classList.toggle("big-grey-shadow");
    card.classList.toggle("border-orange-point-1em");
    card.classList.toggle("curved-point-5em");

    if(!this.selected.map(one => one._id).includes(id)) {
      this.selected.push(interest);
      if(this.data.selection == "single") {
        this.matDialogRef.close(this.selected[0]);
      }
    } else {
      this.selected = this.selected.filter(one => one._id != id);
    }
  }

  close() {
    this.matDialogRef.close(null);
  }

  useSelected() {
    this.matDialogRef.close(this.selected);
  }

}
