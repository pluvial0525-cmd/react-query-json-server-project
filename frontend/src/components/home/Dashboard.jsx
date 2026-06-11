import React from 'react'
import styled from 'styled-components'
import { useDashboard } from '../../store/hooks/useDashboard';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend
} from "chart.js";
import { Bar } from 'react-chartjs-2';

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const Dashboard = () => {
    // 💡 비동기 데이터 처리를 위한 로딩 및 에러 상태 추가
    const { kpi, userRanking, productRanking, isLoading, error } = useDashboard();

    // 🚨 데이터가 아예 없을 때(로딩 전 등) 터지지 않도록 완벽하게 초기값 기본 방어막 세팅
    const safeKpi = kpi || { totalSalesAmount: 0, totalQuantity: 0, totalOrderCount: 0, customerCount: 0, productCount: 0 };
    const safeUserRanking = Array.isArray(userRanking) ? userRanking : [];
    const safeProductRanking = Array.isArray(productRanking) ? productRanking : [];

    if (isLoading) return <LoadingMessage>대시보드 데이터를 집계하는 중입니다...</LoadingMessage>;
    if (error) return <ErrorMessage>데이터 분석 실패: {error.message}</ErrorMessage>;

    const userChartData = {
        labels: safeUserRanking.map(item => item.name),
        datasets: [
            {
                label: "구매 건수",
                data: safeUserRanking.map(item => item.count),
                backgroundColor: '#3b82f6', // 트렌디한 블루 컬러 적용
                borderRadius: 6,
            }
        ]
    }

    const productChartData = {
        labels: safeProductRanking.map(item => item.name),
        datasets: [
            {
                label: "판매 수량",
                data: safeProductRanking.map(item => item.quantity),
                backgroundColor: '#10b981', // 상큼한 에메랄드 그린 컬러 적용
                borderRadius: 6,
            }
        ]
    }

    const chartOptions = {
        responsive: true, // 🚨 [오타 수정] responsiv -> responsive
        maintainAspectRatio: false,
        indexAxis: "y",
        plugins: { // 🚨 [오타 수정] plugin -> plugins (차트 js 버그 방지)
            legend: {
                position: "top"
            }
        }
    }

    return (
        <DashboardContainer>
            {/* 📊 상단 KPI 요약 카드 섹션 */}
            <KpiGrid>
                <KpiCard>
                    <KpiTitle>총 매출액</KpiTitle>
                    <KpiValue $color="#3b82f6">{safeKpi.totalSalesAmount.toLocaleString()}원</KpiValue>
                </KpiCard>
                <KpiCard>
                    <KpiTitle>총 판매수량</KpiTitle>
                    <KpiValue>{safeKpi.totalQuantity.toLocaleString()}개</KpiValue>
                </KpiCard>
                <KpiCard>
                    <KpiTitle>총 주문건수</KpiTitle>
                    <KpiValue>{safeKpi.totalOrderCount.toLocaleString()}건</KpiValue>
                </KpiCard>
                <KpiCard>
                    <KpiTitle>고객 수</KpiTitle>
                    <KpiValue>{safeKpi.customerCount.toLocaleString()}명</KpiValue>
                </KpiCard>
                <KpiCard>
                    <KpiTitle>상품 수</KpiTitle>
                    <KpiValue>{safeKpi.productCount.toLocaleString()}개</KpiValue>
                </KpiCard>
            </KpiGrid>

            {/* 📈 하단 차트 랭킹 섹션 */}
            <ChartSection>
                <ChartCard>
                    <ChartTitle>고객 구매 랭킹 TOP 10</ChartTitle>
                    <ChartWrapper>
                        <Bar data={userChartData} options={chartOptions} />
                    </ChartWrapper>
                </ChartCard>
                <ChartCard>
                    <ChartTitle>상품 판매 랭킹 TOP 10</ChartTitle>
                    <ChartWrapper>
                        <Bar data={productChartData} options={chartOptions} />
                    </ChartWrapper>
                </ChartCard>
            </ChartSection>
        </DashboardContainer>
    )
}

export default Dashboard;

/* ✨ Styled Components 스타일 정의 */

const DashboardContainer = styled.div`
  padding: 24px;
  background-color: #f8fafc;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  gap: 24px;
`;

const KpiGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 16px;
  width: 100%;
`;

const KpiCard = styled.div`
  background: #ffffff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  gap: 8px;
  border: 1px solid #e2e8f0;
`;

const KpiTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: #64748b;
`;

const KpiValue = styled.div`
  font-size: 20px;
  font-weight: 700;
  color: ${({ $color }) => $color || '#1e293b'};
`;

const ChartSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 24px;
  width: 100%;

  @media (max-width: 1024px) {
    grid-template-columns: 1fr;
  }
`;

const ChartCard = styled.div`
  background: #ffffff;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.1);
  border: 1px solid #e2e8f0;
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const ChartTitle = styled.div`
  font-size: 16px;
  font-weight: 700;
  color: #0f172a;
  border-left: 4px solid #3b82f6;
  padding-left: 8px;
`;

const ChartWrapper = styled.div`
  position: relative;
  height: 350px;
  width: 100%;
`;

const LoadingMessage = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #64748b;
`;

const ErrorMessage = styled.div`
  padding: 40px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
  color: #ef4444;
`;