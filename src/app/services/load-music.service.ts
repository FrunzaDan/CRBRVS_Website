import { Injectable } from '@angular/core';
import musicData from '../../assets/music-list.json'; // Importing the JSON data directly
import { Song } from '../interfaces/song';

@Injectable({
  providedIn: 'root',
})
export class LoadMusicService {
  loadMusic(): Song[] {
    return musicData;
  }
}
