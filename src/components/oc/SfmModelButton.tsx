import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { CustomIcon } from 'components/common/CustomIcon';
import { ModelSize } from 'components/oc/ModelSize';
import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { VFC } from 'react';
import { DropdownItem, DropdownMenu, DropdownToggle, UncontrolledButtonDropdown, UncontrolledTooltip } from 'reactstrap';
import { getOcSfmModelPath } from 'src/util/oc';

interface PropTypes {
  nsfwEnabled: boolean;
  buttonId: string;
}

export const SfmModelButton: VFC<PropTypes> = ({ nsfwEnabled, buttonId }) => {
  const {
    t,
    i18n: { language },
  } = useTranslation();
  return (
    <>
      <UncontrolledButtonDropdown className="mb-2 mr-md-2">
        <DropdownToggle color="sfm" id={buttonId} caret>
          <CustomIcon src="/logos/sfm.svg" className="mr-2" />
          {t('oc:detail.sfmModel')}
        </DropdownToggle>
        <DropdownMenu>
          <Link href={getOcSfmModelPath(false)} passHref>
            <DropdownItem tag="a">
              <FontAwesomeIcon icon="shield-alt" fixedWidth className="text-sfm" />
              &nbsp;
              {nsfwEnabled ? t('oc:detail.sfmModelSfw') : t('oc:detail.sfmModelDownload')}
              <ModelSize lang={language} />
            </DropdownItem>
          </Link>
          {nsfwEnabled && (
            <Link href={getOcSfmModelPath(true)} passHref>
              <DropdownItem tag="a">
                <CustomIcon src="/logos/18.svg" />
                &nbsp;
                {t('oc:detail.sfmModelNsfw')}
                <ModelSize lang={language} nsfw />
              </DropdownItem>
            </Link>
          )}
        </DropdownMenu>
      </UncontrolledButtonDropdown>
      <UncontrolledTooltip target={buttonId} fade={false}>
        {t('oc:detail.sfmModelTooltip')}
      </UncontrolledTooltip>
    </>
  );
};
