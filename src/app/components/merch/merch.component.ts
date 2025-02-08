import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  Signal,
  effect,
  signal,
  viewChild,
} from '@angular/core';
import { take } from 'rxjs/operators';
import { fadeIn, fadeOut, transformIn, transformOut } from '../../animations';
import { MerchItem } from '../../interfaces/merch-item';
import { LoadMerchService } from '../../services/load-merch.service';
import { ScrollerService } from '../../services/scroller.service';

@Component({
  selector: 'app-merch',
  templateUrl: './merch.component.html',
  styleUrl: './merch.component.css',
  animations: [transformIn, transformOut, fadeIn, fadeOut],
})
export class MerchComponent implements OnInit {
  readonly merchScrollContainer = viewChild<ElementRef>('merchScrollContainer');

  merchItems = signal<MerchItem[]>([]);
  selectedMerchItem = signal<MerchItem | null>(null);
  isMerchModalOpen = signal<boolean>(false);

  constructor(
    private loadMerchService: LoadMerchService,
    public scrollerService: ScrollerService,
  ) {}

  ngOnInit(): void {
    const loadedSongs = this.loadMerchService.loadMerch();
    this.merchItems.set(loadedSongs);
  }

  scrollLeft(): void {
    const merchScrollContainer = this.merchScrollContainer();
    if (merchScrollContainer) {
      this.scrollerService.scrollToLeft(merchScrollContainer.nativeElement);
    }
  }

  scrollRight(): void {
    const merchScrollContainer = this.merchScrollContainer();
    if (merchScrollContainer) {
      this.scrollerService.scrollToRight(merchScrollContainer.nativeElement);
    }
  }

  openMerchItemModal(merchItem: MerchItem): void {
    this.isMerchModalOpen.set(true);
    this.selectedMerchItem.set(merchItem);
  }

  closeMerchItemModal(): void {
    this.isMerchModalOpen.set(false);
    this.selectedMerchItem.set(null);
  }
}
