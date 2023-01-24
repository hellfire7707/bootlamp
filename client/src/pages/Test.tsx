import * as S from './Test.style';
import StartForm from '../components/TestForm/StartForm';

/**
 * 적성검사 TEST 콤포넌트
 * @returns 
 */
const Test = () => {
  return (
    <>
      <S.TestContent>
        <S.FormContent>
          <S.StyleFormCode>
            <StartForm />
          </S.StyleFormCode>
        </S.FormContent>
      </S.TestContent>
    </>
  );
};
export default Test;
