import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { PhotoService } from '../../_services/photo.service';

@Component({
  selector: 'photos',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  
  photo: any;

  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService) { 

   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const id = params['id'];
      alert(id);
      if (id) {
        alert('if');
        this.photoService.get(id).subscribe(data => {
          this.photo = data;
        }, error => console.error(error));
        alert('no entro al service');
      }
    });
    alert('salgo de init');
  }
}
