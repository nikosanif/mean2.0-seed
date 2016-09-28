import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './app/components/layout/footer/footer.component.html',
  //styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

    public authors: string = "Name Surname";

    constructor() {
        
    }

  ngOnInit() {
      
  }

}
