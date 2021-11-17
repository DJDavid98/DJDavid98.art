import { GetStaticPaths, GetStaticPathsResult, GetStaticProps } from 'next';
import { SSRConfig } from 'next-i18next';
import { LANGUAGES } from 'src/config';
import { AVATAR_HISTORY } from 'src/config/avatars';
import { AvatarPage, AvatarPageProps } from 'src/pages/avatar/index';
import { typedServerSideTranslations } from 'src/util/i18n-server';

export default AvatarPage;

export const getStaticProps: GetStaticProps<AvatarPageProps & SSRConfig> = async ({ locale, params }) => {
  let avatarIndex: number | undefined;
  const avatarTimestampString = params?.timestamp;
  if (typeof avatarTimestampString === 'string' && /^\d+$/.test(avatarTimestampString)) {
    const avatarTimestamp = parseInt(avatarTimestampString, 10);
    const foundAvatarIndex = AVATAR_HISTORY.findIndex((def) => def.firstUsed === avatarTimestamp);
    if (foundAvatarIndex !== -1) {
      avatarIndex = foundAvatarIndex;
    }
  }

  return {
    props: {
      avatarIndex,
      ...(await typedServerSideTranslations(locale, ['avatar'])),
    },
  };
};

export const getStaticPaths: GetStaticPaths = async (ctx) => ({
  paths: AVATAR_HISTORY.reduce((acc, { firstUsed }) => {
    const newParams: typeof acc = [];
    const locales = ctx.locales || Object.keys(LANGUAGES);
    locales.forEach((locale) => {
      newParams.push({
        params: { timestamp: String(firstUsed) },
        locale,
      });
    });
    return [...acc, ...newParams];
  }, [] as GetStaticPathsResult['paths']),
  fallback: false,
});
