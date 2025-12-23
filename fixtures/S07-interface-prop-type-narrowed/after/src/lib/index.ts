export interface Cfg { mode: 'a' | 'b' }
export function set(cfg: Cfg){ return cfg.mode; }
