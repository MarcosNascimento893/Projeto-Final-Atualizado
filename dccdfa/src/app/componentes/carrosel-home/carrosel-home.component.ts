import { Component, OnInit, OnDestroy } from '@angular/core';

interface CarouselItem {
  img: string;
  text: string;
  link: string;
}

@Component({
  selector: 'app-carrosel-home',
  templateUrl: './carrosel-home.component.html',
  styleUrls: ['./carrosel-home.component.css']
})
export class CarroselHomeComponent implements OnInit, OnDestroy {
  carouselArr: CarouselItem[] = [
    { img: 'shelbyford.jpg', text: '', link: '' },
    { img: 'broncotroppe.jpg', text: '', link: '' },
 
  ];

  currentIndex = 0;
  currentItem!: CarouselItem;
  interval: any;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }

  startCarousel() {
    if (this.carouselArr.length > 0) {
      this.currentItem = this.carouselArr[0];
      this.interval = setInterval(() => this.next(), 2000);
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselArr.length;
    this.currentItem = this.carouselArr[this.currentIndex];
  }
}
