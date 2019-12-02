import React from 'react';
import CardForMobile from './card-for-mobile';
import Button from '@material-ui/core/Button';


const MobileViewComponent = props => {
  const { rows, like } = props;
  const [page, setPage] = React.useState(5);

  const likeOrDislike = (data, isLikeAction) => {
    if (isLikeAction) {
      like({ text: data.text, rating: 1 });
    } else {
      like({ text: data.text, rating: -1 });
    }
  };

  const handleChangeRowsPerPage = event => {
    setPage(page + 5);
  };

  return (
    <div>
      {rows.slice(0, page).map(row => <CardForMobile key={row.text} likeOrDislike={likeOrDislike} row={row}/>)}
      {page < rows.length && <Button color="primary" onClick={handleChangeRowsPerPage}>ნახე მეტი...</Button>}
    </div>
  );
};

export default MobileViewComponent;
