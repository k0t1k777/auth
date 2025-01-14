const API_URL = 'https://test';

const REQUEST = {
  email: 'example@example.com',
  password: 'p@$$w0rd',
};

const RESPONSE = {
  id: 1,
  token: 'XlPyYFtyfzmsf5rnRIzyuZ4MZo5GoCSxNcI_wAeOqb18zCxhSM5cYxU8fFerrdcC',
  refreshToken:
    'XlPyYFtyfzmsf5rnRIzyuZ4MZo5GoCSxNcI_wAeOqb18zCxhSM5cYxU8fFerrdcC',
  user: {
    first_name: 'Иван',
    last_name: 'Иванов',
    email: 'example@example.com',
  },
};

async function loginUser({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const response = await fetch(`${API_URL}/v1/login/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) {
    throw new Error('Ошибка авторизации');
  }
  return response.json();
}

async function refreshTokens(refreshToken: string) {
  const response = await fetch(`${API_URL}/v1/refresh/`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ refreshToken }),
  });
  if (!response.ok) {
    throw new Error('Ошибка обновления токенов');
  }
  return response.json();
}

function App() {
  function handleRegister() {
    const registerData = RESPONSE;
    console.log('Данные после регистрации:', registerData);
    handleLogin();
  }

  async function handleLogin() {
    try {
      const accessToken = localStorage.getItem('token');
      const refreshToken = localStorage.getItem('refreshToken');
      if (accessToken) {
        console.log('AccessToken уже существует:', accessToken);
      } else if (refreshToken) {
        const newTokens = await refreshTokens(refreshToken);
        localStorage.setItem('token', newTokens.token);
        localStorage.setItem('refreshToken', newTokens.refreshToken);
      } else {
        const loginData = await loginUser(REQUEST);
        localStorage.setItem('token', loginData.token);
        localStorage.setItem('refreshToken', loginData.refreshToken);
      }
    } catch (error) {
      console.log('Ошибка регистрации или входа:', error);
    }
  }

  handleRegister();

  return <div></div>;
}

export default App;
