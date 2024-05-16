import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { LoadMerchService } from '../../services/load-merch.service';
import { ScrollerService } from '../../services/scroller.service';
import { MerchItem } from '../../interfaces/merch-item';
import { Subscription } from 'rxjs/internal/Subscription';
import { take } from 'rxjs/internal/operators/take';

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.css',
})
export class MerchComponent implements OnInit, OnDestroy {
  @ViewChild('merchScrollContainer') merchScrollContainer:
    | ElementRef
    | undefined;
  public merchItems: MerchItem[] = [];
  private merchSubscription?: Subscription;

  constructor(
    private loadMerchService: LoadMerchService,
    public scrollerService: ScrollerService
  ) {}

  ngOnInit() {
    this.loadMerchOnce();
  }

  ngOnDestroy() {
    this.unsubscribeIfActive();
  }

  private loadMerchOnce() {
    this.merchSubscription = this.loadMerchService
      .loadMerch()
      .pipe(take(1))
      .subscribe((merchList: MerchItem[]) => {
        this.merchItems = merchList;
        this.unsubscribeIfActive();
      });
  }

  private unsubscribeIfActive() {
    if (this.merchSubscription) {
      this.merchSubscription.unsubscribe();
      this.merchSubscription = undefined;
    }
  }

  scrollLeft(): void {
    if (this.merchScrollContainer) {
      this.scrollerService.scrollToLeft(
        this.merchScrollContainer.nativeElement
      );
    }
  }

  scrollRight(end: boolean = false): void {
    if (this.merchScrollContainer) {
      this.scrollerService.scrollToRight(
        this.merchScrollContainer.nativeElement
      );
    }
  }
  openMerchItem() {}
}
