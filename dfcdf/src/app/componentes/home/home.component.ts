import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  isSidebarOpen = false;

  @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;
  @ViewChild('sidebarOverlay') overlay!: ElementRef<HTMLDivElement>;

  toggleSidebar(): void {
    const sidebarEl = this.sidebar.nativeElement;
    const overlayEl = this.overlay.nativeElement;

    this.isSidebarOpen = sidebarEl.classList.toggle('active');
    overlayEl.style.display = this.isSidebarOpen ? 'block' : 'none';

    document.body.classList.toggle('offcanvas-open', this.isSidebarOpen);
  }

  closeSidebar(): void {
    this.sidebar.nativeElement.classList.remove('active');
    this.overlay.nativeElement.style.display = 'none';
    document.body.classList.remove('offcanvas-open');
    this.isSidebarOpen = false;
  }
}
