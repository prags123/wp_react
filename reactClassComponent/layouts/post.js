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
import CardHeader from '@material-ui/core/CardMedia';
import CssBaseline from '@material-ui/core/CssBaseline';
import MuiLink from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import renderHTML from 'react-render-html';
import StarIcon from '@material-ui/icons/StarBorder';
import Box from '@material-ui/core/Box';
import Moment from "moment";
import blogStyles from '../home/blogStyles';
import FeaturedImage from "./featuredImage";
import globalTheme from '../theme/blogTheme';
import Badge from "@material-ui/core/Badge";
import {client_url} from '../../config/configuration';

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


class Post extends Component {
  constructor(props) {
      super(props);
      this.state = {

  		};
  }

  componentDidMount() {
      // console.log(this.props.post);
  }

	render() {
    	const { classes } = this.props;
      const { loading, post, error } = this.state;
      return (
        <MuiThemeProvider theme={globalTheme}>

         <CssBaseline />
         {/* Hero unit */}
              <div style={{ display:"inline-blocks",
               background:"#eeeee",
               paddingBottom:"10px",
               width:"90%",
               "box-sizing":"border-box"}}>
                   <Card className={classes.card}>
                         <CardMedia
                           style={{width: "100%",'min-height': "200px"}}
                           className={classes.cardMedia}
                           image={ (this.props.post.attachment_image.img_sizes) ? this.props.post.attachment_image.img_src[0] : 'https://images.pexels.com/photos/714918/pexels-photo-714918.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940' }
                           title="Image title"
                           src={client_url+'/blog/post/'+this.props.post.id}
                         />
                         <CardContent className={classes.cardContent}>

                         {/*	Categories*/}
                         { this.props.post.categories.length ?
                               this.props.post.categories.map((category, index) => {
                                 return (
                                   // If its not the last item.
                                   index !== ( this.props.post.categories.length - 1 ) ?
                                     <Badge
                                       classes={{badge:classes.customBadge}}
                                       className={classes.margin}
                                       badgeContent={category.name}
                                     />
                                     :
                                     <Badge
                                       classes={{badge:classes.customBadge}}
                                       className={classes.margin}
                                       badgeContent={category.name}
                                     />
                                 );
                               } )
                          : '' }

                           <Typography variant="h6" className={classes.postTitle}>
                               <Link to={'/blog/post/'+this.props.post.id}  style={{ textDecoration: 'none' }}>
                                    {(this.props.post.title) ? <Link to={`/blog/post/${this.props.post.id}`}> {renderHTML(this.props.post.title)}</Link> : '' }
                               </Link>
                           </Typography>
                           <Typography variant="subtitle2" className={classes.postMeta}>By &nbsp;
                             <Link to={`/author/${ this.props.post.meta.author_id }`} style={{ textDecoration: 'none' }}>
                               { this.props.post.meta.author_name }
                             </Link> - { this.props.post.date }
                           </Typography>
                           <Typography>
                              { (this.props.post.title) ? <Typography variant="subtitle1"> {renderHTML(this.props.post.excerpt)}</Typography> : '' }
                           </Typography>
                         </CardContent>
                         <CardActions style={{padding:"0 8px 8px 12px"}}>
                           <Button size="small" color="primary">
                             <Link to={'/blog/post/'+this.props.post.id}  style={{ textDecoration: 'none',fontSize: "larger",fontWeight: "bold" }}>
                                   Read More ...
                             </Link>
                           </Button>
                         </CardActions>
                   </Card>


         </div>
         {/* End hero unit */}

        </MuiThemeProvider>
      );
  }
}

Post.propTypes = {
    classes: PropTypes.object.isRequired
};

export default compose(
    withStyles(blogStyles)
)(withRouter(Post));
