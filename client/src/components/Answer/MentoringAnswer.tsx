import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import 'react-quill/dist/quill.snow.css';
import { getComment } from '../../utils/api/answerAPI';
import { useRecoilState } from 'recoil';
import { mentoringListData } from '../../atoms/index';
import MentoringAnswerList from './MentoringAnswerList';
import * as S from './ForumAnswer.style';

interface MentoringAnswerListProps {
  createdAt: string;
  mentoringCommentId: number;
  mentoringComment: string;
  updatedAt: string;
  nickname: string;
}

export interface MentoringAnswerList extends Array<MentoringAnswerListProps> {}

/**
 * 멘토링댓글 콤포넌트
 * @returns 
 */
const MentoringAnswer = function() {
  const { id } = useParams();
  const [mentoringAnswerContents, setMentoringAnswerContents] = useState('');
  const [mentoringAnswerList, setMentoringAnswerList] = useRecoilState(mentoringListData);
  const access = localStorage.getItem('access');

  /** 
   * 글 작성 API호출
   */
  const postComment = () => {
    return axios({
      method: 'post',
      url: `/mentoring/${id}/comment`,
      data: { mentoringComment: mentoringAnswerContents },
      headers: {
        Authorization: access,
      },
    });
  };

  const asyncFunction = async () => {
    try {
      await postComment(); //댓글 등록
      const getAwait = await getComment('mentoring', `${id}`); //댓글 불러오기
      setMentoringAnswerList(getAwait.data.data.mentoringComments);
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
    setMentoringAnswerContents('');
  };

  useEffect(() => {
    axios({
      method: 'get',
      url: `/mentoring/${id}`,
    }).then((res) => {
      const { data } = res;
      setMentoringAnswerList(data.data.mentoringComments);
    });
  }, []);

  return (
    <S.ContainerViewAnswer>
      <S.ViewAnswer>
        {/* 이전 댓글리스트 */}
        {mentoringAnswerList?.map((list) => (
          <MentoringAnswerList
            key={list.mentoringCommentId}
            createdAt={list.createdAt}
            mentoringCommentId={list.mentoringCommentId}
            mentoringComment={list.mentoringComment}
            updatedAt={list.updatedAt}
            nickname={list.nickname}
          ></MentoringAnswerList>
        ))}
      </S.ViewAnswer>
      <S.QuillContent>
        <S.QuillArea theme="snow" value={mentoringAnswerContents} onChange={setMentoringAnswerContents} />
        <div className="btn-area">
          <S.SubmitButton onClick={SummitAnswerBtn}>등록</S.SubmitButton>
        </div>
      </S.QuillContent>
    </S.ContainerViewAnswer>
  );
};

export default MentoringAnswer;
