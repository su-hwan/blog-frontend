import { memo } from 'react';
import { styled } from 'styled-components';

const ResponsiveBlock = styled.div`
  padding: 0, 1rem, 0, 1rem;
  width: 1024px;
  margin: 0 auto; /* 중앙 정렬 */

  /* webbrowser 크기에 따라 width 크기 변경 */
  @media (max-width: 1024px) {
    width: 768px;
  }
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Responsive = ({ children, ...rest }) => {
  return (
    //style, className, onClick, onMouseMove 등 props사용하기 위해
    //...rest를 사용하여 ResponsiveBlock에 전달
    <ResponsiveBlock {...rest}>{children}</ResponsiveBlock>
  );
};

export default memo(Responsive);
