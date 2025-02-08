import { Component, OnDestroy, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { BehaviorSubject, Subject, interval } from 'rxjs';
import { takeUntil, take } from 'rxjs/operators';
import { Song } from '../../interfaces/song';
import { LoadMusicService } from '../../services/load-music.service';
import { SubscriptionService } from '../../services/subscription.service';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css',
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  songs: Song[] = [];
  currentSong: Song | null = null;
  isPlaying$ = new BehaviorSubject<boolean>(false);
  currentTime$ = new BehaviorSubject<number>(0);
  currentAudioDuration$ = new BehaviorSubject<number>(0);
  currentIndex$ = new BehaviorSubject<number>(0);

  private destroy$ = new Subject<void>();
  private audio: HTMLAudioElement | null = null;
  private progressInterval: any;

  constructor(
    private loadMusicService: LoadMusicService,
    private subscriptionService: SubscriptionService
  ) {}

  ngOnInit(): void {
    this.loadMusicService
      .loadMusic()
      .pipe(take(1))
      .subscribe((response: Song[]) => {
        this.songs = response;
        if (this.songs.length > 0) {
          this.initializeFirstSong();
        }
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
    this.cleanup();
  }

  private initializeFirstSong(): void {
    this.currentSong = this.songs[0];
    this.currentIndex$.next(0);
    this.initializeAudio();
  }

  private initializeAudio(): void {
    if (typeof window !== 'undefined' && this.currentSong) {
      this.cleanup(); // Clean up previous audio instance
      this.audio = new Audio(this.currentSong.src);

      this.audio.addEventListener('loadedmetadata', () => {
        if (this.audio) {
          this.currentAudioDuration$.next(Math.ceil(this.audio.duration));
        }
      });

      this.audio.addEventListener('ended', () => {
        this.playNextSong();
      });

      this.audio.addEventListener('error', (e) => {
        console.error('Audio loading error:', e);
        this.isPlaying$.next(false);
      });
    }
  }

  playStopSong(): void {
    if (!this.currentSong || !this.audio) return;

    if (this.audio.paused) {
      this.startPlayback();
    } else {
      this.stopPlayback();
    }
  }

  private startPlayback(): void {
    if (!this.audio) return;

    this.audio
      .play()
      .then(() => {
        this.isPlaying$.next(true);
        this.startProgressTracking();
      })
      .catch((error) => {
        console.error('Audio playback error:', error);
        this.isPlaying$.next(false);
      });
  }

  private stopPlayback(): void {
    if (!this.audio) return;

    this.audio.pause();
    this.isPlaying$.next(false);
    this.stopProgressTracking();
    this.currentTime$.next(0);
    this.audio.currentTime = 0;
  }

  private startProgressTracking(): void {
    this.stopProgressTracking(); // Clear any existing interval

    this.progressInterval = interval(100)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        if (this.audio && !this.audio.paused) {
          this.currentTime$.next(this.audio.currentTime);

          // Check if song has ended
          if (this.audio.currentTime >= this.audio.duration) {
            this.playNextSong();
          }
        }
      });
  }

  private stopProgressTracking(): void {
    if (this.progressInterval) {
      this.progressInterval.unsubscribe();
    }
  }

  playNextSong(): void {
    const nextIndex = (this.currentIndex$.value + 1) % this.songs.length;
    this.changeSong(nextIndex);
  }

  playPreviousSong(): void {
    const prevIndex =
      (this.currentIndex$.value - 1 + this.songs.length) % this.songs.length;
    this.changeSong(prevIndex);
  }

  private changeSong(newIndex: number): void {
    this.stopPlayback();
    this.currentIndex$.next(newIndex);
    this.currentSong = this.songs[newIndex];
    this.initializeAudio();
    this.startPlayback();
  }

  private cleanup(): void {
    if (this.audio) {
      this.audio.pause();
      this.audio.src = '';
      this.audio.load();
      this.stopProgressTracking();
    }
  }

  formatTime(seconds: number): string {
    const minutes: number = Math.floor(seconds / 60);
    const remainingSeconds: number = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  }
}
