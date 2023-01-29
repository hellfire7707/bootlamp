import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useEffect, useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { useLocation, useNavigate } from 'react-router-dom';
import { GRAY_CONTENTS_BORDER, GREEN_MAIN, RED_BUTTON_DELETE } from '../../assets/constant/COLOR';
import { MENTORING_TAGS, POSTSCRIPT_TAGS, STUDY_TAGS } from '../../assets/constant/TAG';
import { BackgroundOtherButton, BorderOtherButton, SmallBackgroundTagButton, SmallBorderTagButton } from '../Button';
import * as S from './ForumWrite.style';
import { useRecoilValue } from 'recoil';
import { logUser } from '../../atoms';
import { createPost, updatePost } from '../../utils/api/forumAPI';

interface FormValues {
  title: string;
  content: string;
  tagName: string;
}
interface RequestBody {
  title?: string;
  content?: string;
  tagName: string;
  postscriptTitle?: string;
  postscriptContent?: string;
  studyTitle?: string;
  studyContent?: string;
  mentoringTitle?: string;
  mentoringContent?: string;
}
interface Tag {
  id: number;
  tagName: string;
}

/**
 * 포럼 글작성 콤포넌트
 * @returns 
 */
const ForumWrite = () => {
  const [tagName, setTagName] = useState('');
  const [content, setContent] = useState('');
  const { pathname, state } = useLocation();
  const [, forumType, action] = pathname.split('/');
  const navigate = useNavigate();
  const { register, handleSubmit, setValue } = useForm<FormValues>();
  const { isLog } = useRecoilValue(logUser);

  const initializeTag = (tags: Tag[]) => {
    return { id: tags[0].id, tagName: tags[0].tagName };
  };

  useEffect(() => {
    if (action === 'write') {
      switch (forumType) {
        case 'postscript': //후기
          setTagName(initializeTag(POSTSCRIPT_TAGS).tagName);
          break;
        case 'study': //스터디모집
          setTagName(initializeTag(STUDY_TAGS).tagName);
          break;
        case 'mentoring': //멘토링
          setTagName(initializeTag(MENTORING_TAGS).tagName);
          break;
        default:
          break;
      }
    }
    else if (action === 'update') {
      setTagName(state.tagName);
      setContent(state.content);
      setValue('title', state.title);
    }
  }, []);

  /**
   * 작성취소버튼 클릭이벤트 핸들러
   */
  const handleDelete = () => {
    if (window.confirm('작성을 취소하시겠습니까?')) {
      if (action === 'write') {
        navigate(`/${forumType}?page=1`); //게시글 리스트로 이동
      }
      if (action === 'update') {
        navigate(`/${forumType}/${state.id}`); //상세보기로 이동
      }
    }
  };

  /**
   * 태그버튼클릭 이벤트
   * @param e 
   */
  const handleTags = (e: React.MouseEvent<HTMLButtonElement>) => {
    const text = (e.target as HTMLButtonElement).textContent;

    if (text !== tagName && typeof text === 'string') {
      setTagName(text);
    }
  };

  /**
   * 태그버튼 리스트 출력
   * @param tag 
   * @returns 
   */
  const handleTagStyle = (tag: Tag) => {
    if (tag.tagName === tagName) {
      return <SmallBackgroundTagButton key={tag.id} text={tag.tagName} color={GREEN_MAIN} onClick={handleTags} />;
    }
    return <SmallBorderTagButton key={tag.id} text={tag.tagName} color={GRAY_CONTENTS_BORDER} onClick={handleTags} />;
  };

  /**
   * 폼 서브밋 핸들러
   */
  const onSubmit: SubmitHandler<FormValues> = (data) => {
    if (isLog) {
      let requestBody: RequestBody;

      switch (forumType) {
        case 'postscript':
          requestBody = {
            postscriptTitle: data.title,
            postscriptContent: content,
            tagName,
          };
          break;
        case 'study':
          requestBody = {
            studyTitle: data.title,
            studyContent: content,
            tagName,
          };
          break;
        case 'mentoring':
          requestBody = {
            mentoringTitle: data.title,
            mentoringContent: content,
            tagName,
          };
          break;
        default:
          requestBody = {
            title: data.title,
            content,
            tagName,
          };
          break;
      }

      if (action === 'write') { //글 작성
        const url = `/${forumType}`;
        createPost(url, navigate, requestBody);
      }
      else if (action === 'update') { //글 수정
        const url = `/${forumType}/${state.id}`;
        updatePost(url, navigate, requestBody);
      }
    }
  };

  return (
    <S.Container>
      <S.ContentHeader>
        <BorderOtherButton text="취소" color={RED_BUTTON_DELETE} onClick={handleDelete} />
        <BackgroundOtherButton
          type="submit"
          form="writeForm"
          text="등록"
          color={GREEN_MAIN}
          onSubmit={handleSubmit(onSubmit)}
        />
      </S.ContentHeader>

      <S.InfoContainer>
        <S.TagsContainer>
          태그:{'  '}
          {forumType === 'postscript' ? POSTSCRIPT_TAGS.map(handleTagStyle) : null}
          {forumType === 'study' ? STUDY_TAGS.map(handleTagStyle) : null}
          {forumType === 'mentoring' ? MENTORING_TAGS.map(handleTagStyle) : null}
        </S.TagsContainer>
      </S.InfoContainer>

      <S.Form id="writeForm" onSubmit={handleSubmit(onSubmit)}>
        <S.TitleInput {...register('title', { required: true })} placeholder="제목을 작성해 주세요" />
        <ReactQuill theme="snow" value={content} onChange={setContent} />
      </S.Form>

      <S.ContentFooter>
        <BorderOtherButton text="삭제" color={RED_BUTTON_DELETE} onClick={handleDelete} />
        <BackgroundOtherButton
          type="submit"
          form="writeForm"
          text="등록"
          color={GREEN_MAIN}
          onSubmit={handleSubmit(onSubmit)}
        />
      </S.ContentFooter>
    </S.Container>
  );
};

export default ForumWrite;
