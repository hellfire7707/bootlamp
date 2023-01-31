import * as S from './ForumCards.style';
import { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import { useInView } from 'react-intersection-observer';
import ForumCard from './ForumCard';
import ForumContentHeader from './ForumContentHeader';
import { getAllPostsInfinite } from '../../utils/api/forumAPI';
import Loading from '../Loading/Loading';

/**
 * 카드형 게시판 콤포넌트
 * @returns 
 */
const ForumCards = function() {
  const [posts, setPosts] = useState<any>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState<number>();
  const [loading, setLoading] = useState(false);
  const [ref, inView] = useInView({ //TODO:이게 뭘까
    threshold: 1,
  });
  const { pathname } = useLocation();
  const forumType = pathname.split('/')[1];

  /**
   * 모든 게시글 불러오기
   */
  const getPosts = useCallback(async (page: number) => {
    setLoading(true);
    //모든 게시글 불러오기 API호출
    const url = `/${forumType}?page=${page}&size=9&sort=${forumType}Id`;
    getAllPostsInfinite(url, setPosts, setTotalPages);
    setLoading(false);
  }, []);

  useEffect(() => {
    getPosts(page);
  }, [page]);

  useEffect(() => {
    if (inView && !loading) {
      if (page < totalPages!) {
        setPage(page + 1);
      } else if (page === totalPages) {
        setLoading(false);
      }
    }
  }, [inView, loading]);

  return (
    <S.Container>
      <ForumContentHeader url={`/${forumType}?page=${page}&size=9`} setPosts={setPosts} />

      <S.MainContainer>
        {posts.map((post: any) => (
          <ForumCard key={post[`${forumType}Id`]} forumType={forumType} post={post} />
        ))}
      </S.MainContainer>
      <S.RefDiv ref={ref}>{inView && loading ? <Loading /> : null}</S.RefDiv>
    </S.Container>
  );
};

export default ForumCards;
