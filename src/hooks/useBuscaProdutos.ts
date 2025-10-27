import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import type { ProdutoTypes } from "../types/ProdutoTypes";

export function useBuscaProdutos(lista: ProdutoTypes[]){
    const [produtoBuscado, setProdutoBuscado] = useState<string>("");

    const [searchParams, setSearchParams] = useSearchParams();
    const parametroURL = searchParams.get('q') || "";

    const produtosFiltrados = lista.filter((prod) => 
        prod.nome.toLowerCase().includes(parametroURL.toLowerCase())
    );
    
    function atualizarBuscaNaUrl() {
        if(produtoBuscado.trim() === ""){
            setSearchParams({});
        } else {
            setSearchParams({q: produtoBuscado})
        }
    }

    return {
    produtoBuscado,
    setProdutoBuscado,
    parametroURL,
    produtosFiltrados,
    atualizarBuscaNaUrl
  };
}