import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadMerchService } from '../../services/load-merch.service';
import { ScrollerService } from '../../services/scroller.service';

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.css',
})
export class MerchComponent implements OnInit {
  @ViewChild('merchScrollContainer') merchScrollContainer:
    | ElementRef
    | undefined;
  constructor(
    private loadMerchService: LoadMerchService,
    public scrollerService: ScrollerService
  ) {}

  ngOnInit() {}

  scrollLeft() {
    if (this.merchScrollContainer) {
      this.scrollerService.scrollToLeft(
        this.merchScrollContainer.nativeElement
      );
    }
  }

  scrollRight(end: boolean = false) {
    if (this.merchScrollContainer) {
      this.scrollerService.scrollToRight(
        this.merchScrollContainer.nativeElement
      );
    }
  }
}
