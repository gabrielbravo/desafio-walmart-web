import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { identity } from 'lodash';

const useStyles = makeStyles({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
});

export default function ResultItem(props) {
  const { id, brand, price, description, image, original_price } = props.product;
  const idDiscount = original_price !== undefined;

  const classes = useStyles();

  return (
    <Card className={classes.root} key={id}>
      <CardActionArea>
        <Link href={`/producto/${id}`}>
          <CardMedia
            className={classes.media}
            image={`http://${image}`}
            title={description}
          />
          <CardContent>
            <Typography gutterBottom variant="h6">
              {description}
            </Typography>
            <Typography gutterBottom variant="caption">
              {brand}
            </Typography>
            
            {
              idDiscount ?
              <>
              <Typography gutterBottom variant="subtitle2" >
                <span style={{ textDecoration: 'line-through' }}>
                {`$${original_price}`}
                </span>
              </Typography>
              <Typography gutterBottom variant="subtitle2">
              {`$${price}`}
              </Typography>
              </>
              :
              <Typography gutterBottom variant="subtitle2">
              {`$${price}`}
            </Typography>
            }
          </CardContent>
        </Link>
      </CardActionArea>
    </Card>
  );
}