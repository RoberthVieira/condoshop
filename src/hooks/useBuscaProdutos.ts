import { useState, useEffect } from "react";
import { getProduto } from "../services/api";
import type { ProdutoTypes } from "../types/ProdutoTypes";

export function useBuscaProdutos(categoriaId?: number) {
    const [produtos, setProduto] = useState<ProdutoTypes[]>([]);
    const [busca, setBusca] = useState('')
    const [pagina, setPagina] = useState(1)

    useEffect(() => {
        getProduto(busca, categoriaId, pagina, 6).then(data => {
            setProduto(data)
        })
    }, [busca, categoriaId, pagina]);

    useEffect(() => {
        setPagina(1)
    }, [busca, categoriaId])

    return { produtos, busca, setBusca, pagina, setPagina }
}