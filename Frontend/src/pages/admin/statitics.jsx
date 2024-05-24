import {
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import GroupIcon from "@mui/icons-material/Group";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import CarouselComponent from "../../components/home/carousel";
import Carousel from "react-material-ui-carousel";
import SlideItem from "../../components/admin/slideItem";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import { getAnalyst } from "../../api/analyst";
import { format, set } from "date-fns";
import { eachDayOfInterval, startOfDay, endOfDay } from "date-fns";
import { LineChart } from "@mui/x-charts/LineChart";

// Hàm trả về số thống kê đơn giản
function thongkesimple(type, number, IconComponent) {
  return (
    <Paper
      sx={{
        width: "30%",
        height: "100%",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        {IconComponent}
        <Typography>{type}</Typography>
      </Box>
      <Typography
        sx={{
          color: "green",
          fontSize: "1.5rem",
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        +{number}
      </Typography>
    </Paper>
  );
}

function Statitics() {
  const trendingMovies = [
    {
      id: 1,
      title: "Movie Title 1",
      poster_path: "/path/to/movie1.jpg",
    },
    {
      id: 2,
      title: "Movie Title 2",
      poster_path: "/path/to/movie2.jpg",
    },
    {
      id: 3,
      title: "Movie Title 3",
      poster_path: "/path/to/movie3.jpg",
    },
    // ... more movies
  ];

  const [topCategory, setTopCategory] = useState([]);
  const [timeTopCategory, setTimeTopCategory] = useState("Week");
  const [selectedDateStart, setSelectedDateStart] = useState(new Date());
  const [selectedDateEnd, setSelectedDateEnd] = useState(new Date());
  const [totalView, setTotalView] = useState(0);
  const [arrayView, setArrayView] = useState([]);
  const [arrayDate, setArrayDate] = useState([]);
  const handleChange = (event) => {
    setTimeTopCategory(event.target.value);
  };
  useEffect(() => {
    // Gọi API lấy dữ liệu top category
    setTopCategory([
      {
        label: "Action",
        value: 10,
      },
      {
        label: "Scienfic",
        value: 15,
      },
      {
        label: "Adventure",
        value: 20,
      },
    ]);
  }, []);

  useEffect(() => {
    const formattedDateStart = format(selectedDateStart, "yyyy/MM/dd HH:mm:ss");
    const formattedDateEnd = format(selectedDateEnd, "yyyy/MM/dd HH:mm:ss");
    getAnalyst(formattedDateStart, formattedDateEnd).then((res) => {
      console.log("ânlysskdjfnd", res);
      setTotalView(res);
    });

    const start = new Date(formattedDateStart);
    const end = new Date(formattedDateEnd);

    const dateInterval = eachDayOfInterval({ start, end });

    Promise.all(
      dateInterval.map((date) => {
        const startOfDate = startOfDay(date);
        const endOfDate = endOfDay(date);
        return getAnalyst(
          format(startOfDate, "yyyy/MM/dd HH:mm:ss"),
          format(endOfDate, "yyyy/MM/dd HH:mm:ss")
        ).then((res) => {
          console.log("kljdfkfjfjfffffff", res);
          return { view: res, date: format(date, "yyyy/MM/dd") };
        });
      })
    ).then((results) => {
      // arrayView = results.map(result => result.view);
      // arrayDate = results.map(result => result.date);
      setArrayView(results.map((result) => result.view));
      setArrayDate(results.map((result) => result.date));
    });
  }, [selectedDateStart, selectedDateEnd]);

  const handleDateStartChange = (event) => {
    setSelectedDateStart(event.target.value);
  };
  const handleDateEndChange = (event) => {
    setSelectedDateEnd(event.target.value);
  };
  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12}>
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              height: "6rem",
            }}
          >
            {thongkesimple("View", `${totalView}`, <RemoveRedEyeIcon />)}
            {thongkesimple("Visitors", "53K", <GroupIcon />)}
            {thongkesimple("Vip member", "10", <AccountBalanceWalletIcon />)}
          </Box>
        </Grid>
     

        <Grid item xs={12} sm={12}>
          <Paper
            sx={{
              height: "100%",
              padding: "1rem",
            }}
          >
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                marginBottom: "1rem",
              }}
            ></Box>
            <Box
              sx={{
                width: "100%%",
                height: "100%",
                padding: "1rem",
              }}
            >
              <Typography
                sx={{
                  fontSize: "1.2rem",
                  fontWeight: "bold",
                  textAlign: "center",
                  display: "flex",
                }}
              >
                Select a date: 
                Start
                <input
                  type="date"
                  value={selectedDateStart}
                  onChange={handleDateStartChange}
                />
                End
                <input
                  type="date"
                  value={selectedDateEnd}
                  onChange={handleDateEndChange}
                />
              </Typography>
              <LineChart
                series={[{ data: arrayView, label: "Views" }]}
                xAxis={[{ scaleType: "point", data: arrayDate }]}
                width={500}
                height={300}
              />
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Statitics;
