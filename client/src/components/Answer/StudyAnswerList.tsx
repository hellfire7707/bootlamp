import axios from 'axios';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getComment, deleteComment } from '../../utils/api/answerAPI';
import { useSetRecoilState } from 'recoil';
import { studyListData } from '../../atoms/index';
import * as S from './AnswerListView.style';
import { AnswerViewContainer, QuillContainer } from './AnswerContainer';

interface StudyAnswerListProps {
  createdAt: string;
  studyCommentId: number;
  studyComment: string;
  updatedAt: string;
  nickname: string;
}

/**
 * 스터디 댓글리스트 콤포넌트
 * @param param0 
 * @returns 
 */
const StudyAnswerList = function({ createdAt, studyCommentId, updatedAt, studyComment, nickname }: StudyAnswerListProps){
  const [isPatch, setIsPatch] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState('');
  const setAnswerList = useSetRecoilState(studyListData);
  const access = localStorage.getItem('access');
  const { id } = useParams();

  /**
   * 댓글 저장 API 호출
   */
  const patchComment = () => {
    return axios({
      method: 'patch',
      url: `/study/comment/${studyCommentId}`,
      data: { studyComment: commentValue },
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
      const getAwait = await getComment('study', `${id}`);

      setAnswerList(getAwait.data.data.studyComments);
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
      await deleteComment(`${studyCommentId}`, 'study');
      const getAwait = await getComment('study', `${id}`);

      setAnswerList(getAwait.data.data.studyComments);
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
  };

  /**
   * 댓글 삭제 핸들러
   * @param e 
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
              __html: DOMPurify.sanitize(studyComment),
            }}
          />
        </div>
      }
    </S.AnswerTextContent>
  );
};

export default StudyAnswerList;
