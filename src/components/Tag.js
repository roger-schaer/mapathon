import React from 'react';
import {Button} from "reactstrap";

export default function Tag(props){

    let tag = props.tagToDisplay;
    let colorTag = tag.color;

    return(
      <Button
          style={{display: "inline-block", backgroundColor: {colorTag}, padding: '1px'}}
      >
          {tag.name} <img
          src={tag.image}
          style={{maxWidth: '12pt'}}
      />
      </Button>
    );
}