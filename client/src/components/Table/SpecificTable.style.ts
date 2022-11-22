import styled from 'styled-components';
import theme from '../../styles/theme';

export const Detail = styled.div`
  width: 60vw;
  height: calc(100vh - 20vh);
  border: 3px solid var(--greenBootSpecificBorder);
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${theme.mobile} {
    flex-direction: column;
  }
  > div {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    :first-child {
      border-right: 2px solid var(--greenBootSpecificBorder);
      @media ${theme.mobile} {
        border: none;
      }
    }
    > div {
      display: flex;
      width: 100%;
      height: calc(100% / 3);
      justify-content: center;
      align-items: center;
      > div {
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        @media ${theme.mobile} {
          font-size: 4vw;
        }
        :first-child {
          margin-left: calc(100vh / 50);
        }
        :last-child {
          margin-right: calc(100vh / 60);
        }
      }
    }
  }
  @media ${theme.mobile} {
    width: 90vw;
  }
`;

export const RowHeader = styled.div`
  width: 65%;
  height: 20%;
  border: 1px solid var(--greenMain);
  font-size: 1.12vw;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${theme.mobile} {
    width: 85%;
    height: 40%;
    font-size: 4vw;
  }
`;
