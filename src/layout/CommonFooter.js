import React, { useState } from "react";
import CommonMenu from "./CommonMenu";

const CommonFooter = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <>
      <footer>
        <div className="bottom-menu-area">
          <ul className="bottom-menu-list">
            <li className="adbrix_home">
              <a onClick={() => console.log("홈으로 이동")}>홈</a>
            </li>
            <li className="adbrix_loan">
              <a onClick={() => console.log("대출 페이지 이동")}>대출</a>
            </li>
            <li className="adbrix_saving">
              <a onClick={() => console.log("예/적금 페이지 이동")}>예/적금</a>
            </li>
            <li className="adbrix_whole">
              <a onClick={() => {
                console.log("전체메뉴 열기");
                setIsMenuOpen(true);
              }}>
                전체메뉴
              </a>
            </li>
          </ul>
        </div>
      </footer>

      {/* ✅ 전체메뉴 모달 */}
      {isMenuOpen && (
        <CommonMenu isOpen={isMenuOpen} onClose={() => {
          console.log("전체메뉴 닫기 실행됨");
          setIsMenuOpen(false);
        }} />
      )}
    </>
  );
};

export default CommonFooter;
