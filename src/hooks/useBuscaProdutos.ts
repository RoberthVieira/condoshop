import { useState, useEffect } from "react";
import { getProduto } from "../services/api";
import type { ProdutoTypes } from "../types/ProdutoTypes";

export function useBuscaProdutos() {
    const [produtos, setProduto] = useState<ProdutoTypes[]>([]);
    const [busca, setBusca] = useState('')

    useEffect(() => {
        getProduto(busca).then(data => {
            setProduto(data)
        })
    }, [busca]);

    return { produtos, busca, setBusca }
}