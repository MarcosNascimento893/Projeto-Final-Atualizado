import { Component, ElementRef, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CarouselItem {
  type: 'image' | 'video';
  src: string;
  text: string;
  link: string;
}

@Component({
  selector: 'app-carrosel-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carrosel-home.component.html',
  styleUrls: ['./carrosel-home.component.css']
})
export class CarroselHomeComponent implements OnInit, OnDestroy {
  carouselArr: CarouselItem[] = [
    { type: 'video', src: 'broncostroppe.mp4', text: '', link: '' },
    { type: 'image', src: 'shelbyford.png', text: '', link: '' },
    { type: 'image', src: 'ford_gt.png', text: '', link: '' }
  ];

  currentIndex = 0;
  currentItem!: CarouselItem;
  intervalId: any;


  isSidebarOpen = false;

  @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;
  @ViewChild('sidebarOverlay') overlay!: ElementRef<HTMLDivElement>;

  ngOnInit() {
    this.startCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  startCarousel() {
    if (this.carouselArr.length > 0) {
      this.currentItem = this.carouselArr[0];
      this.intervalId = setInterval(() => this.next(), 5000);
    }
  }

  next() {
    this.currentIndex = (this.currentIndex + 1) % this.carouselArr.length;
    this.currentItem = this.carouselArr[this.currentIndex];
  }

  // Funções do sidebar
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;

    if (this.isSidebarOpen) {
      this.sidebar.nativeElement.classList.add('active');
      this.overlay.nativeElement.classList.add('active');
      this.overlay.nativeElement.style.display = 'block';
    } else {
      this.sidebar.nativeElement.classList.remove('active');
      this.overlay.nativeElement.classList.remove('active');
      this.overlay.nativeElement.style.display = 'none';
    }

    document.body.classList.toggle('offcanvas-open', this.isSidebarOpen);
  }

  closeSidebar(): void {
    this.sidebar.nativeElement.classList.remove('active');
    this.overlay.nativeElement.classList.remove('active');
    this.overlay.nativeElement.style.display = 'none';
    document.body.classList.remove('offcanvas-open');
    this.isSidebarOpen = false;
  }
}
