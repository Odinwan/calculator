import axios from 'axios';
import Cookies from 'js-cookie';

import { Collection, FetchClient } from './interface';

export class Client implements FetchClient {
  private readonly baseUrl: string;
  private readonly token: string;

  constructor(token?: string) {
    this.baseUrl = 'http://localhost:4000';
    this.token = token || '';
  }

  /**
   * Формирование базовых заголовоком с токеном авторизации
   * @param baseHeaders
   * @private
   */
  private getHeaders(baseHeaders: Collection<string>) {
    const token: string | undefined = this.token ? this.token : (Cookies.get('token') as string);

    if (!token || token.length === 0) {
      return {
        ...baseHeaders,
      };
    }

    return {
      ...baseHeaders,
      Authorization: `${token}`,
    };
  }

  /**
   * Выполнение запроса к серверу
   * @param url
   * @param headers
   */
  async Get<Response>(url: string, headers?: Collection<string>): Promise<Response> {
    const commonHeaders: Collection<string> = {};
    const urlWithServer = `${this.baseUrl}${url}`;

    const collectionHeaders = this.getHeaders({ ...commonHeaders, ...(headers || {}) });

    return axios({
      method: 'GET',
      url: urlWithServer,
      headers: collectionHeaders,
    }).then((json) => {
      if (json.data) {
        return json.data;
      }

      return json;
    });
  }

  async Delete<Response>(url: string, headers?: Collection<string>): Promise<Response> {
    const commonHeaders: Collection<string> = {};
    const urlWithServer = `${this.baseUrl}${url}`;

    const collectionHeaders = this.getHeaders({ ...commonHeaders, ...(headers || {}) });

    return axios({
      method: 'DELETE',
      url: urlWithServer,
      headers: collectionHeaders,
    })
      .then((response) => response)
      .then((json) => {
        if (json.data) {
          return json.data;
        }

        return json;
      });
  }

  /**
   * Выполнение запроса к серверу
   *
   * @param url
   * @param data
   * @param headers
   */
  async Post<V, Response>(url: string, data: V, headers?: Collection<string>): Promise<Response> {
    const commonHeaders: Collection<string> = {};
    const urlWithServer = `${this.baseUrl}${url}`;

    const collectionHeaders = this.getHeaders({ ...commonHeaders, ...(headers || {}) });

    return axios({
      method: 'POST',
      url: urlWithServer,
      headers: collectionHeaders,
      data,
    }).then((json) => json.data);
  }

  /**
   * Выполнение запроса к серверу
   *
   * @param url
   * @param data
   * @param headers
   */
  async Put<V, Response>(url: string, data: V, headers?: Collection<string>): Promise<Response> {
    const commonHeaders: Collection<string> = {};
    const urlWithServer = `${this.baseUrl}${url}`;

    const collectionHeaders = this.getHeaders({ ...commonHeaders, ...(headers || {}) });

    return axios({
      method: 'PUT',
      url: urlWithServer,
      headers: collectionHeaders,
      data,
    }).then((json) => json.data);
  }
}
