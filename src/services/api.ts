const API_URL = 'http://localhost:3333';

export async function loginApi(email: string, senha: string) {
    const response = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({email, senha})
    })

    if(!response.ok){
        throw new Error('Email ou senha incorretos')
    }

    return response.json() //retorna: { token, morador: { id, nome, email, role, condominio } }
}


export async function getProduto(busca?: string, categoriaId?: number, pagina?: number, limite?: number) {
    const token = localStorage.getItem('token')
    const partes: string[] = []

    if(busca) partes.push(`busca=${busca}`)
    if(categoriaId) partes.push(`categoriaId=${categoriaId}`)
    if(pagina) partes.push(`pagina=${pagina}`)
    if(limite) partes.push(`limite=${limite}`)

    const query = partes.length > 0 ? `?${partes.join('&')}` : ''
    const url = `${API_URL}/produtos${query}`

    const response = await fetch(url, {
        headers: { 'Authorization': `Bearer ${token}` }
    })

    if(!response.ok) throw new Error('Erro ao buscar produto')

    const data = await response.json()
    return data.data
}


export async function getProdutoById(id:number) {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/produtos/${id}`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error('Produto não encontrado')
    }

    const data = await response.json()
    return data.data
}

export async function getCategoria(){
    const token =  localStorage.getItem('token');
    const response = await fetch(`${API_URL}/categoria`, {
        headers: { 'Authorization':`Bearer ${token}` }
    })

    if(!response.ok){
        throw new Error('Erro ao buscar categorias')
    }

    const data = await response.json();
    return data.data;
}


export async function criarPedido(itens: { produtoId: number, quantidade: number} []) {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/pedidos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ itens })
    });

    if(!response.ok){
        throw new Error('Erro ao criar pedido')
    }

    return response.json()
}

export async function getDashboard() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/dashboard`, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error('Erro ao buscar dashboard')
    }

    const data = await response.json()
    return data.data
}

//PAINEL ADMIN - MORADORES
export async function getMoradores() {
    const token = localStorage.getItem('token');

    const response = await fetch(`${API_URL}/moradores`, {
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if(!response.ok) throw new Error('Erro ao buscar moradores');

    const data = await response.json()
    return data.data
}

export async function deletarMorador(id: number) {
    const token = localStorage.getItem('token')

    const response = await fetch(`${API_URL}/moradores/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    });

    if(!response.ok) throw new Error('Erro ao deletar morador')
}

export async function criarMorador(dados: {
    nome: string
    email: string
    senha: string
    condominioId: number
    role: string
}) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/auth/registro`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })
    
    if(!response.ok) throw new Error('Erro ao criar morador')
    
    return response.json();
}

export async function atualizarMorador(id: number, dados: Partial<{
    nome: string
    email: string
    senha: string
}>) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/moradores/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })

    if(!response.ok) throw new Error('Erro ao atualizar morador')
    return response.json()
}

//PAINEL ADMIN - PRODUTOS
export async function getProdutosAdmin(busca?: string, apenasInativos?: boolean) {
    const token = localStorage.getItem('token');
    const partes: string[] = []

    if(busca) partes.push(`busca=${busca}`)
    if(apenasInativos) partes.push(`apenasInativos=true`)
    
    const query = partes.length > 0 ? `?${partes.join('&')}` : ''
    const url = `${API_URL}/produtos${query}`

    const response = await  fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
    if(!response.ok) throw new Error('Erro ao buscar produtos')

    const data = await response.json()
    return data.data
}

export async function criarProdutos(dados: {   
    nome: string
    descricao: string
    preco: number
    estoque: number
    categoriaId: number
    imagem?: string
}) {
    const token = localStorage.getItem('token')
     const response = await fetch(`${API_URL}/produtos`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })

    if(!response.ok){
        throw new Error('Erro ao criar produto')
    }

    return response.json()
}

export async function atualizarProduto(id: number, dados: Partial<{
    nome: string
    descricao: string
    preco: number
    estoque: number    
}>) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(dados)
    })   
    
    if(!response.ok){
        throw new Error('Erro ao atualizar produto')
    }

    return response.json()
}

export async function deletarProduto(id: number) {
    const token = localStorage.getItem('token')
    const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
    })
    if(!response.ok) throw new Error('Erro ao deletar produto')
}

export async function reativarProduto(id: number) {
    const token = localStorage.getItem('token');
    const response = await fetch(`${API_URL}/produtos/${id}`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
    })

    if(!response.ok) throw new Error('Erro ao reativar produto')
}