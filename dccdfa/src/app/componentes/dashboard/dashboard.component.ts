import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Veiculo, VeiculoData } from '../../models/veiculo.model';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { catchError, of } from 'rxjs';
import { DashboardService } from '../../services/dashboard.service';
import { Router } from '@angular/router'; // ✅ Importado

@Component({
  standalone: true,
  selector: 'app-dashboard',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  vehicles: Veiculo[] = [];
  selectedVehicle!: Veiculo;
  vehicleData!: VeiculoData;
  errorMessage?: string;

  isSidebarOpen = false;

  selectCarForms = new FormGroup({
    carId: new FormControl(''),
  });

  vinForm = new FormGroup({
    vin: new FormControl(''),
  });

  @ViewChild('sidebar') sidebar!: ElementRef<HTMLDivElement>;
  @ViewChild('sidebarOverlay') overlay!: ElementRef<HTMLDivElement>;

  constructor(
    private dashboardService: DashboardService,
    private router: Router // ✅ Injetado
  ) {}

  ngOnInit(): void {
    this.dashboardService.getVehicles().subscribe((res) => {
      this.vehicles = res.vehicles;
      const firstId = this.vehicles[0]?.id;
      this.selectCarForms.controls.carId.setValue(firstId.toString());
      this.selectedVehicle = this.vehicles[0];
    });

    this.selectCarForms.controls.carId.valueChanges.subscribe((id) => {
      const vehicleIndex = this.vehicles.findIndex(v => v.id.toString() === id);
      if (vehicleIndex !== -1) {
        this.selectedVehicle = this.vehicles[vehicleIndex];
      }
    });
  }

  consultarDadosPorVin() {
    const vin = this.vinForm.controls.vin.value;
    this.errorMessage = '';
    if (vin) {
      this.dashboardService
        .getVehicleData(vin)
        .pipe(
          catchError((error) => {
            this.errorMessage =
              'Erro ao buscar dados do veículo: ' +
              (error?.error?.message || 'Erro desconhecido');
            this.vehicleData = undefined!;
            return of(null);
          })
        )
        .subscribe((data) => {
          if (data) this.vehicleData = data;
        });
    }
  }

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
    localStorage.clear(); // ou sessionStorage.clear()
    this.router.navigate(['/login'], { replaceUrl: true }); // Evita voltar com o botão "voltar"
  }
}
