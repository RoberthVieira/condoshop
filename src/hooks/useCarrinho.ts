import { useState } from "react";
import type { ItemCarrinho } from "../types/ItemCarrinho";

export function useCarrinho() {
    const [itens, setItens] = useState<ItemCarrinho[]>(() => {
        const salvo = localStorage.getItem('carrinho')
        return salvo ? JSON.parse(salvo) : []
    })

    function salvarCarrinho(novosItens: ItemCarrinho[]) {
        setItens(novosItens)
        localStorage.setItem('carrinho', JSON.stringify(novosItens))
    }

    function adicionarItem(produto: ItemCarrinho) {
        const  jaExiste = itens.find(item => item.produtoId === produto.produtoId)
        
        if(jaExiste){
            const atualizado = itens.map(item => item.produtoId === produto.produtoId
                ? { ...item, quantidade: item.quantidade + 1}
                : item
            )

            salvarCarrinho(atualizado)
        } else {
            salvarCarrinho([...itens, { ...produto, quantidade: 1}])
        }
    }

    function removerItem(produtoId: number){
        const atualizado = itens.filter(item => item.produtoId !== produtoId)
        salvarCarrinho(atualizado)
    }

    function limparCarrinho() {
        setItens([])
        localStorage.removeItem('carrinho')
    }

    return {
        itens,
        adicionarItem,
        removerItem,
        limparCarrinho
    }
} 