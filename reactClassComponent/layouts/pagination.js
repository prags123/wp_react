import React, { Component } from "react";
import {withRouter,Link} from "react-router-dom";
import { createPaginationArray } from "../../utils/functions";

class Pagination extends Component {
	  constructor(props) {
	      super(props);
	      this.state = {
	  			loading : false,
	  			error: '',
					isThereNextPage:this.props.currentPage < this.props.totalPages,
					isTherePreviousPage:this.props.currentPage > 1
	  		};
	  }

	  componentDidMount() {
			const paginationArray = createPaginationArray(this.props.currentPage, this.props.totalPages);

			console.log(paginationArray);
			console.log(" currentPage "+this.props.currentPage+" totalPages "+this.props.totalPages);
		}

		getPageLink = (pageNo) => {
			return `/blog/page/${pageNo}`;
		};

		render() {
				const {classes} = this.props;
				const { loading, posts, error } = this.state;
				return (
						<div>
						{ this.state.isTherePreviousPage && <Link to={ this.getPageLink(this.props.currentPage - 1) } onClick={ () => this.props.onPageChange(this.props.currentPage - 1)}>Previous</Link> }
						{ this.state.isThereNextPage && <Link to={ this.getPageLink(this.props.currentPage + 1) } onClick={ () => this.props.onPageChange(this.props.currentPage + 1)}>Next</Link> }
						</div>
				)
	}
};

export default (withRouter(Pagination));
