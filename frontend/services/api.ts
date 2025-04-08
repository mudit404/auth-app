const API_BASE_URL = 'http://localhost:1337';

export interface RegisterParams {
  name: string;
  email: string;
  password: string;
}

export interface LoginParams {
  email: string;
  password: string;
}

export interface ApiResponse {
  status: string;
  error?: string;
  user?: string;
  quote?: string;
  name?: string;
}

export const registerUser = async (userData: RegisterParams): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(userData),
  });

  return response.json();
};

export const loginUser = async (credentials: LoginParams): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(credentials),
  });

  return response.json();
};

export const getQuote = async (token: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/quote`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
  });

  return response.json();
};

export const updateQuote = async (token: string, quote: string): Promise<ApiResponse> => {
  const response = await fetch(`${API_BASE_URL}/api/quote`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-access-token': token,
    },
    body: JSON.stringify({ quote }),
  });

  return response.json();
};