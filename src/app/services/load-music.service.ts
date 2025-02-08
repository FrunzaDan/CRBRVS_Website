import { Injectable } from '@angular/core';
import musicData from '../../../public/assets/music-list.json';
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root',
})
export class LoadMusicService {
  loadMusic(): Song[] {
    return musicData;
  }
}
