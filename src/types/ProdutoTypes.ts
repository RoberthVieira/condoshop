export interface ProdutoTypes {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    categoriaId: string;
    estoque: number;
    imagem?: string;
    condomminioId: number
}