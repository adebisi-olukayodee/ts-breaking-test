export interface Cfg { mode: 'a' | 'b' | 'c' }
export function set(cfg: Cfg){ return cfg.mode; }
