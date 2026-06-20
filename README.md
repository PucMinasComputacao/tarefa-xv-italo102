# CineList – Catálogo de Filmes com Favoritos

**Atividade Prática – Login + Personalização**

---

## Informações do Aluno

- **Nome:** Italo
- **Matrícula:** 909414

---

## Descrição do Projeto

Aplicação web de catálogo de filmes com sistema de login integrado e funcionalidade de favoritos personalizada por usuário.

A entidade principal do projeto é **Filmes**, gerenciada via JSON Server.

---

## Como Executar

1. Instale o JSON Server (caso não tenha):
```bash
   npm install -g json-server
```

2. Na raiz do projeto, inicie o servidor:
```bash
   json-server --watch db.json --port 3000
```

3. Abra `http://localhost:3000` no navegador.

> **Usuários de teste:**
> - Login: `admin` | Senha: `123`
> - Login: `user` | Senha: `123`

---

## Funcionalidades Implementadas

### Login
- Verifica sessão via `sessionStorage`
- Redireciona para login se não autenticado
- Header exibe "Olá, [nome] | Sair" quando logado

### Favoritos
- Botão de favoritar em cada card
- Exige login para favoritar
- Salvo em `localStorage` com chave `favoritos_909414`
- Persiste ao recarregar a página

### Página Meus Favoritos
- Lista apenas os filmes favoritados pelo usuário logado

---

## Prints

### Home com usuário logado
![Home logado](prints/home-logado.png)

### Favorito marcado
![Favoritos](prints/favoritos-catalogo.png)

### Página Meus Favoritos
![Página favoritos](prints/pagina-favoritos.png)