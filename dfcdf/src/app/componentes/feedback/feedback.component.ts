import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; // IMPORTANTE

@Component({
  selector: 'app-feedback',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent {
  @ViewChild('sidebar') sidebar!: ElementRef;
  @ViewChild('sidebarOverlay') overlay!: ElementRef;

  isSidebarOpen: boolean = false;

  contato = {
    nome: '',
    sobrenome: '',
    email: '',
    cpf: '',
    telefone: '',
    contato: '',
    mensagem: '',
    concordaTermos: false,
    querNovidades: false
  };

  mensagemSucesso: string = '';
  mensagemErro: string = '';

  constructor(private router: Router) {} // Injeção do Router

  toggleSidebar(): void {
    const sidebarEl = this.sidebar.nativeElement;
    const overlayEl = this.overlay.nativeElement;

    this.isSidebarOpen = !this.isSidebarOpen;

    sidebarEl.classList.toggle('active', this.isSidebarOpen);
    overlayEl.style.display = this.isSidebarOpen ? 'block' : 'none';

    document.body.classList.toggle('offcanvas-open', this.isSidebarOpen);
  }

  closeSidebar(): void {
    this.sidebar.nativeElement.classList.remove('active');
    this.overlay.nativeElement.style.display = 'none';
    document.body.classList.remove('offcanvas-open');
    this.isSidebarOpen = false;
  }

  enviar() {
    const { nome, email, telefone, contato: contatoForma, mensagem, concordaTermos } = this.contato;

    if (
      nome.trim() &&
      email.trim() &&
      telefone.toString().trim() &&
      contatoForma &&
      mensagem.trim() &&
      concordaTermos
    ) {
      this.mensagemSucesso = `Obrigado sr(a) ${nome}, os seus dados foram encaminhados com sucesso!`;
      this.mensagemErro = '';
      console.log('Dados enviados:', this.contato);
      this.limparFormulario();
    } else {
      this.mensagemErro = 'Por favor, preencha todos os campos obrigatórios e concorde com os termos.';
      this.mensagemSucesso = '';
    }
  }

  limparFormulario() {
    this.contato = {
      nome: '',
      sobrenome: '',
      email: '',
      cpf: '',
      telefone: '',
      contato: '',
      mensagem: '',
      concordaTermos: false,
      querNovidades: false
    };
  }

  logout(): void {
    localStorage.clear(); 
    this.router.navigate(['/login'], { replaceUrl: true }); 
  }
}
