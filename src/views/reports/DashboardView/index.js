import React, { useEffect } from 'react';
import { Container, Grid, makeStyles, Typography } from '@material-ui/core';
import moment from 'moment';
import Page from 'src/components/Page';
import JumlahDirawat from './JumlahDirawat';
import LatestOrders from './LatestOrders';
import Statistik from './Statistik';
import JumlahPositif from './JumlahPositif';
import JumlahMeninggal from './JumlahMeninggal';
import JumlahSembuh from './JumlahSembuh';
import TotalKeseluruhan from './TotalKeseluruhan';

// helpers
import Helpers from './Helpers';

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    minHeight: '100%',
    paddingBottom: theme.spacing(3),
    paddingTop: theme.spacing(3)
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  const {
    dataTerupdate,
    setDataTerupdate,
    dataStatistik,
    setDataStatistik,
    totalKeseluruhan,
    setTotalKeseluruhan,
    getDataTerupdate
  } = Helpers();

  useEffect(() => {
    getDataTerupdate();

    return () => {
      setDataTerupdate({});
      setDataStatistik([]);
      setTotalKeseluruhan([]);
    };
  }, []);

  return (
    <Page className={classes.root} title="Dashboard">
      <Container maxWidth={false}>
        <Typography color="textSecondary" gutterBottom variant="h1">
          UPDATE COVID 19{' '}
          {moment(dataTerupdate.tanggal)
            .format('LL')
            .toUpperCase()}
        </Typography>

        <Grid container spacing={3}>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <JumlahDirawat total={dataTerupdate.jumlah_dirawat} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <JumlahMeninggal total={dataTerupdate.jumlah_meninggal} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <JumlahPositif total={dataTerupdate.jumlah_positif} />
          </Grid>
          <Grid item lg={3} sm={6} xl={3} xs={12}>
            <JumlahSembuh total={dataTerupdate.jumlah_sembuh} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <Statistik dataStatistik={dataStatistik} />
          </Grid>
          <Grid item lg={4} md={6} xl={3} xs={12}>
            <TotalKeseluruhan totalKeseluruhan={totalKeseluruhan} />
          </Grid>
          <Grid item lg={8} md={12} xl={9} xs={12}>
            <LatestOrders />
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Dashboard;
