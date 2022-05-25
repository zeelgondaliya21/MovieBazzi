import React, { useEffect, useState } from "react";
// import Select from "react-select";
import { Switch, FormControlLabel, Typography } from "@mui/material";
// import { genreForSelect, sortingWay } from "./data";
import SearchedMovie from "./SearchedMovie";
import SearchedTV from "./SearchedTV";

function SearchFilter(props) {
  const [filteredData, setFilteredData] = useState([]);
  // const [selectedGenre, setSelectedGenre] = useState([]);
  // const [sortMethod, setSortMethod] = useState("");
  const [movieChecked, setMovieChecked] = useState(true);
  const [TVChecked, setTVChecked] = useState(true);

  useEffect(() => {
    setFilteredData(props.searchData);
  }, [props.searchData]);

  const handleMovieCheck = (event) => {
    setMovieChecked(event.target.checked);
  };

  const handleTVCheck = (event) => {
    setTVChecked(event.target.checked);
  };

  return (
    <React.Fragment>
      <div className="container filter-panel">
        {/* <div className="filter-panel-select">
          <Select
            value={sortMethod}
            onChange={setSortMethod}
            options={sortingWay}
            isSearchable={false}
            placeholder="Sort"
          />
        </div>
        <div className="filter-panel-select">
          <Select
            isMulti={true}
            value={selectedGenre}
            onChange={setSelectedGenre}
            options={genreForSelect}
            placeholder="Genres"
          />
        </div> */}
        <div className="filter-panel-switch">
          <FormControlLabel
            control={
              <Switch checked={movieChecked} onChange={handleMovieCheck} />
            }
            label={
              <Typography sx={{ fontSize: 16, color: "white" }}>
                Movies
              </Typography>
            }
          />
          <FormControlLabel
            control={<Switch checked={TVChecked} onChange={handleTVCheck} />}
            label={
              <Typography sx={{ fontSize: 16, color: "white" }}>
                TV Shows
              </Typography>
            }
          />
        </div>
      </div>
      {/* {movieChecked && (
        <SearchedMovie searchData={filteredData} sort={sortMethod} />
      )}
      {TVChecked && <SearchedTV searchData={filteredData} sort={sortMethod} />} */}
      {movieChecked && <SearchedMovie searchData={filteredData} />}
      {TVChecked && <SearchedTV searchData={filteredData} />}
    </React.Fragment>
  );
}

export default SearchFilter;

// import React, { useEffect, useState } from "react";
// import {
//   MenuItem,
//   FormControl,
//   Select,
//   FormControlLabel,
//   Checkbox,
//   OutlinedInput,
//   ListItemText,
//   InputLabel,
// } from "@mui/material";
// import { genre, sortingWay } from "./data";
// import SearchedMovie from "./SearchedMovie";
// import SearchedTV from "./SearchedTV";
// // import SearchedPerson from "./SearchedPerson";

// function SearchFilter(props) {
//   const [selectedGenre, setSelectedGenre] = useState([]);
//   const [selectedGenreByID, setSelectedGenreByID] = useState([]);
//   const [movieChecked, setMovieChecked] = useState(true);
//   const [TVChecked, setTVChecked] = useState(true);
//   const [filteredData, setFilteredData] = useState([]);
//   const [sortMethod, setSortMethod] = useState("");

//   useEffect(() => {
//     setFilteredData(props.searchData);
//     // console.log("filtersData", filteredData);
//   }, [props.searchData]);

//   const handleGenreSelection = (event) => {
//     setSelectedGenre(
//       typeof event.target.value === "string"
//         ? event.target.value.split(",")
//         : event.target.value
//     );

//     console.log("selectedGenre", selectedGenre);
//     genreIDFind();
//   };

//   // const genreIDFind = () => {
//   //   const temp = [];
//   //   selectedGenre.map((sg) => {
//   //     genre.map((g) => {
//   //       if (sg === g.name) {
//   //         temp.push(g.id);
//   //       }
//   //     });
//   //   });
//   //   setSelectedGenreByID(temp);

//   //   generateFilteredData();
//   // };

//   // const generateFilteredData = () => {
//   //   const temp = [];
//   //   props.searchData.map((d) => {
//   //     d.genre_ids.map((gi) => {
//   //       selectedGenreByID.map((sgi) => {
//   //         if (gi === sgi) {
//   //           temp.push(d);
//   //         }
//   //       });
//   //     });
//   //   });

//   //   let unique = [...new Set(temp)];

//   //   setFilteredData(unique);
//   // };

