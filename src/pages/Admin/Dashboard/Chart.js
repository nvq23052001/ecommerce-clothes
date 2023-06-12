/*eslint-disable*/
import { Card, Box, CardHeader, ToggleButtonGroup, ToggleButton } from '@mui/material';
import DealCard from 'components/common/admin/dealCard/DealCard';
import Select from 'components/common/select/Select';
import { apiUrls } from 'config/apis';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import { useApis } from 'services/api';
import { chartType, filerBy } from './constants';
import { ArcElement, BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from 'chart.js';
import './index.scss';
import currency, { priceRemoveVND } from 'utils/currency';

import ReactApexChart from 'react-apexcharts';
import Loading from 'components/common/loading/Loading';
import { useNavigate } from 'react-router-dom';
import routes from 'config/routes';

const today = new Date();

const aMonthAgo = new Date();
aMonthAgo.setMonth(aMonthAgo.getMonth() - 1);

const MIN_YEAR = 2021;

const years = Array.from({ length: today.getFullYear() - MIN_YEAR + 1 }).map((_, i) => {
  return {
    value: MIN_YEAR + i,
    label: MIN_YEAR + i
  };
});

const Chart = () => {
  const { apiGet } = useApis();
  const [data, setData] = useState([]);
  const navigate = useNavigate()
  
 
  
 

  const [to, setTo] = useState(Number(today.getFullYear()));
  const [from, setFrom] = useState(MIN_YEAR);
  const [year, setYear] = useState(Number(today.getFullYear()));

  const [key, setKey] = useState('month');
  const totalRef = useRef({
    totalRevenue: 0,
    totalOrder: 0,
    totalProfits: 0
  });
  const [loading, setLoading] = useState(false);

  const getData = useCallback(() => {
    setLoading(true);
    apiGet(
      apiUrls.statistic(),
      {
        ...(key !== 'year'
          ? {
              key: key,
              year: year
            }
          : {
              key: 'year',
              year: from,
              to: to
            })
      },
      ({ status, data }) => {
        if (status) {
          setLoading(false);
          setData(data.items);
          let totalRevenue = 0;
          let totalOrder = 0;
          let totalProfits = 0;
          data.items?.forEach((item) => {
            totalRevenue += item.revenue;
            totalOrder += item.quantity;
            totalProfits += item.profits;
          });
          totalRef.current = {
            totalRevenue,
            totalOrder,
            totalProfits
          };
        }
      }
    );
  }, [key, from, to, year]);

  useEffect(() => {
    getData();
  }, [getData]);

  const dotWidth = 3;

  // console.log(totalRef.current)
  const { totalOrder, totalProfits, totalRevenue } = totalRef.current;

  const params = {
    ...(key !== 'year'
      ? {
          key: key,
          year: year
        }
      : {
          key: 'year',
          year: from,
          to: to
        })
  }
  return (
    <Card>
      <div className="d-f ai-c jc-sb" style={{ padding: '10px 16px 0 8px' }}>
        <CardHeader
          title={'Doanh thu'}
          sx={{
            '.MuiTypography-root': {
              fontSize: '1.6rem',
              fontWeight: 600
            }
          }}
        />
      </div>
      <div style={{ marginLeft: 20 }} className="d-f ai-c">
        <ToggleButtonGroup
          sx={{
            height: '36px',
            marginRight: '50px',
            button: {
              textTransform: 'none',
              fontFamily: 'Inter'
            }
          }}
          color="primary"
          value={key}
          exclusive={true}
          onChange={(_, e) => {
            if (e) setKey(e);
            switch (e) {
              case 'month':
                setYear(Number(today.getFullYear()));
                break;

              case 'quarter':
                setYear(Number(today.getFullYear()));
                break;

              case 'year':
                setFrom(MIN_YEAR);
                setTo(Number(today.getFullYear()));
                break;
            }
          }}
        >
          {filerBy.map(({ value, label }) => (
            <ToggleButton value={value}>{label}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        {key !== 'year' ? (
          <Select
            label={'Năm'}
            style={{ width: 100, marginRight: 12 }}
            selected={year}
            setSelected={setYear}
            data={years}
            maxHeight={220}
          />
        ) : (
          <>
            <Select
              label={`Từ năm`}
              style={{ width: 100, marginRight: 12 }}
              selected={from}
              setSelected={setFrom}
              data={years.filter((item) => item.value < to)}
              maxHeight={220}
            />
            <Select
              label={`Đến năm`}
              style={{ width: 100 }}
              selected={to}
              setSelected={setTo}
              data={years.filter((item) => item.value > from)}
              maxHeight={220}
            />
          </>
        )}
      </div>

      <Box sx={{ p: 3, pb: 4 }} dir="ltr" style={{ width: '100%' }}>
        {loading ? (
          <div style={{ minHeight: 370 }}>
            <Loading />
          </div>
        ) : (
          <>
            <div className="statisticCart">
              <div className="statisticCartItem">
                <p className="statisticCartItem-title">Tổng doanh thu</p>
                <div className="d-f ai-c" style={{ marginTop: 10 }}>
                  <i className="fas fa-money-bill-alt" style={{ background: '#1976d2' }}></i>
                  <p className="statisticCartItem-info">{currency(totalRevenue)}</p>
                </div>
              </div>
              <div className="statisticCartItem">
                <p className="statisticCartItem-title">Tổng lợi nhuận</p>
                <div className="d-f ai-c" style={{ marginTop: 10 }}>
                  <i className="fas fa-coins" style={{ background: '#e74c3c' }}></i>
                  <p className="statisticCartItem-info">{currency(totalProfits)}</p>
                </div>
              </div>
              <div className="statisticCartItem" onClick={ () => navigate('/admin/detailTotal',{state:params})}>
                <p className="statisticCartItem-title">Tổng số đơn hàng</p>
                <div className="d-f ai-c" style={{ marginTop: 10 }}>
                  <i className="fas fa-shopping-cart" style={{ background: '#07bc0c' }}></i>
                  <p className="statisticCartItem-info">{totalOrder}</p>
                </div>
              </div>
            </div>
            <div style={{ marginLeft: -80, marginRight: -90 }}>
              <ReactApexChart
                type="line"
                series={[
                  {
                    name: 'Doanh thu',
                    type: 'line',
                    data: data.map(({ revenue }) => revenue)
                  },
                  {
                    name: 'Số lượng đơn hàng',
                    type: 'line',
                    data: data.map(({ quantity }) => Math.floor(quantity))
                  }
                ]}
                options={{
                  stroke: { width: [dotWidth, dotWidth], curve: 'smooth' },
                  plotOptions: { bar: { columnWidth: '11%', borderRadius: 4 } },
                  labels: data.map(({ title }) => title),
                  xaxis: {
                    type: 'category',
                    tickPlacement: 'on',
                    tickAmount: 8
                  },
                  tooltip: {
                    shared: true,
                    intersect: false,
                    y: {
                      formatter: (y) => priceRemoveVND(y)
                    }
                  },
                  yaxis: [
                    {
                      title: {
                        text: 'Doanh thu',
                        rotate: 0,
                        offsetX: 60,
                        offsetY: 190
                      },
                      labels: {
                        formatter: (x) => priceRemoveVND(x)
                      }
                    },
                    {
                      opposite: true,
                      title: {
                        text: 'Số lượng đơn hàng',
                        rotate: 0,
                        offsetX: -40,
                        offsetY: 190
                      },
                      labels: {
                        formatter: (x) => Math.floor(x).toString()
                      }
                    }
                  ],
                  chart: {
                    toolbar: {
                      show: false
                    },
                    fontFamily: 'Inter',
                    zoom: {
                      enabled: false
                    },
                    events: {
                      mounted: (chart) => {
                        chart.windowResizeHandler();
                      }
                    }
                  },
                  grid: {
                    padding: {
                      left: 20,
                      right: 20
                    }
                  }
                }}
                height={364}
              />
            </div>
          </>
        )}
      </Box>
    </Card>
  );
};

export default Chart;
