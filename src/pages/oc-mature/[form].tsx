import { GetStaticPaths, NextPage } from 'next';
import { ImageResponse } from 'src/types/furbooru-api';
import { OcSpecies } from 'src/types/oc';
import { typedServerSideTranslations } from 'src/util/i18n-server';
import { getOtherSpecies, resolveFormParameter } from 'src/util/oc';
import { FurbooruFilterId, searchFurbooru } from 'src/util/search-furbooru';
import type { getStaticProps as gsProps } from '../oc/[form]';
import OcFormPage, { existingArtworkSearchOptions, getStaticPaths as gsPaths, OcFormPageProps, requestSafeArtwork } from '../oc/[form]';

const OcMatureFormPage: NextPage<OcFormPageProps> = (props) => <OcFormPage {...props} />;

const requestUnsafeArtwork = (species: OcSpecies) => {
  const refSheetUploadId = species === OcSpecies.PONY ? 70682 : 9322;
  const excludeOtherSpecies = species === OcSpecies.PONY ? `,-${getOtherSpecies(species)}` : '';
  return searchFurbooru({
    ...existingArtworkSearchOptions,
    query: `${species}${excludeOtherSpecies},-watersports,-safe,-id:${refSheetUploadId}`,
    filterId: FurbooruFilterId.DEFAULT_18_PLUS,
  });
};

export const getStaticProps: typeof gsProps = async ({ locale, params }) => {
  const species = resolveFormParameter(params);
  let existingArtwork: ImageResponse[] = [];

  try {
    existingArtwork = await requestUnsafeArtwork(species);
  } catch (e) {
    // Ignore
  }

  // If less pictures are available than expected, grab additional SFW artwork
  if (existingArtwork.length < existingArtworkSearchOptions.perPage) {
    const remainingSlots = existingArtworkSearchOptions.perPage - existingArtwork.length;
    let safeArtwork: ImageResponse[] = [];
    try {
      safeArtwork = await requestSafeArtwork(species, remainingSlots);
    } catch (e) {
      // Ignore
    }
    if (safeArtwork.length > 0) {
      existingArtwork = [...existingArtwork, ...safeArtwork].sort((a, b) =>
        // Thankfully ISO timestamps are lexically sortable without passing them through `Date` and parsing them
        b.created_at.localeCompare(a.created_at),
      );
    }
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
