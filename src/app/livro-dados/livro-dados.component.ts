import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ControleEditoraService } from '../controle-editora.service';
import { ControleLivrosService } from '../controle-livros.service';
import { Livro } from '../livro';
import { Editora } from '../editora';
import { tap, finalize } from 'rxjs/operators';

@Component({
  selector: 'app-livro-dados',
  templateUrl: './livro-dados.component.html',
  styleUrls: ['./livro-dados.component.css']
})
export class LivroDadosComponent implements OnInit {
  public livro: Livro = new Livro('', 0, '', '', []);
  public autoresForm: string = '';
  public editoras: Array<Editora> = [];

  constructor(
    private servEditora: ControleEditoraService,
    private servLivros: ControleLivrosService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.editoras = this.servEditora.getEditoras();
  }

  incluir(): void {
    this.livro.autores = this.autoresForm.split('\n');

    this.servLivros.incluir(this.livro).pipe(
      tap((success: boolean) => {
        if (success) {

          this.router.navigateByUrl('/lista');
        } else {
          console.error('Erro ao incluir o livro.');
        }
      }),
      finalize(() => {

      })
    ).subscribe();
  }
}
