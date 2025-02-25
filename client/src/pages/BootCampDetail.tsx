import axios from 'axios';
import * as S from './BootCampDetail.style';
import { useLocation } from 'react-router-dom';
import Banner from '../components/Banner';
import { DetailTable } from '../components/Table/DetailTable';
import { BootDetailButton } from '../components/Button';
import { GREEN_MAIN, RED_BOOT_DETAIL_HEART } from '../assets/constant/COLOR';
import { useState, useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { logUser } from '../atoms';

/**
 * 부트캠프/학원일정 상세 페이지
 * @returns 
 */
const BootCampDetail = function() {
  const [items, setItems] = useState({
    bootcampId: 1,
    title: '',
    beginRegisterDate: '',
    finalRegisterDate: '',
    duration: '',
    onOff: '',
    totalCost: '',
    superviser: '',
    satisfaction: '',
    trTime: '',
    site: '',
    weekendStatus: '',
    startDate: '',
    endDate: '',
    process: '',
    vote: 0,
  });
  const { isLog } = useRecoilValue(logUser);
  const [check, setCheck] = useState(false);
  const { pathname } = useLocation();
  const pathId: string = pathname.split('/')[2];
  const dataKeys: Array<string> = Object.keys(items);
  const halfIdx = Math.floor(dataKeys.length / 2);

  useEffect(() => {
    //상세정보 API호출
    axios({
      method: 'get',
      url: `/bootcamp/${pathId}`,
      headers: {
        Authorization: localStorage.getItem('access'), //TODO:auto가 뭔지 확인 
      },
    })
      .then((response) => {
        setItems(response.data.data);
      })
      .catch((err) => alert(err));
  }, [check]);

  /**
   * 찜 클릭 이벤트 핸들러
   * @returns
   */
  const onClick = () => {
    if (!isLog) return alert('로그인 후에 사용가능합니다.');
    else {
      const likeStatus = items.vote;
      let param = 0;
      likeStatus === 0 ? (param = 1) : (param = 0);
      axios({
        method: 'post',
        url: `/bootcamp/votes/${items.bootcampId}?vote=${param}`,
        headers: {
          Authorization: localStorage.getItem('access'),
        },
      })
        .then(() => {
          alert(param === 1 ? '찜 되었습니다.' : '찜 취소되었습니다.');
          setCheck(!check);
        })
        .catch((err) => alert(err));
    }
  };

  return (
    <>
      <Banner text={`${items.process}`} pageType="other" />
      <S.PageWrap>
        <S.MiddleSection>
          <a href={`${items.site}`} target="_blank" rel="noopener noreferrer">
            <BootDetailButton text="홈 페이지" icon="ant-design:home-outlined" iconColor={GREEN_MAIN} />
          </a>
          {items.vote === 0 ? (
            <BootDetailButton
              text="찜 "
              icon="mdi:cards-heart-outline"
              iconColor={RED_BOOT_DETAIL_HEART}
              onClick={onClick}
            />
          ) : (
            <BootDetailButton text="찜 " icon="mdi:cards-heart" iconColor={RED_BOOT_DETAIL_HEART} onClick={onClick} />
          )}
        </S.MiddleSection>
        <section>
          <DetailTable data={items} halfIdx={halfIdx} dataKeys={dataKeys} />
        </section>
      </S.PageWrap>
    </>
  );
};

export default BootCampDetail;
