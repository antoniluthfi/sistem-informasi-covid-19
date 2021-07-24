import React, { useEffect, useState } from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';
import moment from 'moment';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  makeStyles,
  colors
} from '@material-ui/core';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

const useStyles = makeStyles(() => ({
  root: {}
}));

const Sales = ({ className, dataStatistik, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();
  const [tanggal, setTanggal] = useState([]);
  const [meninggal, setMeninggal] = useState([]);
  const [sembuh, setSembuh] = useState([]);
  const [positif, setPositif] = useState([]);
  const [dirawat, setDirawat] = useState([]);

  // console.log(dataStatistik[0].jumlah_meninggal);
  const execute = () => {
    if (dataStatistik[0]) {
      const dataTanggal = [];
      const dataMeninggal = [];
      const dataSembuh = [];
      const dataPositif = [];
      const dataDirawat = [];

      dataStatistik.map(item => {
        dataTanggal.push(moment(item.key_as_string).format('L'));
        dataMeninggal.push(item.jumlah_meninggal.value);
        dataSembuh.push(item.jumlah_sembuh.value);
        dataPositif.push(item.jumlah_positif);
        dataDirawat.push(item.jumlah_dirawat);
      });

      setTanggal(dataTanggal);
      setMeninggal(dataMeninggal);
      setSembuh(dataSembuh);
      setPositif(dataPositif);
      setDirawat(dataDirawat);
    }
  };

  useEffect(() => {
    execute();
  }, []);

  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: meninggal,
        label: 'Jumlah Meninggal'
      },
      {
        backgroundColor: colors.green[500],
        data: sembuh,
        label: 'Jumlah Sembuh'
      }
    ],
    labels: tanggal
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.default,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader
        action={
          <Button endIcon={<ArrowDropDownIcon />} size="small" variant="text">
            Dalam 7 Hari
          </Button>
        }
        title="Statistik"
      />
      <Divider />
      <CardContent>
        <Box height={400} position="relative">
          <Bar data={data} options={options} />
        </Box>
      </CardContent>
      <Divider />
      <Box display="flex" justifyContent="flex-end" p={2}>
        <Button
          color="primary"
          endIcon={<ArrowRightIcon />}
          size="small"
          variant="text"
        >
          Overview
        </Button>
      </Box>
    </Card>
  );
};

Sales.propTypes = {
  className: PropTypes.string
};

export default Sales;
