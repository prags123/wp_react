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
import TextField from '@material-ui/core/TextField';
import Badge from "@material-ui/core/Badge";
import Moment from "moment";
import blogStyles from '../home/blogStyles';
import globalTheme from '../theme/blogTheme';
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import DateRangeIcon from '@material-ui/icons/DateRange';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import PostLoader from "../layouts/loader";
import FeaturedImage from "../layouts/featuredImage";

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


class SinglePost extends Component {
  constructor(props) {
      super(props);
      this.state = {
        loading : false,
  			post: {},
  			error: ''
  		};
  }

  componentDidMount() {
		this.setState( { loading: true }, () => {
			axios.get(`http://example.com/index.php/wp-json/rae/v1/post?post_id=${this.props.match.params.id}`)

				.then( res => {
  					if ( Object.keys( res.data ).length ) {
  						this.setState( { loading: false, post: res.data } );
  					} else {
  						this.setState( { loading: false, error: 'No Posts Found' } );
  					}
				})
				.catch( err => this.setState( { loading: false, error: err } ) );
		})
  }

	render() {
    	const { classes } = this.props;
      const { loading, post, error } = this.state;
      return (
        <MuiThemeProvider theme={globalTheme}>
        <div style={{backgroundColor: "white"}}>
         <CssBaseline />
         <AppBar position="sticky">
           <Toolbar>
               <MuiLink href="/blog/" underline="none" style={{fontSize:"2em",fontWeight:"900",textDecoration:"none",color: "white",fontFamily:"Montserrat" }}>EzyPeazy</MuiLink>
           </Toolbar>
         </AppBar>
         {/* Hero unit */}


         { loading ? <PostLoader className={classes.loader}/> : '' }
         {/* Hero unit */}
          <Container maxWidth="md" component="main" className={classes.heroContent}>
           {/* End hero unit */}
           { Object.keys(post).length ? (
              <Grid container spacing={1} direction="column">
                  <Grid item xs={12}>
                    <Typography component="h1" variant="h3" align="center" color="textPrimary">
                        {renderHTML(post.post_data.title)} <br/>

                        <Typography variant="subtitle2" color="textPrimary" style={{justifyContent:"center",display:"flex",padding:"0 5px"}}>
                          <PermIdentityIcon/> - {post.post_data.meta.author_name} &nbsp;
                          <DateRangeIcon/> - {post.post_data.date} &nbsp;
                          {/*	Categories*/}
                          <FolderOpenIcon/> -
                  				{ post.post_data.categories.length ? (
                  							post.post_data.categories.map((category, index) => {
                  								return (
                  									// If its not the last item.
                  									(index !== (post.post_data.categories.length - 1)) ?
                  										 category.name +", "
                  										:
                  										 category.name
                  								)
                  							})
                  				) : '' }
                        </Typography>
                    </Typography>
                  </Grid>
                  <Grid item xs={12} align="center">
                      { post.post_data.attachment_image.img_sizes ? <FeaturedImage title={ post.post_data.title } image={ post.post_data.attachment_image }/> : '' }
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h5" align="center" color="textSecondary" style={{fontSize: "1.4em",textAlign: "justify"}} component="p">
                        {renderHTML(post.post_data.content)}
                    </Typography>
                  </Grid>
              </Grid>
  				 ) : '' }
          </Container>




        </div>
        </MuiThemeProvider>
      );
  }
}

SinglePost.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(blogStyles)
)(withRouter(SinglePost));
