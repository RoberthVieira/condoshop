export interface ProdutoTypes {
    id: number;
    nome: string;
    preco: number;
    descricao: string;
    categoriaId: number | null;
    estoque: number;
    imagem?: string;
    condomminioId: number
}