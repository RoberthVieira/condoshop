import { createContext, useContext, useState } from 'react'
import type { ItemCarrinho } from '../types/ItemCarrinho'

interface CarrinhoContextType {
    itens: ItemCarrinho[]
    adicionarItem: (produto: ItemCarrinho) => void
    removerItem: (produtoId: number) => void
    limparCarrinho: () => void
}

const CarrinhoContext = createContext<CarrinhoContextType | null>(null)

export function CarrinhoProvider({ children }: { children: React.ReactNode }) {
    const [itens, setItens] = useState<ItemCarrinho[]>(() => {
        const salvo = localStorage.getItem('carrinho')
        return salvo ? JSON.parse(salvo) : []
    })

    function salvarCarrinho(novosItens: ItemCarrinho[]) {
        setItens(novosItens)
        localStorage.setItem('carrinho', JSON.stringify(novosItens))
    }

    function adicionarItem(produto: ItemCarrinho) {
        const jaExiste = itens.find(item => item.produtoId === produto.produtoId)
        if(jaExiste) {
            const atualizado = itens.map(item =>
                item.produtoId === produto.produtoId
                    ? { ...item, quantidade: item.quantidade + 1 }
                    : item
            )
            salvarCarrinho(atualizado)
        } else {
            salvarCarrinho([...itens, { ...produto, quantidade: 1 }])
        }
    }

    function removerItem(produtoId: number) {
        salvarCarrinho(itens.filter(item => item.produtoId !== produtoId))
    }

    function limparCarrinho() {
        setItens([])
        localStorage.removeItem('carrinho')
    }

    return (
        <CarrinhoContext.Provider value={{ itens, adicionarItem, removerItem, limparCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    )
}

export function useCarrinho() {
    const context = useContext(CarrinhoContext)
    if(!context) throw new Error('useCarrinho deve ser usado dentro do CarrinhoProvider')
    return context
}