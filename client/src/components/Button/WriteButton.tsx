import styled from 'styled-components';
import { InlineIcon } from '@iconify/react';
import { StyledBackgroundButton } from './BackgroundButton';
import { useNavigate } from 'react-router-dom';

const StyledButton = styled(StyledBackgroundButton)`
  width: 96px;
  height: 36px;
  border-radius: 9px;
  font-size: 16px;

  display: flex;
  justify-content: space-between;
  align-items: center;

  & > svg {
    width: 22px;
    height: 22px;
  }

  @media screen and (max-width: 414px) {
    width: 86px;
    height: 30px;
    border-radius: 8px;
    font-size: 14px;

    & > svg {
      width: 18px;
      height: 18px;
    }
  }
`;

interface PropsType {
  forumType: string;
}

/**
 * 글쓰기 버튼 콤포넌트
 * @param param0 
 * @returns 
 */
export const WriteButton = function({ forumType }: PropsType) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${forumType}/write`);
  };

  return (
    <StyledButton onClick={handleClick}>
      <InlineIcon icon="bi:pencil" />
      <span>작성하기</span>
    </StyledButton>
  );
};
