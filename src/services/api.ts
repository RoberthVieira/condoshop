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

export async function getProduto(busca?: string) {
    const token = localStorage.getItem('token')

    const url = busca
        ? `${API_URL}/produtos?busca=${busca}`
        : `${API_URL}/produtos`

    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })

    if(!response.ok){
        throw new Error('Erro ao buscar produto')
    }

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