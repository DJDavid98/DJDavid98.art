import 'react-i18next';
import aboutNs from 'public/locales/en/about.json';
import commonNs from 'public/locales/en/common.json';
import ocAvatar from 'public/locales/en/avatar.json';
import ocNs from 'public/locales/en/oc.json';

declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: {
      about: typeof aboutNs;
      avatar: typeof ocAvatar;
      common: typeof commonNs;
      oc: typeof ocNs;
    };
  }

  export type AppI18nNamespaces = keyof CustomTypeOptions['resources'] & string;
}
