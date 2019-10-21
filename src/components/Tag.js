import React from 'react';
import {Button} from "reactstrap";

export default function Tag(props){
    return(
      <Button
          style={{display: "inline-block", backgroundColor: "green", padding: '1px'}}
          onClick={e => alert('lol')}
      >
          THETag <img
          src='https://cdn3.iconfinder.com/data/icons/linecons-free-vector-icons-pack/32/tag-512.png'
          style={{maxWidth: '12pt'}}
      />
      </Button>
    );
}