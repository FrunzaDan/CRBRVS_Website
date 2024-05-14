import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Song } from '../../interfaces/song';
import { LoadMusicService } from '../../services/load-music.service';

@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css',
})
export class MusicPlayerComponent implements OnInit {
  songs: Song[] = [];
  currentSong: Song | null = null;
  isPlaying: boolean = false;
  currentTime: number = 0;
  currentAudioDuration: number = 0;
  currentIndex: number = 0;

  private audio: HTMLAudioElement | null = null;

  constructor(private loadMusicService: LoadMusicService) {}

  ngOnInit() {
    this.loadMusicService.loadMusic().subscribe((response: Song[]) => {
      this.songs = response;
    });

    if (this.songs) {
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
      if (this.audio) {
        if (this.isPlaying) {
          this.currentTime = this.audio.currentTime;
          this.currentAudioDuration = Math.ceil(this.audio.duration);
          console.log('a');
        } else {
          clearInterval(updateInterval);
          this.audio.currentTime = 0;
          this.currentAudioDuration = 0;
          console.log('b');
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
          console.log('c');
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
}
