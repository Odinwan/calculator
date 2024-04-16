import { Client } from './Client';

export const fetchClientFactory = (token?: string) => new Client(token);
