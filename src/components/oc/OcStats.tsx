import { FontAwesomeIcon, FontAwesomeIconProps } from '@fortawesome/react-fontawesome';
import { CustomIcon } from 'components/common/CustomIcon';
import { useTranslation } from 'next-i18next';
import React, { VFC } from 'react';
import { UncontrolledTooltip } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';
import { OcSpecies } from 'src/types/oc';
import styles from 'modules/OcFormPage.module.scss';

const speciesTooltipId = 'species-tt';
const genderTooltipId = 'gender-tt';
const orientationTooltipId = 'orientation-tt';
const occupationTooltipId = 'occupation-tt';

interface OcStatsProps {
  species: OcSpecies | null;
  nsfwShown: boolean;
}

const OcStatsComponent: VFC<OcStatsProps> = ({ species, nsfwShown }) => {
  const { t } = useTranslation();
  const speciesIcon: FontAwesomeIconProps['icon'] = species === OcSpecies.PONY ? 'horse-head' : 'paw';
  return (
    <small className="d-block mb-2 text-muted">
      <span>{t('oc:detail.nickname', { nick: PERSONAL_DETAILS.OC_NICKNAME })}</span>
      <span className="mx-1">&bull;</span>
      {species && (
        <>
          <span id={speciesTooltipId} className="cursor-help">
            <FontAwesomeIcon icon={speciesIcon} className={`mr-1 species-${species}`} />
            {t(`oc:detail.${species}.species`)}
          </span>
          <UncontrolledTooltip target={speciesTooltipId} placement="bottom">
            {t('oc:detail.species')}
          </UncontrolledTooltip>
          <span className="mx-1">&bull;</span>
        </>
      )}
      <span id={genderTooltipId} className="cursor-help">
        <FontAwesomeIcon icon="venus" className="mx-1 gender-female" />
        {t('oc:detail.female')}
      </span>
      <UncontrolledTooltip target={genderTooltipId} placement="bottom">
        {t('oc:detail.gender')}
      </UncontrolledTooltip>
      {nsfwShown && (
        <>
          <span className="mx-1">&bull;</span>
          <span id={orientationTooltipId} className={`${styles.lesbianFlag} cursor-help`}>
            <CustomIcon src="/flags/lesbian.svg" alt={t('oc:detail.lesbianPrideFlag')} />
            {t('oc:detail.lesbian')}
          </span>
          <UncontrolledTooltip target={orientationTooltipId} placement="bottom">
            {t('oc:detail.orientation')}
          </UncontrolledTooltip>
        </>
      )}
      {species && (
        <>
          <span className="mx-1">&bull;</span>
          <span id={occupationTooltipId} className="cursor-help">
            <FontAwesomeIcon icon={species === OcSpecies.PONY ? 'paint-brush' : 'leaf'} className="mx-1" />
            {t(`oc:detail.${species}.occupation`)}
          </span>
          <UncontrolledTooltip target={occupationTooltipId} placement="bottom">
            {t('oc:detail.occupation')}
          </UncontrolledTooltip>
        </>
      )}
    </small>
  );
};

export const OcStats = OcStatsComponent;
