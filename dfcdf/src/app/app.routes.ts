import { Routes } from '@angular/router';
import { DashboardComponent } from './componentes/dashboard/dashboard.component';
import { HomeComponent } from './componentes/home/home.component';
import { LoginComponent } from './componentes/login/login.component';
import { ComparacaoComponent } from './componentes/comparacao/comparacao.component';
import { FeedbackComponent } from './componentes/feedback/feedback.component';
import { FaleConoscoComponent } from './componentes/fale-conosco/fale-conosco.component';



export const routes: Routes = [
  { path: '', redirectTo: 'comparacao', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'comparacao', component: ComparacaoComponent },
  { path: 'feedback', component: FeedbackComponent },
  { path: 'fale_conosco', component: FaleConoscoComponent},
];
