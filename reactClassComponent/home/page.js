import React, { Component } from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import axios from 'axios';
import { sendPostRequest, sendGetRequest } from '../../utils/network';
import {MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import {withRouter,Link} from "react-router-dom";
import Posts from "../single-post/posts";

class Page extends Component {
  constructor(props) {
      super(props);

  }

  componentDidMount() {
      console.log("page called");
  }

	render() {
    	const { classes } = this.props;
      const { loading, post, error } = this.state;
      return (
    		<div>
    			<Posts pageId={this.props.match.params.id}/>
    		</div>
    	)
}};

export default (withRouter(Page));
