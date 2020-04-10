import React, { Component } from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import axios from 'axios';
import { sendPostRequest, sendGetRequest } from '../../utils/network';
import {MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import {withRouter,Link} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MuiLink from '@material-ui/core/Link';
import renderHTML from 'react-render-html';
import globalTheme from '../theme/blogTheme';
import Posts from "../single-post/posts";
import blogStyles from './blogStyles';



function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MuiLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MuiLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

class Home extends Component {
  constructor(props) {
      super(props);
      this.state = {
  			loading : false,
  			posts: [],
  			error: ''
  		};

  }

  componentDidMount() {
  console.log("home called");
      this.setState({ loading: true }, () => {
          axios.get('http://15.206.100.205/index.php/wp-json/wp/v2/posts').then( res => {
            					console.log(res.data);
                      this.setState({ posts: res.data });
          })
          .catch(err => {
              console.log("err---------------------------"+err);}
          )}
      )
  }

	render() {
      const {classes} = this.props;
      const { loading, posts, error } = this.state;
      return (
        <MuiThemeProvider theme={globalTheme}>
          <CssBaseline />
          <div style={{backgroundColor: "white",height:"100vh"}}>
            <Posts pageId={1}/>

          </div>
        </MuiThemeProvider>
      );
  }
}

Home.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(blogStyles)
)(withRouter(Home));

// https://www.youtube.com/watch?v=8ehO3Sk7yRM
