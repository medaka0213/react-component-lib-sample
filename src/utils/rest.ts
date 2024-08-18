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

  constructor({ baseURL = '', apiKey = '' }: ApiClientProps = {}) {
    this.apiKey = apiKey;
    this.baseURL = baseURL;
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
    const res = await fetch(url, req);
    if (!res.ok) {
      throw new Error(`API error: ${res.status} ${res.statusText}`);
    }
    return res;
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

//データ入出力用のクライアント
export class DataApiClient extends ApiClient {
  constructor({ baseURL = '', apiKey = '' }: ApiClientProps = {}) {
    super({
      apiKey,
      baseURL,
    });
  }

  async getItem({ type, pk }: { type: string; pk: string }) {
    return await this.callApiJson(`/q/${type}/i/${pk}/`, {
      method: 'GET',
    });
  }

  async postItem({ type, submission }: { type: string; submission: any }) {
    return await this.callApiJson(`/q/${type}/`, {
      method: 'POST',
      body: submission,
    });
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
    return await this.callApiJson(`/q/${type}/`, {
      method: 'POST',
      body: submission,
      params: { overwrite },
    });
  }

  async deleteItem({ type, pk }: { type: string; pk: string }) {
    return await this.callApiJson(`/q/${type}/i/${pk}/`, {
      method: 'DELETE',
    });
  }

  async listItem({ type, params }: { type: string; params: any }) {
    return await this.callApiJson(`/q/${type}/`, {
      method: 'GET',
      params,
    });
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
    let path = `/q/${type}/i/${pk}/rel/`;
    if (pld_key) {
      path += `/${pld_key}`;
    }
    return await this.callApiJson(path, { method: 'GET' });
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
    let path = `/q/${type}/i/${pk}/ref/`;
    if (pld_key) {
      path += `/${pld_key}`;
    }
    return await this.callApiJson(path, { method: 'GET' });
  }
}
