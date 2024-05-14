import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { LoadMerchService } from '../../services/load-merch.service';

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.css',
})
export class MerchComponent implements OnInit {
  constructor(private loadMerchService: LoadMerchService) {}

  ngOnInit() {}
}
