import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

// Serviço responsável pelo login, injetado na raiz da aplicação
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseUrl = 'http://localhost:3001';

  constructor(private http: HttpClient) {}

  // Método que faz a requisição POST para o endpoint de login
  login(nome: string, senha: string): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/login`, { nome, senha });
  }
}
