import * as S from './AnswerListView.style';
import { Icon } from '@iconify/react';
import { formatDistanceToNow } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useRecoilValue } from 'recoil';
import { logUser } from '../../atoms';

interface HandlerProps {
  patchHandler: (e: React.MouseEvent<HTMLElement>) => void;
  editHandler: () => void;
}

/**
 * 댓글작성 버튼 영역 컴포넌트
 * @param param0 
 * @returns 
 */
export const QuillContainer = function ({ patchHandler, editHandler }: HandlerProps){
  return (
    <S.ButtonArea>
      <S.OkButton onClick={patchHandler}>완료</S.OkButton>
      <S.OkButton color="red" onClick={editHandler}>
        취소
      </S.OkButton>
    </S.ButtonArea>
  );
};

interface AnswerViewProps {
  nickname: string;
  updatedAt: string;
  createdAt: string;
  editHandler: () => void;
  deleteHandler: (e: React.MouseEvent<HTMLElement>) => void;
}

/**
 * 댓글작성 영역 콤포넌트
 * @param param0 
 * @returns 
 */
export const AnswerViewContainer = function({nickname, updatedAt, createdAt, editHandler, deleteHandler, }: AnswerViewProps) {
  const createTime = formatDistanceToNow(new Date(createdAt), { addSuffix: true, locale: ko });
  const updateTime = formatDistanceToNow(new Date(updatedAt), { addSuffix: true, locale: ko });

  const logUserNickname = useRecoilValue(logUser).nickname;
  const logUserMemberRole = useRecoilValue(logUser).memberRole;

  return (
    <S.UserAnswerInfo>
      <S.TimeOrName>
        <S.NameZone>
          <Icon icon="carbon:user-avatar-filled-alt" width="20" height="15" />
          {nickname}
        </S.NameZone>
        <span>{createTime !== updateTime ? <span>{updateTime}</span> : createTime} </span>
      </S.TimeOrName>

      {nickname === logUserNickname || logUserMemberRole === 'admin' ? (
        <div>
          <S.AnswerButton onClick={editHandler}>수정</S.AnswerButton>
          <S.AnswerButton color="red" onClick={deleteHandler}>
            삭제
          </S.AnswerButton>
        </div>
      ) : null}
    </S.UserAnswerInfo>
  );
};
