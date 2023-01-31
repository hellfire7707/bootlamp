import axios from 'axios';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getComment, deleteComment } from '../../utils/api/answerAPI';
import { useSetRecoilState } from 'recoil';
import { mentoringListData } from '../../atoms/index';
import * as S from './AnswerListView.style';
import { AnswerViewContainer, QuillContainer } from './AnswerContainer';

interface MentoringAnswerListProps {
  createdAt: string;
  mentoringCommentId: number;
  mentoringComment: string;
  updatedAt: string;
  nickname: string;
}

/**
 * 멘토링 댓글 콤포넌트
 * @param param0 
 * @returns 
 */
const MentoringAnswerList = function({createdAt, mentoringCommentId, updatedAt, mentoringComment, nickname, }: MentoringAnswerListProps) {
  const [isPatch, setIsPatch] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState('');
  const setAnswerList = useSetRecoilState(mentoringListData);
  const access = localStorage.getItem('access');
  const { id } = useParams();

  /**
   * 댓글 저장
   * @returns 
   */
  const patchComment = () => {
    return axios({
      method: 'patch',
      url: `/mentoring/comment/${mentoringCommentId}`,
      data: { mentoringComment: commentValue },
      headers: {
        Authorization: access,
      },
    });
  };

  /**
   * 댓글 저장 작업
   */
  const patchAsync = async () => {
    try {
      await patchComment();
      const getAwait = await getComment('mentoring', `${id}`);

      setAnswerList(getAwait.data.data.mentoringComments);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.log(error);
      }
    }
  };

  /**
   * 댓글 삭제 작업
   */
  const deleteAsync = async () => {
    try {
      await deleteComment(`${mentoringCommentId}`, 'mentoring');
      const getAwait = await getComment('mentoring', `${id}`);

      setAnswerList(getAwait.data.data.mentoringComments);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.log(error);
      }
    }
  };

  /**
   * 댓글 저장 핸들러
   * @param e 
   */
  const patchHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    patchAsync();
    setIsPatch(!isPatch);
    setCommentValue('');
  };

  /** 
   * 댓글 삭제 핸들러
   */
  const deleteHandler = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    deleteAsync();
  };

  /** 
   * 댓글 수정 핸들러
   */
  const editHandler = () => {
    setIsPatch(!isPatch);
  };
  
  return (
    <S.AnswerTextContent>
      {isPatch ? /* 등록 전*/  
        <div>
          <ReactQuill theme="snow" value={commentValue} onChange={setCommentValue} />
          <QuillContainer patchHandler={patchHandler} editHandler={editHandler} />
        </div>
       : /* 등록 후*/  
        <div>
          <AnswerViewContainer
            nickname={nickname}
            updatedAt={updatedAt}
            createdAt={createdAt}
            editHandler={editHandler}
            deleteHandler={deleteHandler}
          />
          <S.TextArea
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(mentoringComment),
            }}
          />
        </div>
      }
    </S.AnswerTextContent>
  );
};

export default MentoringAnswerList;
