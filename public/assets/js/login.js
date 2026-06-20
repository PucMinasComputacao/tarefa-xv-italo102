/**
 * Módulo de Login
 * Gerencia autenticação de usuários via JSON Server + sessionStorage
 */

const LOGIN_REDIRECT = '/modulos/login/index.html';
const HOME_REDIRECT = '/index.html';

let usuariosDB = [];

/**
 * Inicializa o módulo de login.
 * Carrega usuários do servidor e verifica se há sessão ativa.
 * Se não houver, redireciona para a tela de login.
 */
async function initLoginApp() {
  try {
    const resp = await fetch('/usuarios');
    usuariosDB = await resp.json();
  } catch (e) {
    console.error('Erro ao carregar usuários:', e);
  }

  const usuarioCorrente = getUsuarioCorrente();

  // Se estiver na home e não estiver logado, redireciona
  if (!usuarioCorrente && !window.location.pathname.includes('/modulos/login')) {
    window.location.href = LOGIN_REDIRECT;
    return;
  }

  // Atualiza a UI com o usuário logado
  renderLoginArea(usuarioCorrente);
}

/**
 * Retorna o usuário atual da sessão (sessionStorage) ou null.
 * @returns {Object|null}
 */
function getUsuarioCorrente() {
  const dados = sessionStorage.getItem('usuarioCorrente');
  return dados ? JSON.parse(dados) : null;
}

/**
 * Valida login e senha, salva sessão e redireciona para home.
 * @param {string} login
 * @param {string} senha
 * @returns {boolean} true se login bem-sucedido
 */
function loginUser(login, senha) {
  const usuario = usuariosDB.find(
    u => u.login === login && u.senha === senha
  );

  if (!usuario) return false;

  const usuarioCorrente = {
    id: usuario.id,
    nome: usuario.nome,
    login: usuario.login,
    senha: usuario.senha,
    email: usuario.email
  };

  sessionStorage.setItem('usuarioCorrente', JSON.stringify(usuarioCorrente));
  window.location.href = HOME_REDIRECT;
  return true;
}

/**
 * Encerra a sessão do usuário e redireciona para o login.
 */
function logoutUser() {
  sessionStorage.removeItem('usuarioCorrente');
  window.location.href = LOGIN_REDIRECT;
}

/**
 * Renderiza a área de login/usuário no header.
 * Procura o elemento com id="login-area" e injeta o HTML adequado.
 * @param {Object|null} usuario
 */
function renderLoginArea(usuario) {
  const area = document.getElementById('login-area');
  if (!area) return;

  if (usuario) {
    area.innerHTML = `
      <span class="login-greeting">Olá, <strong>${usuario.nome.split(' ')[0]}</strong></span>
      <span class="login-sep">|</span>
      <a href="#" class="login-link logout-btn" onclick="logoutUser(); return false;">Sair</a>
    `;
  } else {
    area.innerHTML = `
      <a href="${LOGIN_REDIRECT}" class="login-link">Entrar</a>
    `;
  }
}
