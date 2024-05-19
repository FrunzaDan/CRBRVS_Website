import { CommonModule } from '@angular/common';
import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { take } from 'rxjs/internal/operators/take';
import { fadeIn, fadeOut, transformIn, transformOut } from '../../animations';
import { MerchItem } from '../../interfaces/merch-item';
import { LoadMerchService } from '../../services/load-merch.service';
import { ScrollerService } from '../../services/scroller.service';

@Component({
  selector: 'app-merch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.css',
  animations: [transformIn, transformOut, fadeIn, fadeOut],
})
export class MerchComponent implements OnInit, OnDestroy {
  @ViewChild('merchScrollContainer') merchScrollContainer:
    | ElementRef
    | undefined;
  merchItems: MerchItem[] = [];
  selectedMerchItem: MerchItem | undefined;
  isMerchModalOpen: boolean = false;
  merchItemModalTitle!: string;
  merchItemModalDescription!: string;
  merchItemModalPrice!: string;
  private merchSubscription?: Subscription;

  constructor(
    private loadMerchService: LoadMerchService,
    public scrollerService: ScrollerService
  ) {}

  ngOnInit(): void {
    this.loadMerchOnce();
  }

  ngOnDestroy(): void {
    this.unsubscribeIfActive();
  }

  private loadMerchOnce(): void {
    this.merchSubscription = this.loadMerchService
      .loadMerch()
      .pipe(take(1))
      .subscribe((merchList: MerchItem[]): void => {
        this.merchItems = merchList;
        this.unsubscribeIfActive();
      });
  }

  private unsubscribeIfActive(): void {
    this.merchSubscription?.unsubscribe();
    this.merchSubscription = undefined;
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
  openMerchItemModal(merchItem: MerchItem): void {
    if (merchItem) {
      this.isMerchModalOpen = true;
      this.selectedMerchItem = merchItem;
    }
  }

  closeMerchItemModal(): void {
    this.isMerchModalOpen = false;
    this.selectedMerchItem = undefined;
  }
}
