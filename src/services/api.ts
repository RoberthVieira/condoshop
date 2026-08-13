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