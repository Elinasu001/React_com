import React, { useEffect, useState } from "react";

const CommonMenu = ({ isOpen, onClose }) => {
  const dummyMenuItems = [
    {
      CODE: "COM",
      NAME: "공통",
      URI: "/com",
      LINK_TARGET: "_self",
      SUB_MENUS: [
        { CODE: "MobileAuth", NAME: "휴대폰본인인증", URI: "/com/MobileAuth", LINK_TARGET: "_self" },
        { CODE: "TermsPage", NAME: "약관화면", URI: "/com/TermsPage", LINK_TARGET: "_self" },
        { CODE: "AcnoAuth",  NAME: "타행본인계좌인증", URI: "/com/AcnoAuth", LINK_TARGET: "_self" },
        { CODE: "FsbAcnoAuth", NAME: "타행본인계좌인증(중앙회)", URI: "/com/FsbAcnoAuth", LINK_TARGET: "_self" },
        { CODE: "AcnoList", NAME: "계좌리스트", URI: "/com/AcnoList", LINK_TARGET: "_self" },
        { CODE: "BankList", NAME: "은행리스트", URI: "/com/BankList", LINK_TARGET: "_self" },
        { CODE: "SecuCard", NAME: "보안카드", URI: "/com/SecuCard", LINK_TARGET: "_self" },
        { CODE: "OtpAuth", NAME: "otp인증", URI: "/com/OtpAuth", LINK_TARGET: "_self" },
      ],
    },
    {
      CODE: "INQ",
      NAME: "조회",
      URI: "/inq",
      LINK_TARGET: "_self",
      SUB_MENUS: [
        { CODE: "AccountInquiry", NAME: "전계좌조회", URI: "/inq/AccountInquiry", LINK_TARGET: "_self" },
        { CODE: "TransactionInquiry", NAME: "거래내역조회", URI: "/inq/AccountTransactionInquiry", LINK_TARGET: "_self" },
      ],
    },
    {
      CODE: "TRF",
      NAME: "이체",
      URI: "/trf",
      LINK_TARGET: "_self",
      SUB_MENUS: [
        {
          CODE: "transfer1",
          NAME: "이체",
          LINK_TARGET: "_self",
          SUB_MENUS: [
            { CODE: "transfer", NAME: "이체", URI: "/trf/transfer", LINK_TARGET: "_self" },
            { CODE: "TransferResultInquiry", NAME: "이체결과조회", URI: "/trf/TransferResultInquiry", LINK_TARGET: "_self" },
          ],
        },
        {
          CODE: "transfer2",
          NAME: "자동이체",
          LINK_TARGET: "_self",
          SUB_MENUS: [
            { CODE: "AutoTransfer", NAME: "자동이체", URI: "/trf/AutoTransfer", LINK_TARGET: "_self" },
            { CODE: "AutoTransfer", NAME: "자동이체관리", URI: "/trf/AutoTransferMng", LINK_TARGET: "_self" },
            { CODE: "AutoTransferResultInquiry", NAME: "자동이체결과조회", URI: "/trf/AutoTransferResultInquiry", LINK_TARGET: "_self" },
          ],
        },
      ],
    },
    {
      CODE: "DEP",
      NAME: "예적금",
      URI: "/dep",
      LINK_TARGET: "_self",
      SUB_MENUS: [
        { CODE: "DepInformationApplication", NAME: "상품안내/신청", URI: "/dep/DepInformationApplication", LINK_TARGET: "_self" },
        { CODE: "AccountApplication", NAME: "입출금계좌신청", URI: "/dep/AccountApplication", LINK_TARGET: "_self" },
        
        {
          CODE: "DepManagement",
          NAME: "예적금관리",
          LINK_TARGET: "_self",
          SUB_MENUS: [
            { CODE: "DepTermination", NAME: "예적금해지", URI: "/dep/DepTermination", LINK_TARGET: "_self" },
            { CODE: "DepCancelSrch", NAME: "예적금해지예상조회", URI: "/dep/DepCancelSrch", LINK_TARGET: "_self" },
            { CODE: "DepExpRenew", NAME: "만기자동재예치/만기해지송금", URI: "/dep/DepExpRenew", LINK_TARGET: "_self" },
            { CODE: "SavingDtChange", NAME: "적금납입일변경", URI: "/dep/SavingDtChange", LINK_TARGET: "_self" },
          ],
        },
      ],
    },
    {
      CODE: "LON",
      NAME: "대출",
      URI: "/lon",
      LINK_TARGET: "_self",
      SUB_MENUS: [
        { CODE: "LonInformationApplication", NAME: "상품안내/신청", URI: "/lon/LonInformationApplication", LINK_TARGET: "_self" },
        { CODE: "QuickLimitInquiry", NAME: "간편한도조회", URI: "/lon/QuickLimitInquiry", LINK_TARGET: "_self" },
        { CODE: "ElectronicAgreement", NAME: "전자약정", URI: "/lon/ElectronicAgreement", LINK_TARGET: "_self" },
        { CODE: "CreditInquiryConsent", NAME: "신용조회동의", URI: "/lon/CreditInquiryConsent", LINK_TARGET: "_self" },
        { CODE: "OnlineDocumentSubmission", NAME: "온라인서류제출", URI: "/lon/OnlineDocumentSubmission", LINK_TARGET: "_self" },
        { CODE: "LonRepaymentApplication", NAME: "대출상환신청", URI: "/lon/LonRepaymentApplication", LINK_TARGET: "_self" },
        { CODE: "LonExtensionApplication", NAME: "대출연장신청", URI: "/lon/LonExtensionApplication", LINK_TARGET: "_self" },
        { CODE: "LonWithdrawalRequest", NAME: "대출철회신청", URI: "/lon/LonWithdrawalRequest", LINK_TARGET: "_self" },
        { CODE: "LonStatusInquiry", NAME: "대출진행상태조회", URI: "/lon/LonStatusInquiry", LINK_TARGET: "_self" },
      ],
    },
    {
      CODE: "EFC",
      NAME: "전자금융관리",
      URI: "/efc",
      LINK_TARGET: "_self",
      SUB_MENUS: [
        { CODE: "UserInformationUpdate", NAME: "고객정보변경", URI: "/efc/UserInformationUpdate", LINK_TARGET: "_self" },
        { CODE: "AccountPasswordChange", NAME: "계좌비밀번호변경", URI: "/efc/AccountPasswordChange", LINK_TARGET: "_self" },
        { CODE: "AccountPasswordReset", NAME: "계좌비밀번호오류해제", URI: "/efc/AccountPasswordReset", LINK_TARGET: "_self" },
        { CODE: "FrequentAccountManagement", NAME: "자주쓰는계좌관리", URI: "/efc/FrequentAccountManagement", LINK_TARGET: "_self" },
        { CODE: "DelayedTransferManagement", NAME: "지연이체관리", URI: "/efc/DelayedTransferManagement", LINK_TARGET: "_self" },
        { CODE: "WithdrawalAccountManagement", NAME: "출금지정계좌관리", URI: "/efc/WithdrawalAccountManagement", LINK_TARGET: "_self" },
        { CODE: "DepositAccountManagement", NAME: "입금지정계좌관리", URI: "/efc/DepositAccountManagement", LINK_TARGET: "_self" },
        { CODE: "TransferLimitManagement", NAME: "이체한도관리", URI: "/efc/TransferLimitManagement", LINK_TARGET: "_self" },
        { CODE: "LimitRestrictionUnlock", NAME: "한도제한해제", URI: "/efc/LimitRestrictionUnlock", LINK_TARGET: "_self" },
        { CODE: "ClosedAccountInquiry", NAME: "해지계좌조회", URI: "/efc/ClosedAccountInquiry", LINK_TARGET: "_self" },
        { CODE: "SuspendedAccount", NAME: "거래중지좌", URI: "/efc/SuspendedAccount", LINK_TARGET: "_self" },
        { CODE: "TaxFreeSavingsLimit", NAME: "비과세종합저축한도", URI: "/efc/TaxFreeSavingsLimit", LINK_TARGET: "_self" },
        { CODE: "TaxFreeSavingsLimitCert", NAME: "비과세종합저축증빙자료제출", URI: "/efc/TaxFreeSavingsLimitCert", LINK_TARGET: "_self" },
        { CODE: "ElectronicFinancialTermination", NAME: "전자금융해지", URI: "/efc/ElectronicFinancialTermination", LINK_TARGET: "_self" },
        { CODE: "UsrIdReg", NAME: "전자금융가입", URI: "/efc/UsrIdReg", LINK_TARGET: "_self" },
      ],
    },
  ];

  const [menuItems] = useState(dummyMenuItems);
  const [openMenus, setOpenMenus] = useState({});
  const [openSubMenus, setOpenSubMenus] = useState({});

  useEffect(() => {
    // ✅ 2뎁스 메뉴는 기본적으로 펼쳐짐
    const defaultOpenMenus = {};
    menuItems.forEach((menu) => {
      if (menu.SUB_MENUS) {
        defaultOpenMenus[menu.CODE] = true;
      }
    });
    setOpenMenus(defaultOpenMenus);
    setOpenSubMenus({});
  }, [isOpen, menuItems]);

  // ✅ 3뎁스 메뉴 토글 함수
  const toggleSubSubMenu = (code) => {
    setOpenSubMenus((prev) => ({
      ...prev,
      [code]: !prev[code],
    }));
  };

  return (
    <>
      {/* ✅ 배경 클릭 시 닫기 */}
      {isOpen && (
        <div
          className="menu-backdrop"
          onClick={onClose}
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            zIndex: 999,
          }}
        ></div>
      )}

      <div
        id="menuWrap"
        className={`menu-container ${isOpen ? "open" : ""}`}
        style={{
          position: "fixed",
          top: 0,
          right: isOpen ? "0" : "-100%",
          width: "80%",
          height: "100%",
          backgroundColor: "#fff",
          transition: "right 0.3s ease-in-out",
          zIndex: 1000,
          boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)",
          overflowY: "auto",
        }}
      >
        {/* ✅ 닫기 버튼 */}
        <button
          className="btn-menu-close"
          onClick={onClose}
          style={{
            position: "absolute",
            right: 20,
            top: 20,
            zIndex: 1001,
            background: "none",
            border: "none",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          닫기
        </button>

        <h2 style={{ padding: "20px", fontSize: "20px" }}>전체메뉴</h2>

        {/* ✅ 메뉴 리스트 */}
        <ul className="menu-list" style={{ padding: "20px" }}>
          {menuItems.map((item) => (
            <li key={item.CODE} style={{ padding: "10px 0" }}>
              {/* ✅ 1뎁스 메뉴 */}
              <div style={{ fontSize: "16px", fontWeight: "bold" }}>{item.NAME}</div>

              {/* ✅ 2뎁스 메뉴 (기본적으로 펼쳐짐) */}
              {item.SUB_MENUS && (
                <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
                  {item.SUB_MENUS.map((subItem) => (
                    <li key={subItem.CODE} style={{ padding: "5px 0" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        {/* ✅ 2뎁스 메뉴 */}
                        <button
                          onClick={() =>
                            subItem.SUB_MENUS ? toggleSubSubMenu(subItem.CODE) : (window.location.href = subItem.URI)
                          }
                          style={{ fontSize: "14px", background: "none", border: "none", cursor: "pointer" }}
                        >
                          {subItem.NAME}
                        </button>

                        {/* ✅ 3뎁스 메뉴 화살표 표시 */}
                        {subItem.SUB_MENUS && (
                          <button
                            onClick={() => toggleSubSubMenu(subItem.CODE)}
                            style={{ background: "none", border: "none", cursor: "pointer", fontSize: "12px" }}
                          >
                            {openSubMenus[subItem.CODE] ? "▲" : "▼"}
                          </button>
                        )}
                      </div>

                      {/* ✅ 3뎁스 메뉴 (토글) */}
                      {subItem.SUB_MENUS && openSubMenus[subItem.CODE] && (
                        <ul style={{ paddingLeft: "20px", marginTop: "5px" }}>
                          {subItem.SUB_MENUS.map((subSubItem) => (
                            <li key={subSubItem.CODE} style={{ padding: "3px 0" }}>
                              <button
                                onClick={() => (window.location.href = subSubItem.URI)}
                                style={{ fontSize: "12px", background: "none", border: "none", cursor: "pointer" }}
                              >
                                {subSubItem.NAME}
                              </button>
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CommonMenu;
