import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Livro } from './livro';



@Injectable({
  providedIn: 'root'
})
export class ControleLivrosService {
  private baseURL = 'http://localhost:3030/livros';

  constructor(private http: HttpClient) { }

  obterLivros(): Observable<Livro[]> {
    return this.http.get<Livro[]>(this.baseURL);
  }

  incluir(livro: Livro): Observable<boolean> {
    const { _id, ...livroSemId } = livro;
    return this.http.post<boolean>(this.baseURL, livroSemId);
  }


  excluirLivro(_id: string): Observable<boolean> {
    return this.http.delete<boolean>(`${this.baseURL}/${_id}`);
  }
}
