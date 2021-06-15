import React, { memo, useMemo, VFC } from 'react';
import { Badge } from 'reactstrap';

const SFW_SIZE_MB = 11.5;
const NSFW_SIZE_MB = 11.1;

const ModelSizeComponent: VFC<{ nsfw?: boolean; lang: string }> = ({ nsfw = false, lang }) => {
  const numberFormatter = useMemo(() => {
    if (lang === 'hu') return new Intl.NumberFormat('hu-HU');
    return new Intl.NumberFormat('en-US');
  }, [lang]);
  return (
    <Badge className="ml-2" color="dark">
      {numberFormatter.format(nsfw ? NSFW_SIZE_MB : SFW_SIZE_MB)} MB
    </Badge>
  );
};

export const ModelSize = memo(ModelSizeComponent);
