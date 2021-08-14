import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import copyToClipboard from 'copy-to-clipboard';
import styles from 'modules/ColorPalette.module.scss';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { useCallback, useEffect, useState, VFC, MouseEvent } from 'react';
import { CoolorsWidget, CoolorsWidgetProps } from 'react-coolors-widget';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';
import { OC_PALETTES, OcSpecies } from 'src/types/oc';

const colorPaletteId = 'color-palette';

const ErrorHandler: VFC = () => null;

export const ColorPalette: VFC<{ t: TFunction; form: string; species: OcSpecies }> = ({ t, form, species }) => {
  const [firstLoad, setFirstLoad] = useState(false);
  const [palettes, setPalettes] = useState<CoolorsWidgetProps[]>(() => []);

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>, text) => {
    e.preventDefault();
    copyToClipboard(text);
  }, []);

  useEffect(() => {
    let scrollIntoView = firstLoad && window.location.hash === `#${colorPaletteId}`;

    const palette = OC_PALETTES[species];
    if (!palette) return;

    const paletteKeys = Object.keys(palette) as (keyof typeof palette)[];

    try {
      setPalettes(
        paletteKeys.map((group) => {
          const normalizedColors = palette[group];
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          const groupName = [PERSONAL_DETAILS.OC_NAME, form, t(`oc:colorPalette.${group}`)].join(' • ');

          const componentProps: CoolorsWidgetProps = {
            colors: normalizedColors,
            paletteName: groupName,
            className: styles.coolorsPaletteWidget,
          };
          return componentProps;
        }),
      );
    } catch (e) {
      console.error(e);
      scrollIntoView = false;
    }

    if (scrollIntoView) {
      const paletteHeading = document.getElementById(colorPaletteId);
      if (paletteHeading) paletteHeading.scrollIntoView();
    }
  }, [firstLoad, form, species, t]);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  const viewLink = t('oc:colorPalette.viewOnText');

  return (
    <>
      <h3 id={colorPaletteId}>
        <FontAwesomeIcon icon="palette" className="mr-2 mr-lg-3" />
        {t('oc:colorPalette.heading')}
        <Link href={`#${colorPaletteId}`} passHref>
          <Button tag="a" color="link" className="ml-2 mr-lg-3">
            <FontAwesomeIcon icon="link" />
          </Button>
        </Link>
      </h3>
      <p>
        {t('oc:colorPalette.intro')}
        <br />
        {t('oc:colorPalette.howToView', {
          viewLink,
          viewText: 'View',
        })}
      </p>
      <div className={styles.coolorsWrapper}>
        <ErrorBoundary FallbackComponent={ErrorHandler}>
          {palettes.map((props, i) => (
            <CoolorsWidget key={i} {...props} linkText={viewLink} onColorClick={handleClick} />
          ))}
        </ErrorBoundary>
      </div>
    </>
  );
};
