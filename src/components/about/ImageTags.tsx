import { useTranslation } from 'next-i18next';
import { useMemo, VFC } from 'react';
import { Badge } from 'reactstrap';

export const ImageTags: VFC<{ tags: string[] }> = ({ tags }) => {
  const { t } = useTranslation();
  const sortedTags = useMemo(() => tags.sort((a, b) => a.localeCompare(b)), [tags]);
  return (
    <>
      {t('about:artwork.tagged')}:{' '}
      {sortedTags.map((name) => (
        <Badge key={name} className="mr-2 bg-furbooru">
          {name}
        </Badge>
      ))}
    </>
  );
};
