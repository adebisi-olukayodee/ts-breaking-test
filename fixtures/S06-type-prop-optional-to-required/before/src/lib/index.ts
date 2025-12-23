export type Opt = { a?: string };
export function accept(o: Opt){ return o.a ?? 'x'; }
