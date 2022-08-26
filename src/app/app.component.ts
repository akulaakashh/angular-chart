import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { Chart, registerables } from 'chart.js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title(title: any) {
    throw new Error('Method not implemented.');
  }
  result: any;
  company:any;
  companyid: any;
  companyannual_volume: any;
  chart: any = [];

  constructor(private service: AuthService) {
    Chart.register(...registerables);
  }

  ngOnInit() {
    this.service. getData().toPromise().then((res: any) => {
      this.result = res;
      console.log(" this is the data", this .result)
      for(const item of this.result){
        console.log(item.id, item.annual_volume)        
      }
      // this.companyid = this.result.data.id.map((id: any) => id.id);
      this.companyid = this.result.map((id: any) => id.id);
      //this.companyannual_volume = this.result.data.annual_volume.map((annual_volume: any) => annual_volume.annual_volume);
      this.companyannual_volume = this.result.map((annual_volume: any) => annual_volume.annual_volume);
      console.log('this is company id', this.companyid)
      // console.log(this.coinPrice);
      // console.log(this.coinName);

      this.chart = new Chart('canvas', {
        type: 'line',
        data: {
          labels: this.companyid,
          datasets: [
            { 
              data: this.companyannual_volume,
              borderColor: '#3e95cd',
              fill: false,
              label: 'Coin Price',
              backgroundColor: 'rgba(93, 175, 89, 0.1)',
              borderWidth: 3,
            },
          ],
        },
      });
    });
  }
}
