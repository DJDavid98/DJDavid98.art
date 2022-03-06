import { TFunction } from 'next-i18next';

export type Nullable<T> = T | null;

export type OptionalProps<T, Keys extends keyof T> = Omit<T, Keys> & Partial<Pick<T, Keys>>;

type TFuncParams = Parameters<TFunction>;
export type Translatable = [TFuncParams[0]] | [TFuncParams[0], Exclude<TFuncParams[2], string | undefined>];
