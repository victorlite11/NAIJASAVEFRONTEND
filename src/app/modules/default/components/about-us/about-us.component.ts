import { Component, OnInit } from '@angular/core';
import { Location } from "@angular/common";

@Component({
  selector: 'app-about-us',
  templateUrl: './about-us.component.html',
  styleUrls: ['./about-us.component.scss']
})
export class AboutUsComponent implements OnInit {
  title = 'About us'
  constructor(
    private location : Location
  ) { }

  ngOnInit(): void {
  }

  moveBack() {
    this.location.back();
  }

}
