import axios from 'axios';
import DOMPurify from 'dompurify';
import 'react-quill/dist/quill.snow.css';
import ReactQuill from 'react-quill';
import { useState } from 'react';
import { useParams } from 'react-router';
import { getComment, deleteComment } from '../../utils/api/answerAPI';
import { useSetRecoilState } from 'recoil';
import { answerListData } from '../../atoms/index';
import * as S from './AnswerListView.style';
import { AnswerViewContainer, QuillContainer } from './AnswerContainer';

interface AnswerListProps {
  createdAt: string;
  postscriptCommentId: number;
  postscriptComment: string;
  updatedAt: string;
  nickname: string;
}

/** 
 * 댓글리스트 콤포넌트
 */
const AnswerListView = function({createdAt, postscriptCommentId, updatedAt, postscriptComment, nickname, }: AnswerListProps) {
  const [isPatch, setIsPatch] = useState<boolean>(false);
  const [commentValue, setCommentValue] = useState('');
  const setAnswerList = useSetRecoilState(answerListData);
  const access = localStorage.getItem('access');
  const { id } = useParams();

  /**
   * 댓글저장
   * @returns 
   */
  const patchComment = () => {
    return axios({
      method: 'patch',
      url: `/postscript/comment/${postscriptCommentId}`,
      data: { postscriptComment: commentValue },
      headers: {
        Authorization: access,
      },
    });
  };

  /**
   * 댓글 저장 작업 수행
   */
  const patchAsync = async () => {
    try {
      await patchComment();
      const getAwait = await getComment('postscript', `${id}`);

      setAnswerList(getAwait.data.data.postscriptComments);
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        console.log(error);
      }
    }
  };

  /**
   * 댓글 삭제 작업 수행
   */
  const deleteAsync = async () => {
    try {
      await deleteComment(`${postscriptCommentId}`, 'postscript');
      const getAwait = await getComment('postscript', `${id}`);

      setAnswerList(getAwait.data.data.postscriptComments);
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
  * 수정 핸들러
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
              __html: DOMPurify.sanitize(postscriptComment),
            }}
          />
        </div>
      }
    </S.AnswerTextContent>
  );
};

export default AnswerListView;
