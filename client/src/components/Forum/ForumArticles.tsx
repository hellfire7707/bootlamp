import ForumArticle from './ForumArticle';
import * as S from './ForumArticles.style';
import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import ForumContentHeader from './ForumContentHeader';
import PagePagination from '../Pagination/PagePagination';
import { readAllPosts } from '../../utils/api/forumAPI';

/**
 * 포럼내용모음 콤포넌트
 * @returns 
 */
const ForumArticles = () => {
  const [posts, setPosts] = useState<any>([]);
  const [postsPage, setPostsPage] = useState(0);
  const [page, setPage] = useState(1);
  const postPerPage = 10;
  const { pathname } = useLocation();
  const forumType = pathname.split('/')[1];

  const handlePagePost = (page: number) => {
    setPage(page);
  };

  useEffect(() => {
    const url = `/${forumType}?page=${page}&size=${postPerPage}&sort=${forumType}Id`;
    readAllPosts(url, setPosts, setPostsPage); //모든 작성글 불러오기
  }, [page, postPerPage]);

  return (
    <S.Container>
      <ForumContentHeader url={`/${forumType}?page=${page}&size=${postPerPage}`} setPosts={setPosts} />

      <main>
        {posts &&
          posts.map((post: any) => <ForumArticle key={post[`${forumType}Id`]} forumType={forumType} post={post} />)}
      </main>

      <PagePagination
        totalCount={postsPage}
        page={page}
        postPerPage={postPerPage}
        pageRangeDisplayed={5}
        handlePageChange={handlePagePost}
      />
    </S.Container>
  );
};

export default ForumArticles;
