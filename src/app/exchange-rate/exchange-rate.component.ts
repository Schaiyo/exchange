import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-exchange-rate',
  templateUrl: './exchange-rate.component.html',
  styleUrls: ['./exchange-rate.component.css']
})
export class ExchangeRateComponent implements OnInit {
  currency: string[] = ['AED','AFN','ALL','AMD','ANG','AOA','ARS','AUD','AWG','AZN','BAM','BBD','BDT','BGN','BHD','BIF','BMD','BND','BOB','BRL','BSD','BTC','BTN','BWP','BYN','BYR','BZD','CAD','CDF','CHF','CLF','CLP','CNY','COP','CRC','CUC','CUP','CVE','CZK','DJF','DKK','DOP','DZD','EGP','ERN','ETB','EUR','FJD','FKP','GBP','GEL','GGP','GHS','GIP','GMD','GNF','GTQ','GYD','HKD','HNL','HRK','HTG','HUF','IDR','ILS','IMP','INR','IQD','IRR','ISK','JEP','JMD','JOD','JPY','KES','KGS','KHR','KMF','KPW','KRW','KWD','KYD','KZT','LAK','LBP','LKR','LRD','LSL','LTL','LVL','LYD','MAD','MDL','MGA','MKD','MMK','MNT','MOP','MRO','MUR','MVR','MWK','MXN','MYR','MZN','NAD','NGN','NIO','NOK','NPR','NZD','OMR','PAB','PEN','PGK','PHP','PKR','PLN','PYG','QAR','RON','RSD','RUB','RWF','SAR','SBD','SCR','SDG','SEK','SGD','SHP','SLL','SOS','SRD','STD','SVC','SYP','SZL','THB','TJS','TMT','TND','TOP','TRY','TTD','TWD','TZS','UAH','UGX','USD','UYU','UZS','VEF','VND','VUV','WST','XAF','XAG','XAU','XCD','XDR','XOF','XPF','YER','ZAR','ZMK','ZMW','ZWL'];
  default: string = 'THB';
  rates: any;
  current: any;
  numCal: number;
  exchange: number;
  form: FormGroup;
  isSelected: boolean = false;

  constructor(private httpClient: HttpClient, private fb: FormBuilder) { 
    this.form = this.fb.group({
      extRate: '',
      currencyRate: this.default
    })
  }

  ngOnInit(): void {
  }

  convert() {
    this.rates = [];
    const newGet = this.form.value;
    // alert(newGet.extRate);
    // alert(newGet.currencyRate);
    this.numCal = newGet.extRate;
    this.current = newGet.currencyRate;
    
    if (newGet.extRate == '') {
      alert("กรุณาใส่ตัวเลข")
    } else {
      this.isSelected = true;
      this.httpClient
        .get('http://api.exchangeratesapi.io/v1/latest?access_key=95bcd990b88e005f7af3f9adaefafc03')
        .subscribe(result => {
        this.rates = result as any;
        // let ra = this.current;
        // alert(this.rates.rates.current);
        this.getResult();
      });
    };
  }
  getResult() {
    this.exchange = this.rates.rates[this.current] * this.numCal;
    // alert(this.exchange);
  }

}
