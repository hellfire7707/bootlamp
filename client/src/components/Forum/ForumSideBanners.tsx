import { useEffect, useState } from 'react';
import { RED_IMMINENT_BOOT_CAMPS, YELLOW_HOT_POSTS } from '../../assets/constant/COLOR';
import { readHotPosts, readImminentBootCamps } from '../../utils/api/forumAPI';
import * as S from './ForumSideBanners.style';

interface PropsType {
  forumType: string;
}

interface HotPost {
  id: string;
  title: string;
}


/**
 * 포럼 좌측 배너 콤포넌트
 * @param forumType 
 * @returns 
 */
const ForumSideBanners = function({ forumType }: PropsType) {
  return (
    <S.Aside>
      <HotPostsBanner forumType={forumType} />
      <ImminentBootCampsBanner />
      <TendencyTestBanner />
    </S.Aside>
  );
};

export default ForumSideBanners;


/**
 * 인기 게시글 배너 콤포넌트 
 * @param forumType [postscript|study|mentoring]
 * @returns 
 */
const HotPostsBanner = function({ forumType }: PropsType) {
  const [hotPosts, setHotPosts] = useState<HotPost[]>([]);

  useEffect(() => {
    readHotPosts(forumType, setHotPosts); //인기게시글 리스트조회 API 호출
  }, []);

  return (
    <S.DivContainer color={YELLOW_HOT_POSTS}>
      <S.H3>인기 게시글</S.H3>
      <ol>
        {hotPosts.map((post: HotPost) => (
          <S.Li key={post.id}>
            <S.A href={`/${forumType}/${post.id}`}>{post.title}</S.A>
          </S.Li>
        ))}
      </ol>
    </S.DivContainer>
  );
};

interface ImminentBootCamp {
  id: string;
  process: string;
  finalRegisterDate: string;
}

/**
 * 마감임박 배너 콤포넌트
 * @returns 
 */
const ImminentBootCampsBanner = () => {
  const [imminentBootCamps, setImminentBootCamps] = useState<ImminentBootCamp[]>([]);

  useEffect(() => {
    readImminentBootCamps(setImminentBootCamps);
  }, []);

  return (
    <S.DivContainer color={RED_IMMINENT_BOOT_CAMPS}>
      <S.H3>접수 마감 임박</S.H3>
      <ol>
        {imminentBootCamps.map((bootCamp) => (
          <S.Li key={bootCamp.id}>
            <S.A href={`/bootcamp/${bootCamp.id}`}>
              <div>{bootCamp.process}</div>
              <div>{bootCamp.finalRegisterDate} 마감</div>
            </S.A>
          </S.Li>
        ))}
      </ol>
    </S.DivContainer>
  );
};

/**
 * 내 개발성형 배너 콤포넌트 
 * @returns 
 */
const TendencyTestBanner = function() {
  return (
    <S.DivContainer>
      <S.H3>
        <S.StyledLink to="/test">
          내 개발 성향이
          <br />
          궁금하다면?
        </S.StyledLink>
      </S.H3>
    </S.DivContainer>
  );
};
