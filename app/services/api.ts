import { API_URL, getAuthToken } from '@/lib/auth';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

interface RequestOptions {
  method?: HttpMethod;
  headers?: Record<string, string>;
  body?: any;
  isFormData?: boolean;
}

export async function request<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const { method = 'GET', headers = {}, body, isFormData = false } = options;
  
  const token = getAuthToken();
  const defaultHeaders: Record<string, string> = {};
  
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  if (!isFormData) {
    defaultHeaders['Content-Type'] = 'application/json';
  }

  const config: RequestInit = {
    method,
    headers: { ...defaultHeaders, ...headers },
  };

  if (body) {
    config.body = isFormData ? body : JSON.stringify(body);
  }

  const fullUrl = `${API_URL}${endpoint}`;
  console.log(`[API Request] ${method} ${fullUrl}`);
  const response = await fetch(fullUrl, config);
  
  let data;
  const contentType = response.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    data = await response.json();
  } else {
    data = { message: await response.text() };
  }

  if (!response.ok) {
    throw new Error(data.message || `Request failed with status ${response.status}`);
  }

  return data as T;
}

export const api = {
  get: <T>(endpoint: string, headers?: Record<string, string>) => 
    request<T>(endpoint, { method: 'GET', headers }),
    
  post: <T>(endpoint: string, body?: any, isFormData?: boolean, headers?: Record<string, string>) => 
    request<T>(endpoint, { method: 'POST', body, isFormData, headers }),
    
  put: <T>(endpoint: string, body?: any, headers?: Record<string, string>) => 
    request<T>(endpoint, { method: 'PUT', body, headers }),
    
  delete: <T>(endpoint: string, headers?: Record<string, string>) => 
    request<T>(endpoint, { method: 'DELETE', headers }),
};
