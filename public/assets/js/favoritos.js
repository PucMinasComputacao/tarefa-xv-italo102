/**
 * Módulo de Favoritos
 * Persiste favoritos por usuário via localStorage (chave: favoritos_<idUsuario>)
 */

/**
 * Retorna a chave do localStorage para o usuário logado.
 * @param {number} userId
 * @returns {string}
 */
function getFavKey(userId) {
  return `favoritos_${userId}`;
}

/**
 * Retorna array de IDs favoritos do usuário.
 * @param {number} userId
 * @returns {number[]}
 */
function getFavoritos(userId) {
  const dados = localStorage.getItem(getFavKey(userId));
  return dados ? JSON.parse(dados) : [];
}

/**
 * Salva array de IDs favoritos do usuário.
 * @param {number} userId
 * @param {number[]} favs
 */
function saveFavoritos(userId, favs) {
  localStorage.setItem(getFavKey(userId), JSON.stringify(favs));
}

/**
 * Verifica se item é favorito.
 * @param {number} userId
 * @param {number} itemId
 * @returns {boolean}
 */
function isFavorito(userId, itemId) {
  return getFavoritos(userId).includes(itemId);
}

/**
 * Alterna favorito: adiciona se não estiver, remove se estiver.
 * @param {number} userId
 * @param {number} itemId
 * @returns {boolean} true se foi adicionado, false se removido
 */
function toggleFavorito(userId, itemId) {
  let favs = getFavoritos(userId);
  if (favs.includes(itemId)) {
    favs = favs.filter(id => id !== itemId);
    saveFavoritos(userId, favs);
    return false;
  } else {
    favs.push(itemId);
    saveFavoritos(userId, favs);
    return true;
  }
}

/**
 * Lida com clique no botão favoritar.
 * Se usuário não estiver logado, mostra alerta e redireciona.
 * @param {number} itemId
 */
function handleFavoritar(itemId) {
  const usuario = getUsuarioCorrente();

  if (!usuario) {
    mostrarToast('⚠️ Você precisa estar logado para favoritar!', 'aviso');
    setTimeout(() => { window.location.href = '/modulos/login/index.html'; }, 1500);
    return;
  }

  const adicionado = toggleFavorito(usuario.id, itemId);
  atualizarBotaoFavorito(itemId, adicionado);
  mostrarToast(adicionado ? '❤️ Adicionado aos favoritos!' : '🤍 Removido dos favoritos!', adicionado ? 'sucesso' : 'info');
}

/**
 * Atualiza visual do botão de favorito no card.
 * @param {number} itemId
 * @param {boolean} ativo
 */
function atualizarBotaoFavorito(itemId, ativo) {
  const btn = document.querySelector(`[data-fav-id="${itemId}"]`);
  if (!btn) return;
  btn.classList.toggle('favoritado', ativo);
  btn.setAttribute('aria-label', ativo ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
  btn.title = ativo ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
}

/**
 * Aplica estado visual de favoritos a todos os cards da página.
 */
function aplicarEstadoFavoritos() {
  const usuario = getUsuarioCorrente();
  if (!usuario) return;

  const favs = getFavoritos(usuario.id);
  document.querySelectorAll('[data-fav-id]').forEach(btn => {
    const id = parseInt(btn.getAttribute('data-fav-id'));
    const ativo = favs.includes(id);
    btn.classList.toggle('favoritado', ativo);
    btn.setAttribute('aria-label', ativo ? 'Remover dos favoritos' : 'Adicionar aos favoritos');
    btn.title = ativo ? 'Remover dos favoritos' : 'Adicionar aos favoritos';
  });
}

/**
 * Mostra um toast de notificação.
 * @param {string} msg
 * @param {string} tipo - 'sucesso' | 'aviso' | 'info'
 */
function mostrarToast(msg, tipo = 'info') {
  let toast = document.getElementById('toast-notif');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notif';
    document.body.appendChild(toast);
  }
  toast.textContent = msg;
  toast.className = `toast toast-${tipo} show`;
  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => toast.classList.remove('show'), 2800);
}
