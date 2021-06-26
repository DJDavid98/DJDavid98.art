import 'react-i18next';
import aboutNs from 'public/locales/en/about.json';
import commonNs from 'public/locales/en/common.json';
import ocNs from 'public/locales/en/oc.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      about: typeof aboutNs;
      common: typeof commonNs;
      oc: typeof ocNs;
    };
  }

  export type AppI18nNamespaces = keyof CustomTypeOptions['resources'] & string;
}
