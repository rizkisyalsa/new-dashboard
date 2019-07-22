import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDrop } from "react-dnd";
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import IconButton from '@material-ui/core/IconButton';
import Cancel from '@material-ui/icons/Cancel';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  cardNoItem: {
    outline: "1.5px dashed gray",
    outlineOffset: "-7px",
    height: "16rem",
    width: "16rem",
    margin: "0 0 1.5rem 0",
    color: "black",
    padding: "1rem",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left",
    wordWrap: "break-word",
    alignItems: "center"
  },
  cardFilled: {
    height: "16rem",
    width: "16rem",
    margin: "0 0 1.5rem 0",
    color: "black",
    textAlign: "center",
    fontSize: "1rem",
    lineHeight: "normal",
    float: "left",
    wordWrap: "break-word",
    alignItems: "center",
    boxShadow: "0 0.5rem 1rem rgba(0, 0, 0, 0.2)",
    backgroundColor : "rgb(65, 86, 181, 0.2)"

  },
  cardheader: {
    textAlign: "left",
  },
  title: {
    color: "grey",
    fontSize: "1.2rem",
  },
  titleActive: {
    color: "white",
    fontSize: "1.2rem",
  },
});

const DropComponent = ({ accept, lastDroppedItem, onDrop, onCancel }) => {

  const classes = useStyles();

  const [{ isOver, canDrop }, drop] = useDrop({
    accept,
    drop: onDrop,
    collect: monitor => ({
      isOver: monitor.isOver(),
      canDrop: monitor.canDrop()
    })
  });

  const isActive = isOver && canDrop;
  let backgroundColor = "#f7f7f7";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (canDrop) {
    backgroundColor = "darkkhaki";
  }


    return (
      <div>
      {!lastDroppedItem && (
        <Card className={classes.cardNoItem} ref={drop} style={{ backgroundColor }}>
          <CardHeader
          />
          <CardContent>
            {isActive
              ?
              <Typography className={classes.titleActive} color="textPrimary" component="p">
                Release to drop
              </Typography>
              :
              <Typography className={classes.title} color="textPrimary" component="p">
              Drop item here.
              </Typography>}
          </CardContent>
        </Card>
      )}
      {lastDroppedItem && (
        <Card className={classes.cardFilled} ref={drop}>
          <CardHeader className={classes.cardheader}
            title={lastDroppedItem.name}
            action={
              <IconButton aria-label="Cancel" onClick={onCancel}>
                <Cancel />
              </IconButton>
            }
          />
          <CardContent>
            {lastDroppedItem && (
              <p>Last dropped: {JSON.stringify(lastDroppedItem.name + " " + lastDroppedItem.type)}</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
    );
  }

export default DropComponent
