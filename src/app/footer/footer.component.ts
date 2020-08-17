import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear: number;

  constructor() { }

  ngOnInit(): void {
    var d = new Date();
    this.currentYear = d.getFullYear();
  }

}
