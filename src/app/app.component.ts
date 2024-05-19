import { Component, OnInit } from '@angular/core';
import { Analytics } from '@angular/fire/analytics';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  title: string = 'CRBRVS';

  constructor(private fireAnalytics: Analytics) {}

  ngOnInit() {}
}
