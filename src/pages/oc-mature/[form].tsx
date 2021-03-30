import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import OcFormPage, { getStaticPaths as gsPaths, getStaticProps as gsProps, OcFormPageProps } from '../oc/[form]';

const OcMatureFormPage: NextPage<OcFormPageProps> = (props) => <OcFormPage {...props} />;

export const getStaticProps: GetStaticProps<OcFormPageProps> = async (ctx) => {
  const original = await gsProps(ctx);

  if ('props' in original) {
    const props: OcFormPageProps = {
      ...original.props,
      nsfwConfirmBypass: true,
    };
    return {
      ...original,
      props,
    };
  }

  return original;
};

export const getStaticPaths: GetStaticPaths = gsPaths;

export default OcMatureFormPage;
