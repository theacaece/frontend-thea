import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../../_services/photo.service';

@Component({
  selector: 'photos',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  photos: Array<any>;

  constructor(private photoService: PhotoService) { }

  ngOnInit() {
    this.photoService.getAll().subscribe(data => {
      this.photos = data;
    });
  }

}
