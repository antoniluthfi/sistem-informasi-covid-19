import React from 'react';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { Doughnut } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Typography,
  colors,
  makeStyles,
  useTheme
} from '@material-ui/core';
import PeopleIcon from '@material-ui/icons/People';

const useStyles = makeStyles(() => ({
  root: {
    height: '100%'
  }
}));

const TotalKeseluruhan = ({ className, totalKeseluruhan, ...rest }) => {
  const classes = useStyles();
  const theme = useTheme();

  const data = {
    datasets: [
      {
        data: [
          totalKeseluruhan.jumlah_meninggal,
          totalKeseluruhan.jumlah_positif,
          totalKeseluruhan.jumlah_sembuh,
          totalKeseluruhan.jumlah_dirawat
        ],
        backgroundColor: [
          colors.indigo[500],
          colors.red[600],
          colors.green[600],
          colors.yellow[600]
        ],
        borderWidth: 8,
        borderColor: colors.common.white,
        hoverBorderColor: colors.common.white
      }
    ],
    labels: [
      'Jumlah Meninggal',
      'Jumlah Positif',
      'Jumlah Sembuh',
      'Jumlah Dirawat'
    ]
  };

  const options = {
    animation: false,
    cutoutPercentage: 80,
    layout: { padding: 0 },
    legend: {
      display: false
    },
    maintainAspectRatio: false,
    responsive: true,
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

  const devices = [
    {
      title: 'Jumlah Meninggal',
      value: totalKeseluruhan.jumlah_meninggal,
      icon: PeopleIcon,
      color: colors.indigo[500]
    },
    {
      title: 'Jumlah Positif',
      value: totalKeseluruhan.jumlah_positif,
      icon: PeopleIcon,
      color: colors.red[600]
    },
    {
      title: 'Jumlah Sembuh',
      value: totalKeseluruhan.jumlah_sembuh,
      icon: PeopleIcon,
      color: colors.green[600]
    },
    {
      title: 'Jumlah Dirawat',
      value: totalKeseluruhan.jumlah_dirawat,
      icon: PeopleIcon,
      color: colors.yellow[600]
    }
  ];

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Total Keseluruhan" />
      <Divider />
      <CardContent>
        <Box height={300} position="relative">
          <Doughnut data={data} options={options} />
        </Box>
        <Box display="flex" justifyContent="center" mt={2}>
          {devices.map(({ color, icon: Icon, title, value }) => (
            <Box key={title} p={1} textAlign="center">
              <Icon color="action" />
              <Typography color="textPrimary" variant="h6">
                {title}
              </Typography>
              <Typography style={{ color }} variant="h6">
                {value} orang
              </Typography>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

TotalKeseluruhan.propTypes = {
  className: PropTypes.string
};

export default TotalKeseluruhan;