//   // const genreIDFind = () => {
//   //   const temp = [];
//   //   selectedGenre.forEach((sg) => {
//   //     genre.forEach((g) => {
//   //       if (sg === g.name) {
//   //         temp.push(g.id);
//   //       }
//   //     });
//   //   });
//   //   setSelectedGenreByID(temp);

//   //   generateFilteredData();
//   // };

//   // const generateFilteredData = () => {
//   //   const temp = [];
//   //   filteredData.forEach((d) => {
//   //     d.genre_ids.forEach((gi) => {
//   //       selectedGenreByID.forEach((sgi) => {
//   //         if (gi === sgi) {
//   //           temp.push(d);
//   //         }
//   //       });
//   //     });
//   //   });

//   //   let unique = [...new Set(temp)];

//   //   setFilteredData([...unique]);
//   // };

//   const genreIDFind = () => {
//     const temp = [];

//     for (let i = 0; i < selectedGenre.length; i++) {
//       for (let j = 0; j < genre.length; j++) {
//         if (selectedGenre[i] === genre[j].name) {
//           temp.push(genre[j].id);
//         }
//       }
//     }
//     setSelectedGenreByID(temp);

//     generateFilteredData();
//   };

//   const generateFilteredData = () => {
//     const temp = [];

//     for (let i = 0; i < filteredData.length; i++) {
//       for (let j = 0; j < filteredData[i].genre_ids.length; j++) {
//         for (let k = 0; k < selectedGenreByID.length; k++) {
//           if (filteredData[i].genre_ids[j] === selectedGenreByID[k]) {
//             temp.push(filteredData[i]);
//           }
//         }
//       }
//     }

//     let unique = [...new Set(temp)];

//     setFilteredData(unique);
//   };

//   const handleSortMethod = (event) => {
//     setSortMethod(event.target.value);

//     const temp = [...filteredData];

//     if (sortMethod === "Popularity Ascending") {
//       temp.sort((a, b) => {
//         return a.popularity - b.popularity;
//       });
//       setFilteredData(temp);
//     } else if (sortMethod === "Popularity Descending") {
//       temp.sort((a, b) => {
//         return b.popularity - a.popularity;
//       });
//       setFilteredData(temp);
//     }
//   };

//   const handleMovieCheck = (event) => {
//     setMovieChecked(event.target.checked);
//   };

//   const handleTVCheck = (event) => {
//     setTVChecked(event.target.checked);
//   };

//   const ITEM_HEIGHT = 48;
//   const ITEM_PADDING_TOP = 8;
//   const MenuProps = {
//     PaperProps: {
//       style: {
//         maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//         width: 200,
//       },
//     },
//   };

//   return (
//     <React.Fragment>
//       <div className="filter-panel">
//         <FormControl sx={{ m: 1, width: 200 }}>
//           <InputLabel id="demo-multiple-checkbox-label">Genre</InputLabel>
//           <Select
//             labelId="demo-multiple-checkbox-label"
//             id="demo-multiple-checkbox"
//             multiple
//             value={selectedGenre}
//             onChange={handleGenreSelection}
//             input={<OutlinedInput label="Genre" />}
//             renderValue={(selected) => selected.join(", ")}
//             MenuProps={MenuProps}
//           >
//             {genre.map((g) => {
//               return (
//                 <MenuItem key={g.id} value={g.name}>
//                   <Checkbox checked={selectedGenre.indexOf(g.name) > -1} />
//                   <ListItemText primary={g.name} />
//                 </MenuItem>
//               );
//             })}
//           </Select>
//         </FormControl>

//         <FormControl sx={{ m: 1, minWidth: 120 }}>
//           <InputLabel id="demo-simple-select-helper-label">Sort</InputLabel>
//           <Select
//             labelId="demo-simple-select-helper-label"
//             id="demo-simple-select-helper"
//             value={sortMethod}
//             label="Sort"
//             onChange={handleSortMethod}
//           >
//             {sortingWay.map((sw) => {
//               return (
//                 <MenuItem key={sw} value={sw}>
//                   {sw}
//                 </MenuItem>
//               );
//             })}
//           </Select>
//         </FormControl>

//         <FormControlLabel
//           control={
//             <Checkbox checked={movieChecked} onChange={handleMovieCheck} />
//           }
//           label="Movies"
//         />
//         <FormControlLabel
//           control={<Checkbox checked={TVChecked} onChange={handleTVCheck} />}
//           label="TV Shows"
//         />
//       </div>

//       {/* <SearchedPerson searchData={searchData} /> */}
//       {movieChecked && (
//         <SearchedMovie searchData={filteredData} sort={sortMethod} />
//       )}
//       {TVChecked && <SearchedTV searchData={filteredData} sort={sortMethod} />}
//     </React.Fragment>
//   );
// }

// export default SearchFilter;
