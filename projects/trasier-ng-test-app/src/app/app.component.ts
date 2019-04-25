import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TrasierNgService } from '../../../trasier-ng/src/lib/trasier-ng.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  private readonly TEST_URL =
    'https://gorest.co.in/public-api/users?_format=json&access-token=UepAWmHwesfEDwfGW1_TWfh5VTlSHKV45oaA';
  public results$: Observable<any>;

  constructor(private http: HttpClient, private trasierService: TrasierNgService) {}

  ngOnInit(): void {
    this.trasierService.init('trasier-test');
  }

  public startConversation(): void {
    this.trasierService.startConversation();
  }

  public endConveresation(): void {
    this.trasierService.endConversation();
  }

  public sendTestRequest(): void {
    this.results$ = this.http.get(this.TEST_URL);
  }
}
