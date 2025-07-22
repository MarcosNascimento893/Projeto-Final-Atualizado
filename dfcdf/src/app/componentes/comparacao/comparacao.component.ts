import { Component, ElementRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Vehicle {
  nome: string;
  preco: number;
  alturaCacamba: number;
  alturaVeiculo: number;
  alturaSolo: number;
  capacidadeCarga: number;
  motor: string;
  potencia: number;
  volumeCacamba: number;
  roda: string;
  image: string;
}

@Component({
  selector: 'app-comparacao',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comparacao.component.html',
  styleUrls: ['./comparacao.component.css']
})
export class ComparacaoComponent {
  @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;
  @ViewChild('sidebarOverlay') overlay!: ElementRef<HTMLDivElement>;

  isSidebarOpen: boolean = false;

  vehicles: Vehicle[] = [
    {
      nome: 'XL Cabine Simples 2.2 Diesel 4X4 MT 2022',
      preco: 183850,
      alturaCacamba: 511,
      alturaVeiculo: 1821,
      alturaSolo: 232,
      capacidadeCarga: 1234,
      motor: '2.2',
      potencia: 160,
      volumeCacamba: 1420,
      roda: 'Aço Estampado 16',
      image: 'XL Cabine.jpg'
    },
    {
      nome: 'XLS 2.2 Diesel 4X4 AT 2022',
      preco: 220690,
      alturaCacamba: 511,
      alturaVeiculo: 1821,
      alturaSolo: 232,
      capacidadeCarga: 1076,
      motor: '2.2',
      potencia: 160,
      volumeCacamba: 1180,
      roda: 'Aço Estampado 16',
      image: 'xls 2.2 diesel.jpg'
    },
    {
      nome: 'Ford Bronco 2.0 Turbo 4x4 2025',
      preco: 265000,
      alturaCacamba: 0,
      alturaVeiculo: 1783,
      alturaSolo: 225,
      capacidadeCarga: 580,
      motor: '2.0 Turbo Ecoboost',
      potencia: 253,
      volumeCacamba: 0,
      roda: '17 liga leve',
      image: 'bronco-preta.png'
    },
    {
      nome: 'Mustang GT 5.0 V8 Fastback 2024',
      preco: 247089,
      alturaCacamba: 0,
      alturaVeiculo: 1400,
      alturaSolo: 135,
      capacidadeCarga: 382,
      motor: '5.0 V8',
      potencia: 480,
      volumeCacamba: 0,
      roda: 'Liga Leve 19',
      image: 'mustang.png'
    },
    {
      nome: 'Ford Ranger 3.0 V6 4x4 2024',
      preco: 289990,
      alturaCacamba: 540,
      alturaVeiculo: 1884,
      alturaSolo: 235,
      capacidadeCarga: 1054,
      motor: '3.0 V6 Turbo Diesel',
      potencia: 250,
      volumeCacamba: 1250,
      roda: 'Liga Leve 18',
      image: 'rangernew.png'
    },
    {
      nome: 'Ford Territory 1.5 Turbo EcoBoost AT 2025',
      preco: 175000,
      alturaCacamba: 0,
      alturaVeiculo: 1706,
      alturaSolo: 190,
      capacidadeCarga: 448,
      motor: '1.5 L EcoBoost I4',
      potencia: 150,
      volumeCacamba: 0,
      roda: 'Liga Leve 18',
      image: 'territory.png'
    }
  ];

  compareList: Vehicle[] = [];
  showCompare = false;

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

  toggleCompare(vehicle: Vehicle): void {
    if (this.compareList.length >= 2 && !this.isInCompare(vehicle)) {
      alert('Você só pode comparar dois carros ao mesmo tempo.');
      return;
    }

    const index = this.compareList.findIndex(v => v.nome === vehicle.nome);
    if (index === -1) {
      this.compareList.push(vehicle);
    } else {
      this.compareList.splice(index, 1);
    }
  }

  isInCompare(vehicle: Vehicle): boolean {
    return this.compareList.some(v => v.nome === vehicle.nome);
  }
}
