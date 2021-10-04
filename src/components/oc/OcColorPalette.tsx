import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import copyToClipboard from 'copy-to-clipboard';
import styles from 'modules/ColorPalette.module.scss';
import { TFunction } from 'next-i18next';
import Link from 'next/link';
import { MouseEvent, useCallback, useEffect, useMemo, useState, VFC } from 'react';
import { CoolorsWidget, CoolorsWidgetProps } from 'react-coolors-widget';
import { ErrorBoundary } from 'react-error-boundary';
import { Button } from 'reactstrap';
import { PERSONAL_DETAILS } from 'src/config';
import { NSFW_PALETTE_KEYS, OC_PALETTES, OcSpecies } from 'src/types/oc';

const colorPaletteId = 'color-palette';

const ErrorHandler: VFC = () => null;

interface OcColorPaletteProps {
  t: TFunction;
  form: string;
  species: OcSpecies;
  isNsfw: boolean;
  className: string;
}

export const OcColorPalette: VFC<OcColorPaletteProps> = ({ t, form, species, className, isNsfw }) => {
  const [firstLoad, setFirstLoad] = useState(true);
  const palettes = useMemo<CoolorsWidgetProps[]>(() => {
    const palette = OC_PALETTES[species];
    if (!palette) return [];

    let paletteKeys = Object.keys(palette) as (keyof typeof palette)[];
    const nsfwKeys = !isNsfw ? NSFW_PALETTE_KEYS[species] : undefined;
    if (nsfwKeys) {
      const nsfwKeysSet = new Set(nsfwKeys);
      paletteKeys = paletteKeys.filter((key) => !nsfwKeysSet.has(key));
    }

    return paletteKeys.map((group) => {
      const normalizedColors = palette[group];
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      const groupName = [PERSONAL_DETAILS.OC_NAME, form, t(`oc:colorPalette.${group}`)].join(' • ');

      const componentProps: CoolorsWidgetProps = {
        colors: normalizedColors,
        paletteName: groupName,
        className: styles.coolorsPaletteWidget,
      };
      return componentProps;
    });
  }, [form, isNsfw, species, t]);

  const handleClick = useCallback((e: MouseEvent<HTMLButtonElement>, text) => {
    e.preventDefault();
    copyToClipboard(text);
  }, []);

  useEffect(() => {
    const scrollIntoView = firstLoad && window.location.hash === `#${colorPaletteId}` && palettes.length > 0;

    if (scrollIntoView) {
      const paletteHeading = document.getElementById(colorPaletteId);
      if (paletteHeading) paletteHeading.scrollIntoView();
    }
  }, [firstLoad, form, palettes, species, t]);

  useEffect(() => {
    setFirstLoad(false);
  }, []);

  const viewLink = t('oc:colorPalette.viewOnText');

  return (
    <section className={className}>
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
    </section>
  );
};
