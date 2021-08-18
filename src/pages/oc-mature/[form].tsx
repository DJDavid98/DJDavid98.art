import { GetStaticPaths, NextPage } from 'next';
import { ImageResponse } from 'src/types/furbooru-api';
import { typedServerSideTranslations } from 'src/util/i18n-server';
import { getOtherSpecies, resolveFormParameter } from 'src/util/oc';
import { FurbooruFilterId, searchFurbooru } from 'src/util/search-furbooru';
import type { getStaticProps as gsProps } from '../oc/[form]';
import OcFormPage, { existingArtworkSearchOptions, getStaticPaths as gsPaths, OcFormPageProps } from '../oc/[form]';

const OcMatureFormPage: NextPage<OcFormPageProps> = (props) => <OcFormPage {...props} />;

export const getStaticProps: typeof gsProps = async ({ locale, params }) => {
  const species = resolveFormParameter(params);
  let existingArtwork: ImageResponse[] = [];

  try {
    existingArtwork = await searchFurbooru({
      ...existingArtworkSearchOptions,
      query: `${species},-${getOtherSpecies(species)},-watersports`,
      filterId: FurbooruFilterId.DEFAULT_18_PLUS,
    });
  } catch (e) {
    // Ignore
  }

  const props: OcFormPageProps = {
    existingArtwork,
    species,
    isNsfw: true,
  };

  return {
    props: {
      ...(await typedServerSideTranslations(locale, ['oc'])),
      ...props,
    },
  };
};

export const getStaticPaths: GetStaticPaths = gsPaths;

export default OcMatureFormPage;
