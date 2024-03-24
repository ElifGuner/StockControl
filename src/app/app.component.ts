import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template:`
  <!--<app-form></app-form>-->
  <!--<app-bootstrap-form></app-bootstrap-form>-->
  <!--<app-signin></app-signin>-->
  <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'StockControl';
}
