import axios from 'axios';
const access = localStorage.getItem('access');

/**
 * 댓글 불러오기
 * @param url 
 * @param id 
 * @returns 
 */
export const getComment = (url: string, id: string) => {
  return axios({
    method: 'get',
    url: `/${url}/${id}`,
  });
};

/**
 * 댓글 삭제
 * @param id 
 * @param url 
 * @returns 
 */
export const deleteComment = (id: string, url: string) => {
  return axios({
    method: 'delete',
    url: `/${url}/comment/${id}`,
    headers: {
      Authorization: access,
    },
  })
    .then(() => {
      alert('삭제하시겠습니까?');
    })
    .catch((err) => console.log(err));
};
