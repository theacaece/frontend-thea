import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';

import { PhotoService } from '../../_services/photo.service';

@Component({
  selector: 'app-photos',
  templateUrl: './photo.component.html',
  styleUrls: ['./photo.component.css']
})
export class PhotoComponent implements OnInit {
  
  fotos: any;
  imagen: boolean = false;

  sub: Subscription;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private photoService: PhotoService) { 

   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      const dni = params['dni'];
      if (dni) {
        this.photoService.get(dni).subscribe(data => {
          this.fotos = data;
          if (this.fotos.length == 0) {
            this.imagen = false;
          } else {
            this.imagen = true;
          }
        }, error => console.error(error));
      }
    });
  }

  gotoList() {
    this.router.navigate(['/person-list']);
  }
  
}
