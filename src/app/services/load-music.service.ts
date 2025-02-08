import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Song } from '../interfaces/song';
import { catchError } from 'rxjs/internal/operators/catchError';
import { of } from 'rxjs/internal/observable/of';
import musicData from '../../assets/music-list.json'; // Importing the JSON data directly

@Injectable({
  providedIn: 'root',
})
export class LoadMusicService {
  loadMusic(): Song[] {
    return musicData;
  }
}
