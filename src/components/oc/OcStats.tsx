import { FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { CustomIcon } from 'components/common/CustomIcon';
import { StatSeparator } from 'components/oc/StatSeparator';
import { StatText } from 'components/oc/StatText';
import { StatTooltip } from 'components/oc/StatTooltip';
import styles from 'modules/OcFormPage.module.scss';
import { useTranslation } from 'next-i18next';
import { Fragment, useMemo, VFC } from 'react';
import { OcSpecies } from 'src/types/oc';

const bodyTypeTooltipId = 'body-type-tt';
const speciesTooltipId = 'species-tt';
const genderTooltipId = 'gender-tt';
const orientationTooltipId = 'orientation-tt';
const occupationTooltipId = 'occupation-tt';

interface OcStatsProps {
  species: OcSpecies;
  nsfwShown: boolean;
}

export const OcStats: VFC<OcStatsProps> = ({ species, nsfwShown }) => {
  const { t } = useTranslation();
  const formIcon = useMemo<FontAwesomeIconProps['icon']>(() => {
    switch (species) {
      case OcSpecies.FOX:
        return 'dog';
      case OcSpecies.PONY:
        return 'horse';
      case OcSpecies.REX:
        return 'person';
      default:
        throw new Error(`Could not get form icon for species ${species as string}`);
    }
  }, [species]);
  const speciesIcon: FontAwesomeIconProps['icon'] = species === OcSpecies.PONY ? 'horse-head' : 'paw';
  const occupationIcon: FontAwesomeIconProps['icon'] = useMemo(() => {
    switch (species) {
      case OcSpecies.PONY:
        return 'paint-brush';
      case OcSpecies.FOX:
        return 'leaf';
      case OcSpecies.REX:
        return 'pen-to-square';
      default:
        throw new Error(`Could not get occupation icon for species ${species as string}`);
    }
  }, [species]);
  const preferredGenitals = species === OcSpecies.FOX ? t('oc:detail.humanGenitals') : t('oc:detail.animalGenitals');

  /* eslint-disable react/jsx-key */
  const stats: JSX.Element[][] = [
    [
      <StatText tooltipId={bodyTypeTooltipId} icon={formIcon}>
        {species === OcSpecies.REX ? t('oc:detail.anthro') : t('oc:detail.feral')}
      </StatText>,
      <StatTooltip id={bodyTypeTooltipId}>{t('oc:detail.bodyType')}</StatTooltip>,
    ],
    [
      <StatText
        tooltipId={genderTooltipId}
        icon={species === OcSpecies.REX ? 'mars' : 'venus'}
        iconClassName={species === OcSpecies.REX ? 'gender-male' : 'gender-female'}
      >
        {species === OcSpecies.REX ? t('oc:detail.male') : t('oc:detail.female')}
      </StatText>,
      <StatTooltip id={genderTooltipId}>{t('oc:detail.gender')}</StatTooltip>,
    ],
    [
      <StatText tooltipId={speciesTooltipId} icon={speciesIcon} iconClassName={`species-${species}`}>
        {t(`oc:detail.${species}.species`)}
      </StatText>,
      <StatTooltip id={speciesTooltipId}>{t('oc:detail.species')}</StatTooltip>,
    ],
    [
      <StatText tooltipId={occupationTooltipId} icon={occupationIcon}>
        {t(`oc:detail.${species}.occupation`)}
      </StatText>,
      <StatTooltip id={occupationTooltipId}>{t('oc:detail.occupation')}</StatTooltip>,
    ],
  ];
  if (nsfwShown && species !== OcSpecies.REX) {
    const flagFileName = species === OcSpecies.FOX ? 'bisexual' : 'lesbian';
    const flagAlt = species === OcSpecies.FOX ? t('oc:detail.bisexualPrideFlag') : t('oc:detail.lesbianPrideFlag');
    const label = species === OcSpecies.FOX ? t('oc:detail.bisexual') : t('oc:detail.lesbian');
    stats.push([
      <StatText tooltipId={orientationTooltipId} className={styles.orientationFlag}>
        <CustomIcon src={`/flags/${flagFileName}.svg`} alt={flagAlt} className="mr-1" />
        {label}
      </StatText>,
      <StatTooltip id={orientationTooltipId}>{t('oc:detail.orientation')}</StatTooltip>,
    ]);
    stats.push([<StatText icon="star">{t('oc:detail.genitals', { type: preferredGenitals })}</StatText>]);
  }
  /* eslint-enable react/jsx-key */

  return (
    <small className="d-block mb-2 text-muted">
      {stats.map((el, i) => (
        <Fragment key={i}>
          {el[0]}
          {el[1]}
          {i + 1 !== stats.length && <StatSeparator />}
        </Fragment>
      ))}
    </small>
  );
};
