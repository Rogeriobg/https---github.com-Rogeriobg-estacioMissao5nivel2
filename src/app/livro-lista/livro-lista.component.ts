import { Component, OnInit } from '@angular/core';
import { ControleLivrosService } from '../controle-livros.service';
import { ControleEditoraService } from '../controle-editora.service';
import { Editora } from '../editora';
import { Livro } from '../livro';
import { Subscription } from 'rxjs';




@Component({
  selector: 'app-livro-lista',
  templateUrl: './livro-lista.component.html',
  styleUrls: ['./livro-lista.component.css']
})
export class LivroListaComponent implements OnInit {
  public editoras: Array<Editora> = [];
  public livros: Array<Livro> = [];
  private livrosSubscription: Subscription | undefined;

  constructor(private servEditora: ControleEditoraService, private servLivros: ControleLivrosService) { }

  ngOnInit(): void {

    this.livrosSubscription = this.servLivros.obterLivros().subscribe(
      (data: Livro[]) => {
        this.livros = data;
      },
      error => {
        console.error('Erro ao obter os livros:', error);
      }
    );

    this.editoras = this.servEditora.getEditoras();
  }


  excluirLivro(_id: string): void {
    if (this.livrosSubscription) {
      this.livrosSubscription.unsubscribe();
    }

    this.servLivros.excluirLivro(_id).subscribe(
      (success: boolean) => {
        if (success) {

          this.atualizarListaLivros();
        } else {
          console.error('Erro ao excluir o livro.');

        }
      },
      error => {
        console.error('Erro ao excluir o livro:', error);

      }
    );
  }

  private atualizarListaLivros(): void {
    this.livrosSubscription = this.servLivros.obterLivros().subscribe(
      (data: Livro[]) => {
        this.livros = data;
      },
      error => {
        console.error('Erro ao obter os livros:', error);

      }
    );
  }

  obterNome(codEditora: number): string {
    return this.servEditora.getNomeEditora(codEditora);
  }
}