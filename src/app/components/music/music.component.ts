import { Component } from '@angular/core';
import { MusicPlayerComponent } from '../music-player/music-player.component';

@Component({
  selector: 'app-music',
  imports: [MusicPlayerComponent],
  templateUrl: './music.component.html',
  styleUrl: './music.component.css',
})
export class MusicComponent {}
