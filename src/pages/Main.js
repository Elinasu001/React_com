import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import CommonLayout from "../layout/CommonLayout";
import { useApplicationCommon } from "../utils/ApplicationCommon";

const Main = () => {
  const { doAction } = useApplicationCommon();
  const [notices, setNotices] = useState([]);
  const [quickMenus, setQuickMenus] = useState([]);
  const [banners, setBanners] = useState([]);


  // 임시 통신 테스트
  const [testData, setTestData] = useState(null);
  const fetchTest = () => {
    const form = new FormData();
    form.append("txGbnCd", "TEST");

    doAction("INQ0000SC", form, (resDs) => {
      if (resDs.APP_HEADER.respCd === "N00000") {
        console.log("테스트 데이터:", resDs);
        setTestData(resDs);
      } else {
        alert("통신 실패");
      }
    });
  };


  /* ✅ 공지사항 데이터 가져오기 */
 /*  useEffect(() => {
    const fetchNotices = () => {
      const form = new FormData();
      form.append("txGbnCd", "NOTI");

      doAction("MAIN_SELECT", form, (resDs) => {
        if (resDs?.REC) {
          setNotices(resDs.REC);
        }
      });
    };

    const fetchQuickMenus = () => {
      const form = new FormData();
      form.append("txGbnCd", "QMNU");

      doAction("MAIN_SELECT", form, (resDs) => {
        if (resDs?.REC) {
          setQuickMenus(resDs.REC);
        }
      });
    };

    const fetchBanners = () => {
      const form = new FormData();
      form.append("txGbnCd", "BNN");

      doAction("MAIN_SELECT", form, (resDs) => {
        if (resDs?.REC) {
          setBanners(resDs.REC);
        }
      });
    };

    fetchNotices();
    fetchQuickMenus();
    fetchBanners();
  }, [doAction]); */

  return (
    <CommonLayout>
      <Helmet>
        <title>메인</title>
      </Helmet>

      <div className="wrap main">
        {/* ✅ 헤더 */}
        <header className="main-header headerWrap bg-color02">
          <div className="headerLeft">
            <a href="/" className="logoImg">
              <img
                src={process.env.PUBLIC_URL + "/asset/images/header/logo.png"}
                alt="저축은행 로고"
              />
            </a>
          </div>
          <div className="headerRight">
            <button className="btn btn-txt login" onClick={() => console.log("로그인 버튼 클릭")}>
              로그인
            </button>
            <button className="btn btn-search-menu" onClick={() => console.log("메뉴 검색 클릭")}>
              <img
                src={process.env.PUBLIC_URL + "/asset/images/header/btn_search_menu.png"}
                alt="메뉴 검색"
              />
            </button>
          </div>
        </header>

        {/* ✅ 공지사항 */}
        <div className="contentsWrap">
          <div className="contents">
          
            {/* ✅ 빠른서비스 */}
            <section className="quick-service-area">
              <div className="area-title-box">
                <h2 className="area-title">빠른 서비스</h2>
              </div>
              <ul className="quick-service-list">
                {quickMenus.map((menu) => (
                  <li key={menu.SEQ} className={menu.IMG}>
                    <a href="#" onClick={() => console.log(`${menu.NAME} 클릭됨`)}>
                      {menu.NAME}
                    </a>
                  </li>
                ))}
              </ul>
            </section>

            {/* ✅ 추천상품 */}
            <section className="product-area">
              <div className="area-title-box">
                <h2 className="area-title">추천상품</h2>
              </div>
              <div className="swiper-list">
                <div className="recom-slider-wrap swiper">
                  <ul className="swiper-wrapper product-list">
                    {banners.map((banner) => (
                      <li key={banner.SEQ} className="swiper-slide">
                        <a href="#" onClick={() => console.log(`${banner.NAME} 배너 클릭됨`)}>
                          <img src={banner.IMAGE_URL} alt={banner.NAME} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* ✅ SNS 소식 */}
            <section className="sns-news-area">
              <div>
                <a target="_blank" href="https://www.instagram.com/yegaramsb_official/">
                  <img
                    src={process.env.PUBLIC_URL + "/asset/images/main/sns_img.png"}
                    alt="SNS 소식"
                  />
                </a>
              </div>
            </section>

            <section className="notice-area">
              <div className="area-title-box">
                <h2 className="area-title">공지사항</h2>
              </div>
              <ul className="notice-list">
                {notices.length > 0 ? (
                  notices.map((notice) => (
                    <li key={notice.SEQ}>
                      <a href="#" onClick={() => console.log(`공지사항 ${notice.SEQ} 클릭됨`)}>
                        {notice.TITLE}
                      </a>
                    </li>
                  ))
                ) : (
                  <li>공지사항이 없습니다.</li>
                )}
              </ul>
            </section>

            {/* ✅ 하단 정보 */}
            <ul className="info-list">
              <li>
                  <a href="#" onClick={fetchTest}>
                    이용시간<br />안내
                  </a>
                  {testData && (
                    <div>
                      테스트데이터: {testData.OUT_REC[0].ACNO}
                    </div>
                  )}
              </li>
              <li>
                <a href="#" onClick={() => console.log("영업점 위치 안내 클릭")}>
                  영업점<br />위치 안내
                </a>
              </li>
              <li>
                <a href="tel:1877-7788">대표번호<br />1877-7788</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </CommonLayout>
  );
};

export default Main;
