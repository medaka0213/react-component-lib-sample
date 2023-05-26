const API_KEY =
  process.env.API_KEY || process.env.NEXT_PUBLIC_API_KEY || 'API_KEY';
const API_BASE_URL =
  process.env.API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL || '/api';

interface CallApiProps {
  params?: any;
  method?: string;
  contentType?: string;
  body?: any;
}

interface ApiClientProps {
  baseURL?: string;
  apiKey?: string;
}

// APIのクライアント (共通)
export class ApiClient {
  private apiKey: string;
  private baseURL: string;

  constructor({ baseURL, apiKey = API_KEY }: ApiClientProps) {
    this.apiKey = apiKey;
    this.baseURL = baseURL || API_BASE_URL;
  }

  private async callApi(
    path: string = '/',
    {
      params = {},
      method = 'GET',
      contentType = 'application/json',
      body = null,
    }: CallApiProps
  ) {
    let url = `${this.baseURL}${path}`;
    if (params) {
      const query = Object.keys(params)
        .map((k) => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
        .join('&');
      url += `?${query}`;
    }
    console.log('fetch', method, url);
    let headers = {
      'Content-Type': contentType,
      'X-API-Key': this.apiKey,
    };
    let req: any = {
      method,
      headers,
    };
    if (method !== 'GET' && method !== 'HEAD') {
      req.body = body;
    }
    return await fetch(url, req);
  }

  async callApiJson(
    path: string = '/',
    {
      params = {},
      method = 'GET',
      contentType = 'application/json',
      body = null,
    }: CallApiProps
  ) {
    const res = await this.callApi(path, {
      params,
      method,
      contentType,
      body: JSON.stringify(body || {}),
    });
    return await res.json();
  }

  async callApiBlob(
    path: string = '/',
    {
      params = {},
      method = 'GET',
      contentType = 'application/json',
      body = null,
    }: CallApiProps
  ) {
    const res = await this.callApi(path, {
      params,
      method,
      contentType,
      body: JSON.stringify(body || {}),
    });
    return await res.blob();
  }

  async callApiText(
    path: string = '/',
    {
      params = {},
      method = 'GET',
      contentType = 'application/json',
      body = null,
    }: CallApiProps
  ) {
    const res = await this.callApi(path, {
      params,
      method,
      contentType,
      body: JSON.stringify(body || {}),
    });
    return await res.text();
  }
}

//Guppy AdminAPIのクライアント
export class AdminApiClient extends ApiClient {
  constructor({ baseURL, apiKey = API_KEY }: ApiClientProps) {
    super({
      apiKey,
      baseURL: baseURL || API_BASE_URL,
    });
  }

  async getItem({ type, pk }: { type: string; pk: string }) {
    const res = await this.callApiJson(`/q/${type}/i/${pk}`, {
      method: 'GET',
    });
    return res.Item;
  }

  async postItem({ type, submission }: { type: string; submission: any }) {
    const res = await this.callApiJson(`/q/${type}`, {
      method: 'POST',
      body: { submission },
    });
    return res.Item || {};
  }

  async putItem({
    type,
    submission,
    overwrite = false,
  }: {
    type: string;
    submission: any;
    overwrite: boolean;
  }) {
    return await this.callApiJson(`/q/${type}`, {
      method: 'PUT',
      body: { submission },
      params: { overwrite },
    });
  }

  async deleteItem({ type, pk }: { type: string; pk: string }) {
    return await this.callApiJson(`/q/${type}/i/${pk}`, {
      method: 'DELETE',
    });
  }

  async listItem({ type, params }: { type: string; params: any }) {
    const res = await this.callApiJson(`/q/${type}`, {
      method: 'GET',
      params,
    });
    return res.Items || [];
  }

  async getRelation({
    type,
    pk,
    pld_key = '',
  }: {
    type: string;
    pk: string;
    pld_key?: string;
  }) {
    let path = `/q/${type}/i/${pk}/rel`;
    if (pld_key) {
      path += `/${pld_key}`;
    }
    const res = await this.callApiJson(path, { method: 'GET' });
    return res.Items || [];
  }

  async postRelation({
    type,
    pk,
    pld_pk,
  }: {
    type: string;
    pk: string;
    pld_pk: any;
  }) {
    const submission = { pk: pld_pk };
    return await this.callApiJson(`/q/${type}/i/${pk}/rel`, {
      method: 'POST',
      body: { submission },
    });
  }

  async deleteRelation({
    type,
    pk,
    submission,
  }: {
    type: string;
    pk: string;
    submission: any;
  }) {
    const res = await this.callApiJson(`/q/${type}/i/${pk}/rel`, {
      method: 'DELETE',
      body: { submission },
    });
    return res.Items || [];
  }

  async getReference({
    type,
    pk,
    pld_key = '',
  }: {
    type: string;
    pk: string;
    pld_key?: string;
  }) {
    let path = `/q/${type}/i/${pk}/ref`;
    if (pld_key) {
      path += `/${pld_key}`;
    }
    const res = await this.callApiJson(path, { method: 'GET' });
    return res.Items || [];
  }

  async postReference({
    type,
    pk,
    pld_pk,
  }: {
    type: string;
    pk: string;
    pld_pk: any;
  }) {
    const submission = { pk: pld_pk };
    return await this.callApiJson(`/q/${type}/i/${pk}/ref`, {
      method: 'POST',
      body: { submission },
    });
  }

  async deleteReference({
    type,
    pk,
    submission,
  }: {
    type: string;
    pk: string;
    submission: any;
  }) {
    const res = await this.callApiJson(`/q/${type}/i/${pk}/ref`, {
      method: 'DELETE',
      body: { submission },
    });
    return res.Items || [];
  }

  async generateCountdownImage({ pk }: { pk: string }) {
    return await this.callApiJson(`/countdown-generate/${pk}`, {
      method: 'GET',
    });
  }
}
