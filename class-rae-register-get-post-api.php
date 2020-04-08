<?php
/**
 * Register Get Posts Api
 *
 * @package REST API ENDPOINTS
 */

class Rae_Register_Get_Post_Api {

	/**
	 * Constructor
	 */
	public function __construct() {
		$this->post_type     = 'post';
		$this->route         = '/post';

		add_action( 'rest_api_init', [ $this, 'rest_posts_endpoints' ] );
	}

	/**
	 * Register posts endpoints.
	 */
	public function rest_posts_endpoints() {

		/**
		 * Handle Posts Request: GET Request
		 * Example: http://example.com/wp-json/rae/v1/post?post_id=1
		 */
		register_rest_route(
			'rae/v1',
			$this->route,
			[
				'method'   => 'POST',
				'callback' => [ $this, 'rest_endpoint_handler' ],
			]
		);
	}

	public function rest_endpoint_handler(WP_REST_Request $request) {
		$response      = [];
		$parameters    = $request->get_params();
		$posts_post_no = ! empty( $parameters['post_id'] ) ? intval( sanitize_text_field( $parameters['post_id'] ) ) : '';

		// Error Handling.
		$error = new WP_Error();

		$post_data = $this->get_post( $posts_post_no );

		// If posts found.
		if ( ! empty( $post_data['post_data'] ) ) {

			$response['status']      = 200;
			$response['post_data']  = $post_data['post_data'];
			$response['found_post'] = $post_data['found_post'];

		} else {

			// If the posts not found.
			$error->add( 406, __( 'Posts not found', 'rest-api-endpoints' ) );

			return $error;

		}

		return new WP_REST_Response( $response );

	}


/**
	 * Get posts data.
	 *
	 * @param integer $page_no page no.
	 *
	 * @return array Posts.
	 */
	public function get_post($post_no) {

		$args = [
			'post_type'              => $this->post_type,
			'post_status'            => 'publish',
			'fields'                 => 'ids',
			'orderby'                => 'date',
			'postno'                  => $post_no,
			'update_post_meta_cache' => false,
			'update_post_term_cache' => false,

		];

		$latest_post_id = new WP_Query($args);

		$post_result = $this->get_required_post_data( $latest_post_id->posts );
		$found_post = $latest_post_id->found_post;
		

		return [
			'posts_data'  => $post_result,
			'found_post' => $found_post

		];
	}

        public function get_required_post_data($post_ID) {

		$post_result = [];

		if (empty( $post_ID ) && ! is_array($post_ID)) {
			return $post_result;
		}

		

		$author_id     = get_post_field( 'post_author', $post_ID );
		$attachment_id = get_post_thumbnail_id( $post_ID );

		$post_data                     = [];
		$post_data['id']               = $post_ID;
		$post_data['title']            = get_the_title( $post_ID );
		$post_data['excerpt']          = get_the_excerpt( $post_ID );
		$post_data['date']             = get_the_date( '', $post_ID );
		$post_data['attachment_image'] = [
			'img_sizes'  => wp_get_attachment_image_sizes( $attachment_id ),
			'img_src'    => wp_get_attachment_image_src( $attachment_id, 'full' ),
			'img_srcset' => wp_get_attachment_image_srcset( $attachment_id ),
		];
		$post_data['categories']       = get_the_category( $post_ID );
		$post_data['meta']             = [
			'author_id'   => $author_id,
			'author_name' => get_the_author_meta( 'display_name', $author_id )
		];

		array_push( $post_result, $post_data );

		
		return $post_result;
	}
}

new Rae_Register_Get_Post_Api();
