import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Song } from '../../interfaces/song';
import { LoadMusicService } from '../../services/load-music.service';
import { take } from 'rxjs/internal/operators/take';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css',
})
export class MusicPlayerComponent implements OnInit, OnDestroy {
  songs: Song[] = [];
  currentSong: Song | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  currentAudioDuration: number = 0;
  currentIndex: number = 0;
  private musicSubscription?: Subscription;

  private audio: HTMLAudioElement | null = null;

  constructor(private loadMusicService: LoadMusicService) {}

  ngOnInit() {
    this.musicSubscription = this.loadMusicService
      .loadMusic()
      .pipe(take(1))
      .subscribe((response: Song[]) => {
        this.songs = response;
        if (this.songs.length > 0) {
          this.currentSong = this.songs[0];
          this.currentIndex = this.songs.indexOf(this.songs[0]);
          if (typeof window !== 'undefined') {
            this.audio = new Audio(this.currentSong.src);
            this.audio.addEventListener('loadeddata', () => {
              if (this.audio) {
                this.currentAudioDuration = Math.ceil(this.audio.duration);
              }
            });
          }
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribeIfActive();
  }

  playStopSong() {
    if (!this.currentSong) {
      return;
    }

    if (!this.audio) {
      this.audio = new Audio(this.currentSong.src);
    }

    if (this.audio.paused) {
      this.audio.play().catch((error) => {
        console.error('Audio playback error:', error);
      });
      this.isPlaying = true;
      this.updateProgressBar();
    } else {
      this.audio.pause();
      this.isPlaying = false;
      this.audio.currentTime = 0;
    }
  }

  private changeSong(newSongIndex: number) {
    if (this.audio) {
      this.audio.pause();
      this.isPlaying = false;
      this.audio.currentTime = 0;
    }
    const newSong = this.songs[newSongIndex % this.songs.length];
    this.setCurrentSong(newSong);
  }

  private setCurrentSong(song: Song): void {
    this.currentSong = song;
    this.currentIndex = this.songs.indexOf(song);
    this.audio = new Audio(this.currentSong.src);
    this.audio.play().catch((error) => {
      console.error('Audio playback error:', error);
    });
    this.updateProgressBar();
    this.isPlaying = true;
  }

  playNextSong(): void {
    this.changeSong(this.songs.indexOf(this.currentSong!) + 1);
  }

  playPreviousSong(): void {
    this.changeSong(
      (this.songs.indexOf(this.currentSong!) - 1 + this.songs.length) %
        this.songs.length
    );
  }

  private updateProgressBar() {
    if (!this.audio) {
      return;
    }

    const updateInterval = setInterval(() => {
      console.log('a');
      if (this.audio) {
        if (this.isPlaying) {
          this.currentTime = this.audio.currentTime;
          this.currentAudioDuration = Math.ceil(this.audio.duration);
        } else {
          clearInterval(updateInterval);
          this.audio.currentTime = 0;
          this.currentAudioDuration = 0;
        }
      }
    }, 200);

    const onAudioPause = () => {
      if (updateInterval) {
        clearInterval(updateInterval);
      }
      if (this.audio) {
        if (this.audio.paused) {
          this.audio.pause();
        }
      }
    };

    this.audio.addEventListener('pause', onAudioPause);
  }

  formatTime(seconds: number): string {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return remainingSeconds.toString().padStart(2, '0');
  }

  private unsubscribeIfActive() {
    if (this.musicSubscription) {
      this.musicSubscription.unsubscribe();
      this.musicSubscription = undefined; // Clear reference
    }
  }
}
