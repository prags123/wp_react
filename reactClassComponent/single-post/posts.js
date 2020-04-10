import React, { Component } from "react";
import PropTypes from "prop-types";
import compose from "recompose/compose";
import axios from 'axios';
import { sendPostRequest, sendGetRequest } from '../../utils/network';
import {MuiThemeProvider, withStyles} from "@material-ui/core/styles";
import {withRouter} from "react-router-dom";
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import CameraIcon from '@material-ui/icons/PhotoCamera';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import MuiLink from '@material-ui/core/Link';
import renderHTML from 'react-render-html';
import StarIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import Moment from "moment";
import blogStyles from '../home/blogStyles';
import Post from "../layouts/post";
import Pagination  from "../layouts/pagination";
import PostLoader from "../layouts/loader";

class Posts extends Component {
  constructor(props) {
      super(props);
      this.state = {
        currentPage:this.props.pageId,
        totalPages:1,
        loading: false,
        errMessage: '',
        posts:null
  		};
  }

  componentDidMount() {
      console.log("posts called");
      this.setState({ loading: true }, () => {
          axios.get(`http://example.com/index.php/wp-json/rae/v1/posts?page_no=${this.state.currentPage}`).then(res => {

              this.setState({loading: false});

      				if(200 === res.data.status) {
                this.setState({loading: false, posts: res.data.posts_data,totalPages:res.data.page_count});
      				} else {
      					this.setState({loading: false, errMessage: 'No Posts Found'});
      				}
          })
          .catch(err => {
              this.setState({loading: false, errMessage: err});
            }
          )}

      )

  }

  getPosts = (posts) => {
		return posts.map( post => <Post key={post.id} post={post}/> );
	};

  onPageChange = (newPage) => {

    this.setState({ currentPage: newPage }, () => {
        axios.get(`http://15.206.100.205/index.php/wp-json/rae/v1/posts?page_no=${this.state.currentPage}`).then(res => {

            this.setState({loading: false});

            if(200 === res.data.status) {
              this.setState({loading: false, posts: res.data.posts_data,totalPages:res.data.page_count});
            } else {
              this.setState({loading: false, errMessage: 'No Posts Found'});
            }
        })
        .catch(err => {
            this.setState({loading: false, errMessage: err});
          }
        )}

    );

  }

	render() {
    	const { classes } = this.props;
      const { loading, post, error } = this.state;
      return (
        <div>
         <CssBaseline />
         <AppBar position="sticky">
           <Toolbar>
               <MuiLink to="/blog/" underline="none" style={{fontSize:"2em",fontWeight:"900",textDecoration:"none",color: "white",fontFamily:"Montserrat" }}>EzyPeazy</MuiLink>
           </Toolbar>
         </AppBar>
         {/* Hero unit */}

         <div className={classes.heroContent}>
           <Container maxWidth="sm">
             <Typography component="h1" variant="h2" align="center" color="textPrimary">
               EzyPeazy
             </Typography>
             <Typography variant="h5" align="center" color="textSecondary" paragraph>
               Something short and leading about the collection below—its contents, the creator, etc.
               Make it short and sweet, but not too short so folks don&apos;t simply skip over it
               entirely.
             </Typography>
           </Container>
         </div>
         <div>

             { loading ? <PostLoader/> : '' }

    				{( !loading && null!== this.state.posts && this.state.posts.length ) ? (
    					<div style={{ "column-count":"3",width:"95%",margin: "0 auto"}}>
    						{ this.getPosts(this.state.posts) }
                <Pagination
    							currentPage={this.state.currentPage}
    						  totalPages={this.state.totalPages}
                  onPageChange={this.onPageChange}
    						/>
    					</div>
    				) : <div>{this.state.errMessage}</div> }
        </div>
         {/* End hero unit */}

         {/* Footer */}
         <div className={classes.footerHome}>
            <Container maxWidth="sm">
               <Typography variant="subtitle1" align="center" component="p">
                   © 2020 All rights reserved. ezy peazy - Post Tasks, Get Work Done
               </Typography>
             </Container>
         </div>
         {/* End footer */}
        </div>
      );
  }
}

Posts.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(blogStyles)
)(withRouter(Posts));
