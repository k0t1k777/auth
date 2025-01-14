## React

Плюсы и минусы React по вашему мнению:

   +  лёгкий для понимания
   +  компонентный подход, кастомизация хуков
   +  легко оптимизируется и масштабируется
   +  виртуальный DOM (быстрее обычного DOM)

   -  виртуальный дом (SEO оптимизация)
   -  некоторые приложения имеют большой вес, что может влиять на оптимизацию

## Next

   - Next.js — это фреймворк для React, предназначенный для упрощения разработки серверных и клиентских приложений с использованием React. Его плюсы:
      SSR, SSG, роутинг на основе файловой системы, есть предзагрузка ресурсов. Next в основном пердназначен решать проблемы SEO оптимизации и он еще быстрее реакта.
   -  Middleware - это функции, которые выполняются до того, как запрос будет обработан приложении. Middleware позволяет решать задачи аутентификации, авторизации, редиректов, логирования на уровне серверной логики. 

## задача сделать условную авторизацию пользователя

```
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
```

1. необходимо на реализацию пару часов
2. Axios

## Оценка раздела новостей

1. Что вам потребуется для реализации задачи?
  - Сделать авторизацию
  - получить новости с помощью API
  - разработать механизм закрепления новостей
  - предусмотреть права доступа для каждой роли
2. Что нужно уточнить менеджера?
  - как будеть выглядеть механизм закрепления новостей
  - для каких ролей какие новости доступны
  - как будет управление ролями
3. Как вы считаете, сколько времени потребуется на реализацию задачи?
  - 1 час на ознакомление с проектом, если он новый для меня
  - на авторизацию 2-3 часа
  - на получение новостей 1 час
  - 2 часа на логику закрепления/открепления новостей