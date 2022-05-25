import React, { useState } from "react";
import {
  MenuItem,
  FormControl,
  Select,
  Grid,
  styled,
  Paper,
} from "@mui/material";

function SingleTVSeasons(props) {
  const [selectedSeason, setSelectedSeason] = useState("");

  const handleChange = (event) => {
    setSelectedSeason(event.target.value);
  };

  const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: "#1e2020",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "left",
    color: "white",
  }));

  return (
    <React.Fragment>
      <FormControl sx={{ m: 1, minWidth: 120 }}>
        <Select value={selectedSeason} onChange={handleChange} displayEmpty>
          {props.seasonData
            .filter((s) => {
              return s.name !== "Specials";
            })
            .map((s) => {
              return (
                <MenuItem key={s.season_number} value={s.season_number}>
                  {s.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <div className="selectedSeason">
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={12}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 2, md: 3 }}
            >
              <Grid item xs={3}>
                <Item>No of Episodes</Item>
              </Grid>
              <Grid item xs={9}>
                {props.seasonData
                  .filter((s) => {
                    return s.season_number === selectedSeason;
                  })
                  .map((s) => {
                    return (
                      <Item key={s.season_number} value={s.season_number}>
                        {s.episode_count}
                      </Item>
                    );
                  })}
              </Grid>
              <Grid item xs={3}>
                <Item>Overview</Item>
              </Grid>
              <Grid item xs={9}>
                {props.seasonData
                  .filter((s) => {
                    return s.season_number === selectedSeason;
                  })
                  .map((s) => {
                    return (
                      <Item key={s.season_number} value={s.season_number}>
                        {s.overview}
                      </Item>
                    );
                  })}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}

export default SingleTVSeasons;
