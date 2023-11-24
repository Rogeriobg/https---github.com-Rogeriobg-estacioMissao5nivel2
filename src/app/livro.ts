export class Livro {
    constructor(
        public _id: string,
        public codEditora: number,
        public titulo: string,
        public resumo: string,
        public autores: string[],

    ) { }
}