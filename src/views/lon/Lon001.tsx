import { Box, Typography } from "@mui/material";
import { Card01 } from "@src/components/Card";

/**
 * 대출 상품 데이터
 */

const loanProducts = [
  {
    title: "온라인햇살론",
    category: "정책자금대출",
    description: "저신용 저소득 서민에게 보증지원을 통해 생활의 안정을 돕고자 지원하는 보증부 대출상품입니다.",
    tags: ["저신용", "저소득", "보증부대출", "최대금리우대1.3%P"],
    maxAmount: "2000만원",
    interestRateMin: "8",
    interestRateMax: "10"
  },
  {
    title: "예스론",
    category: "신용대출",
    description: "비상금 신용대출 상품으로 간편하게 신청 가능",
    tags: ["비대면", "신용", "대출", "예스"],
    maxAmount: "300만원",
    interestRateMin: "8",
    interestRateMax: "10"
  }
];


const LON001 = () => {

  return (
    <Box sx={{ backgroundColor: "#F8F9FA", minHeight: "100vh", pb: 8 }}>
      
      {/* 대출 상품 리스트 */}
      <Box sx={{ mt: 3, mx: 2 }}>
        {loanProducts.map((product, index) => (
          <Card01 key={index}>
            <Box sx={{ p: 2 }}>


              {/* 대출 설명 */}
              <Typography variant="body2" color="textSecondary">
                {product.description}
              </Typography>

              {/* 카테고리 + 대출 상품명 */}
              <Box sx={{ display: "flex", alignItems: "center", gap: 1, mt: 1 }}>
                <Box
                  sx={{
                    backgroundColor: "transparent",
                    color: "Salmon",
                    border: `2px solid Salmon`,
                    fontSize: "12px",
                    fontWeight: "bold",
                    px: 1.0,
                    py: 0.3,
                    borderRadius: "20px",
                    display: "inline-block",
                  }}
                >
                  {product.category}
                </Box>

                <Typography variant="h6" sx={{ fontWeight: 700, mt: 1 }}>
                  {product.title}
                </Typography>
              </Box>

              {/* 태그 목록 */}
              <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                {product.tags.join(" | ")}
              </Typography>

              {/* 최대한도 */}
              <Typography variant="subtitle2" color="secondary" sx={{ fontWeight: 700, mt: 2 }}>
                <span>최대한도</span> {product.maxAmount}
              </Typography>

              {/* 금리 */}
              <Typography variant="h6" color="primary" sx={{ fontWeight: "bold" }}>
                연 {product.interestRateMin}%~{product.interestRateMax}%
              </Typography>
            </Box>
          </Card01>
        ))}
      </Box>
    </Box>
  );
};

export default LON001;
