import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // ✅ IMPORTANTE

@Component({
  selector: 'app-fale-conosco',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.css']
})
export class FaleConoscoComponent {
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;
  @ViewChild('sidebarOverlay') overlay!: ElementRef<HTMLDivElement>;

  isSidebarOpen: boolean = false;

  constructor(private router: Router) {} 

  cards = [
    {
      titulo: 'Telefone - Central de Relacionamento com o Cliente',
      descricao: 'A Central de Relacionamento Ford Motor Company está disponível de segunda a sexta-feira, das 7h30 às 17h30 pelo número 0800 703 3673.',
      imagem: 'trabalho1.jpg',
      temSeta: false
    },
    {
      titulo: 'Fale Conosco via WhatsApp',
      descricao: 'Fale diretamente conosco pelo WhatsApp clicando no botão abaixo.',
      imagem: 'trabalho2.jpg',
      temSeta: true,
      link1: 'https://wa.me/551142003303'
    },
    {
      titulo: 'Formulário Online',
      descricao: 'Prefere preencher um formulário? Clique abaixo e acesse nossa página personalizada.',
      imagem: 'trabalho3.jpg',
      temSeta: true,
      link1: '/feedback'
    }
  ];

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

  logout(): void {
    localStorage.clear(); // limpa token/sessão
    this.router.navigate(['/login'], { replaceUrl: true }); // impede voltar com seta
  }
}
