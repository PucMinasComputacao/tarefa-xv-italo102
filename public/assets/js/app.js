async function carregarFilmes() {
  try {
    const resp = await fetch('/filmes');
    const filmes = await resp.json();
    renderizarCards(filmes);
    aplicarIconesFavoritos();
  } catch (e) {
    document.getElementById('filmes-container').innerHTML = '<p>Erro ao carregar filmes.</p>';
  }
}

function renderizarCards(filmes) {
  const container = document.getElementById('filmes-container');
  container.innerHTML = filmes.map(filme => criarCardHTML(filme)).join('');
}

function criarCardHTML(filme) {
  return `<article class="card"><div class="card-img-wrap"><img src="${filme.imagem}" alt="${filme.titulo}" loading="lazy"/><div class="card-badge">* ${filme.nota}</div><button class="btn-fav" data-fav-id="${filme.id}" onclick="handleFavoritar(${filme.id})" title="Favoritar">&#9825;</button></div><div class="card-body"><h3 class="card-title">${filme.titulo}</h3><div class="card-meta"><span>${filme.ano}</span></div><span class="card-genero">${filme.genero}</span><p class="card-desc">${filme.descricao}</p></div></article>`;
}

function aplicarIconesFavoritos() {
  const usuario = getUsuarioCorrente();
  if (!usuario) return;
  const favs = getFavoritos(usuario.id);
  document.querySelectorAll('[data-fav-id]').forEach(function(btn) {
    const id = parseInt(btn.getAttribute('data-fav-id'));
    btn.innerHTML = favs.includes(id) ? '&#10084;' : '&#9825;';
    btn.classList.toggle('favoritado', favs.includes(id));
  });
}

function atualizarBotaoFavorito(itemId, ativo) {
  const btn = document.querySelector('[data-fav-id="' + itemId + '"]');
  if (!btn) return;
  btn.innerHTML = ativo ? '&#10084;' : '&#9825;';
  btn.classList.toggle('favoritado', ativo);
}

document.addEventListener('DOMContentLoaded', function() {
  initLoginApp().then(function() {
    carregarFilmes();
  });
});