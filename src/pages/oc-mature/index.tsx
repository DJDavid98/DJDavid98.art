import { GetStaticProps } from 'next';
import OcIndexPage, { getStaticProps as gsProps } from '../oc/index';

export const getStaticProps: GetStaticProps = gsProps;

const OcMatureIndexPage = () => <OcIndexPage nsfwEnabled />;

export default OcMatureIndexPage;
