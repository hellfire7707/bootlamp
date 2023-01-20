import icon from '../assets/image/icon.png';
import { useState } from 'react';
import MyPageSchedule from '../components/MyPageContent/MyPageSchedule';
import MyPageList from '../components/MyPageContent/MyPageList';
import * as S from './MyPage.style';
import UserProfile from '../components/MyPageContent/UserProfile';

/**
 * 마이페이지 콤포넌트
 * @returns 
 */
const MyPage = () => {
  //현재 설정된 탭 id
  const [currentTab, setCurrentTab] = useState<number>(0);

  const TabHandler = (id: number) => {
    setCurrentTab(id);
  };

  const TabMenu = [
    { id: 0, text: '찜한일정' },
    { id: 1, text: '나의 작성글' },
  ];
  return (
    <S.PageSize>
      <S.MyPageContent>
        {/* 탭 버튼 리스트 area */}
        <div className="tab-menu">
          <span className="page-name">My Page</span>

          <div className="tab-content">                              
            {TabMenu.map((el) => (
              <S.ButtonTab
                key={el.id}
                onClick={() => TabHandler(el.id)}
                className={currentTab === el.id ? 'tab-button' : 'tab-not-select'}
              >
                {el.text}
              </S.ButtonTab>
            ))}
          </div>
        </div>

        {/* 탭 바디 area */}
        <div className="tab-body">
          <div className="icon-wrapper">
            <img src={icon} alt="logo" />
          </div>
        </div>
        <div className="my-page-body">
          <UserProfile />
          <div>
            <div className="tab-content-mobile">
              {TabMenu.map((el) => (
                <S.ButtonTab
                  key={el.id}
                  onClick={() => TabHandler(el.id)}
                  className={currentTab === el.id ? 'tab-button' : 'tab-not-select'}
                >
                  {el.text}
                </S.ButtonTab>
              ))}
            </div>
            <div className="tab-mobile-bar"></div>
          </div>
          <div className="my-page-view">{currentTab === 1 ? <MyPageList /> : <MyPageSchedule />}</div>
        </div>
      </S.MyPageContent>
    </S.PageSize>
  );
};
export default MyPage;
