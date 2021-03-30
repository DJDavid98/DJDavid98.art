import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomIcon } from 'components/common/CustomIcon';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { memo, useMemo, VFC } from 'react';
import { Badge, Button, DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, UncontrolledTooltip } from 'reactstrap';
import { getOcSfmModelPath } from 'src/util/oc';

interface PropTypes {
  nsfwEnabled: boolean;
  buttonId: string;
}

const SFW_SIZE_MB = 11.5;
const NSFW_SIZE_MB = 11.1;

const ModelSize: VFC<{ nsfw?: boolean; lang: string }> = memo(({ nsfw = false, lang }) => {
  const numberFormatter = useMemo(() => {
    if (lang === 'hu') return new Intl.NumberFormat('hu-HU');
    return new Intl.NumberFormat('en-US');
  }, [lang]);
  return (
    <Badge className="ml-2" color="dark">
      {numberFormatter.format(nsfw ? NSFW_SIZE_MB : SFW_SIZE_MB)} MB
    </Badge>
  );
});

export const SfmModelButton: VFC<PropTypes> = ({ nsfwEnabled, buttonId }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <>
      {nsfwEnabled ? (
        <UncontrolledButtonDropdown>
          <DropdownToggle color="sfm" id={buttonId} className="d-block d-md-inline-block mb-2 mr-md-2" caret>
            <CustomIcon src="/logos/sfm.svg" className="mr-2" />
            {t('oc:detail.sfmModel')}
          </DropdownToggle>
          <DropdownMenu>
            <Link href={getOcSfmModelPath(false)} passHref>
              <DropdownItem tag="a">
                <FontAwesomeIcon icon="shield-alt" fixedWidth className="text-sfm" />
                &nbsp;
                {t('oc:detail.sfmModelSfw')}
                <ModelSize lang={language} />
              </DropdownItem>
            </Link>
            <Link href={getOcSfmModelPath(true)} passHref>
              <DropdownItem tag="a">
                <CustomIcon src="/logos/18.svg" />
                &nbsp;
                {t('oc:detail.sfmModelNsfw')}
                <ModelSize lang={language} nsfw />
              </DropdownItem>
            </Link>
          </DropdownMenu>
        </UncontrolledButtonDropdown>
      ) : (
        <Button color="sfm" tag="a" href={getOcSfmModelPath(false)} className="d-block d-md-inline-block mb-2 mr-md-2" id={buttonId}>
          <CustomIcon src="/logos/sfm.svg" className="mr-2" />
          {t('oc:detail.sfmModel')}
          <ModelSize lang={language} nsfw />
        </Button>
      )}
      <UncontrolledTooltip target={buttonId} fade={false}>
        {t('oc:detail.sfmModelTooltip')}
      </UncontrolledTooltip>
    </>
  );
};
