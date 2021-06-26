import { TFunctionKeys } from 'i18next';
import { TFunction } from 'next-i18next';

export type Nullable<T> = T | null;

type TFuncParams = Parameters<TFunction>;
export type TranslationKey = TFunctionKeys;
export type Translatable = [TFuncParams[0]] | [TFuncParams[0], Exclude<TFuncParams[2], string | undefined>];
