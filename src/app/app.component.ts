import { Component, OnChanges, OnInit} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnChanges, OnInit {
    countrydata = [];
    chooseOpt: {};
    chooseOptName: string;
    constructor() {
        this.countrydata = [{
            'name': 'Alberta',
            'abbreviation': 'AB'
          },
          {
            'name': 'British Columbia',
            'abbreviation': 'BC'
          },
          {
            'name': 'Manitoba',
            'abbreviation': 'MB'
          },
          {
            'name': 'New Brunswick',
            'abbreviation': 'NB'
          },
          {
            'name': 'Newfoundland and Labrador',
            'abbreviation': 'NL'
          },
          {
            'name': 'Nova Scotia',
            'abbreviation': 'NS'
          },
          {
            'name': 'Northwest Territories',
            'abbreviation': 'NT'
          },
          {
            'name': 'Nunavut',
            'abbreviation': 'NU'
          },
          {
            'name': 'Ontario',
            'abbreviation': 'ON'
          },
          {
            'name': 'Prince Edward Island',
            'abbreviation': 'PE'
          },
          {
            'name': 'Quebec',
            'abbreviation': 'QC'
          },
          {
            'name': 'Saskatchewan',
            'abbreviation': 'SK'
          },
          {
            'name': 'Yukon',
            'abbreviation': 'YT'
          }
        ];
    }
    ngOnChanges() {
    }
    ngOnInit() {
        console.log('countrydata => ', this.countrydata);
    }
    setChooseOption(opt) {
      this.chooseOpt = opt;
      this.chooseOptName = opt.name;
      console.log('chooseOpt => ', this.chooseOpt);
    }
    fetchSelectedValue(event) {
      this.chooseOpt = event;
      this.chooseOptName = event;
      console.log('chooseOpt => ', this.chooseOpt);
    }
}
