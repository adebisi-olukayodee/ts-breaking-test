import { Client } from '../lib';
export function useIt(){ return new Client().ping(); }
