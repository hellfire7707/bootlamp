import { useState, useEffect } from 'react';
import axios from 'axios';
import AnswerListView from './AnswerListView';
import { useParams } from 'react-router';
import 'react-quill/dist/quill.snow.css';
import { getComment } from '../../utils/api/answerAPI';
import { useRecoilState } from 'recoil';
import { answerListData } from '../../atoms/index';
import * as S from './ForumAnswer.style';

interface AnswerListProps {
  createdAt: string;
  postscriptCommentId: number;
  postscriptComment: string;
  updatedAt: string;
  nickname: string;
}

export interface IAnswerList extends Array<AnswerListProps> {}

/**
 * 포럼 글 댓글 콤포넌트
 * @returns 
 */
const ForumArticlesAnswer = function() {
  const { id } = useParams();
  const [answerContents, setAnswerContents] = useState('');
  const [answerList, setAnswerList] = useRecoilState(answerListData);
  const access = localStorage.getItem('access');

  /** 
   * 글 작성 API호출
   */
  const postComment = () => {
    return axios({
      method: 'post',
      url: `/postscript/${id}/comment`,
      data: { postscriptComment: answerContents },
      headers: {
        Authorization: access,
      },
    });
  };

  const asyncFunction = async () => {
    try {
      await postComment(); //댓글작성
      const getAwait = await getComment('postscript', `${id}`); //댓글 불러오기 API호출
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
   * 등록버튼 클릭 이벤트
   */
  const SummitAnswerBtn = () => {
    asyncFunction();
    setAnswerContents('');
  };

  /**
   * 화면 초기화시 댓글 불러오기
   */
  useEffect(() => {
    axios({
      method: 'get',
      url: `/postscript/${id}`,
    }).then((res) => {
      const { data } = res;
      setAnswerList(data.data.postscriptComments);
    });
  }, []);

  return (
    <S.ContainerViewAnswer>
      <S.ViewAnswer>
        {/* 이전 댓글리스트 */}
        {answerList?.map((list) => (
          <AnswerListView
            key={list.postscriptCommentId}
            createdAt={list.createdAt}
            postscriptCommentId={list.postscriptCommentId}
            postscriptComment={list.postscriptComment}
            updatedAt={list.updatedAt}
            nickname={list.nickname}
          ></AnswerListView>
        ))}
      </S.ViewAnswer>
      <S.QuillContent>
        <S.QuillArea theme="snow" value={answerContents} onChange={setAnswerContents} />
        <div className="btn-area">
          <S.SubmitButton onClick={SummitAnswerBtn}>등록</S.SubmitButton>
        </div>
      </S.QuillContent>
    </S.ContainerViewAnswer>
  );
};

export default ForumArticlesAnswer;
