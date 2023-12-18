import { DefaultFooter } from '@ant-design/pro-components';
import { useIntl } from 'umi';

const Footer: React.FC = () => {
  const intl = useIntl();

  const currentYear = new Date().getFullYear();

  const produced = intl.formatMessage({
    id: 'app.copyright.produced',
    defaultMessage: 'Team Web Natura',
  });

  return <DefaultFooter copyright={`${currentYear} ${produced}`} />;
};

export default Footer;
