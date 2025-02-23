import React, { useEffect, useState } from "react";

const CommonHeader = ({
  title = "저축은행",
  type = "default",
  prod = false,
  prodType = "",
  compare = false,
  backBtn = true,
}) => {
  const [likeCount, setLikeCount] = useState(0);
  const [compareCount, setCompareCount] = useState(0);

  useEffect(() => {
    if (prod) {
      // 관심상품 개수 조회 (더미 데이터 활용)
      const fetchLikeCount = () => {
        const likeList = []; // 실제 API 연동 필요
        setLikeCount(likeList.length);
      };

      // 비교상품 개수 조회 (더미 데이터 활용)
      const fetchCompareCount = () => {
        const compareList = []; // 실제 API 연동 필요
        setCompareCount(compareList.length);
      };

      fetchLikeCount();
      fetchCompareCount();
    }
  }, [prod]);

  const handleLikeClick = () => {
    if (likeCount === 0) {
      alert("등록된 관심 상품이 없어요");
      return;
    }

    console.log("관심 상품 목록 보기");
    // biz.prodLiked("관심 예적금상품", prodType);
  };

  const handleCompareClick = () => {
    if (compareCount === 0) {
      alert("비교할 상품이 없어요");
      return;
    }
    if (compareCount === 1) {
      alert("비교할 상품이 2개 이상이어야 해요");
      return;
    }

    console.log("상품 비교 실행");
    // biz.prodCompare(prodType);
  };

  return (
    <header className="headerWrap">
      <div className="headerLeft">
        {backBtn && (
          <button className="btn btnBack" onClick={() => window.history.back()}>
            <img src="/resources/images/header/btn_back.png" alt="이전페이지 이동하기" />
          </button>
        )}
      </div>

      <div className="headerCenter">
        <h2 onClick={() => navigator.clipboard.writeText(window.location.href)}>
          {title}
        </h2>
      </div>

      <div className="headerRight">
        {prod ? (
          compare ? (
            <>
              <div className="btn-scale-wrap">
                <button className="btn btn-interest" onClick={handleCompareClick}>
                  <img src="/resources/images/header/btn_interest.png" alt="관심상품" />
                  {compareCount > 0 && <em className="count-flag compCnt">{compareCount}</em>}
                </button>
              </div>
              <div className="btn-heart-wrap">
                <button className="btn btn-like" onClick={handleLikeClick}>
                  <img src="/resources/images/header/btn_like.png" alt="좋아요" />
                  {likeCount > 0 && <em className="count-flag likeCnt">{likeCount}</em>}
                </button>
              </div>
            </>
          ) : null
        ) : (
          <button className="btn btn-menu" onClick={() => console.log("메뉴 열기")}>
            <img src="/resources/images/header/btn_menu.png" alt="전체메뉴" />
          </button>
        )}
      </div>
    </header>
  );
};

export default CommonHeader;
