import axios from 'axios';
import { NavigateFunction } from 'react-router-dom';

export const readAllPosts = async (url: string, setPosts: React.Dispatch<any>, setPostsPage?: any) => {
  try {
    const res = await axios.get(url);

    if (res.status !== 200) {
      throw new Error(`${res.status}`);
    }

    setPosts(res.data.data);

    if (setPostsPage) {
      setPostsPage(res.data.pageInfo.totalElements);
    }
  } catch (err) {
    console.error(err);
  }
};

/**
 * 모든 게시글 불러오기
 * @param url 
 * @param setPosts 
 * @param setTotalPages 
 */
export const getAllPostsInfinite = async (
  url: string,
  setPosts: React.Dispatch<any>,
  setTotalPages: React.Dispatch<any>
) => {
  try {
    const res = await axios.get(url);

    if (res.status !== 200) {
      throw new Error(`${res.status}`);
    }
    setPosts((posts: any) => posts.concat(res.data.data));
    setTotalPages(res.data.pageInfo.totalPages);
  } catch (err) {
    console.error(err);
  }
};

export const readPost = async (url: string, setPost: React.Dispatch<any>) => {
  const access = localStorage.getItem('access');

  try {
    const res = await axios.get(url, {
      headers: {
        Authorization: access,
      },
    });

    if (res.status !== 200) {
      throw new Error(`${res.status}`);
    }

    setPost(res.data.data);

    return res.data.data;
  } catch (err) {
    console.error(err);
  }
};

interface HotPost {
  id: string;
  title: string;
}

/**
 * 인기게시글 리스트조회 API 호출
 * @param forumType 
 * @param setHotPosts 
 */
export const readHotPosts = async (forumType: string, setHotPosts: React.Dispatch<HotPost[]>) => {
  const url = `/${forumType}?page=1&size=5&sort=totalVotes`;

  try {
    const res = await axios.get(url);

    if (res.status !== 200) {
      throw new Error(`${res.status}`);
    }

    const posts = res.data.data.map((post: any) => {
      return {
        id: post[`${forumType}Id`],
        title: post[`${forumType}Title`],
      };
    });

    setHotPosts(posts);
  } catch (err) {
    console.error(err);
  }
};

interface ImminentBootCamp {
  id: string;
  process: string;
  finalRegisterDate: string;
}

/**
 * 접수 마감임박 부트캠프 리스트 조회
 * @param setImminentBootCamps
 */
export const readImminentBootCamps = async (setImminentBootCamps: React.Dispatch<ImminentBootCamp[]>) => {
  const url = `/bootcamp?page=1&size=3&sort=finalRegisterDate`;

  try {
    const res = await axios.get(url);

    if (res.status !== 200) {
      throw new Error(`${res.status}`);
    }

    const bootCamps = res.data.data.map((bootCamp: any) => {
      return {
        id: bootCamp.bootcampId,
        process: bootCamp.process,
        finalRegisterDate: bootCamp.finalRegisterDate,
      };
    });

    setImminentBootCamps(bootCamps);
  } catch (err) {
    console.error(err);
  }
};

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

/**
 * 글작성 API 호출
 * @param url 
 * @param navigate 
 * @param requestBody 
 */
export const createPost = async (url: string, navigate: NavigateFunction, requestBody: RequestBody) => {
  const access = localStorage.getItem('access');
  const forumType = url.split('/')[1];

  try {
    const res = await axios.post(url, requestBody, {
      headers: {
        Authorization: access,
      },
    });

    if (res.status !== 201) {
      throw new Error(`${res.status}`);
    }

    navigate(`/${forumType}/${res.data.data[`${forumType}Id`]}`);
  } catch (err) {
    console.error(err);
  }
};

/**
 * 글수정 API호출
 * @param url 
 * @param navigate 
 * @param requestBody 
 */
export const updatePost = async (url: string, navigate: NavigateFunction, requestBody: RequestBody) => {
  const access = localStorage.getItem('access');
  const forumType = url.split('/')[1];

  try {
    const res = await axios.patch(url, requestBody, {
      headers: {
        Authorization: access,
      },
    });

    if (res.status !== 200) {
      throw new Error(`${res.status}`);
    }

    navigate(`/${forumType}/${res.data.data[`${forumType}Id`]}`);
  } catch (err) {
    console.error(err);
  }
};

/**
 * 글삭제 API호출
 * @param url 
 * @param navigate 
 */

export const deletePost = async (url: string, navigate: NavigateFunction) => {
  const access = localStorage.getItem('access');
  const forumType = url.split('/')[1];

  try {
    const res = await axios.delete(url, {
      headers: {
        Authorization: access,
      },
    });

    if (res.status !== 204) {
      throw new Error(`${res.status}`);
    }

    navigate(`/${forumType}`);
  } catch (err) {
    console.error(err);
  }
};

export const votePost = async (url: string) => {
  const access = localStorage.getItem('access');

  try {
    const res = await axios.post(url, null, {
      headers: {
        Authorization: access,
      },
    });

    if (res.status !== 200) {
      throw new Error(`${res.status}`);
    }
  } catch (err) {
    console.error(err);
  }
};
