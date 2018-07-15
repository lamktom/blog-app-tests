const express = require("express");
const router = express.Router();

const { BlogPosts } = require("./models");

// convenience function for generating lorem text for blog
// posts we initially add below
function solution() {
	return `Get a pet.`; 
}

// creating a couple of posts for when server loads 
BlogPosts.create('How to feel less lonely', solution(), 'Jessie Lam');
BlogPosts.create('How to live a happier life', solution(), 'Tom Lam'); 

// add endpoint for GET. It should call `BlogPosts.get()`
// and return JSON objects of stored blog posts.
// send back JSON representation of all blog posts
// on GET requests to root
router.get('/', (req, res) => {
	res.json(BlogPosts.get()); 
}); 

// add endpoint for POST requests, which should cause a new
// blog post to be added (using `BlogPosts.create()`). It should
// return a JSON object representing the new post (including
// the id, which `BlogPosts` will create. This endpoint should
// send a 400 error if the post doesn't contain
// `title`, `content`, and `author`
router.post('/', (req, res) => {
	const requiredFields = ['title', 'content', 'author'];
	for (let i=0; i < requiredFields.length; i++) {
		const field = requiredFields[i];
		if(!(field in req.body)); {
			const message = `Missing "${field}" in request body`;
			console.error(message);
			return res.status(400).send(message); 
		}
	}
}); 

// add endpoint for PUT requests to update blogposts. it should
// call `BlogPosts.update()` and return the updated post.
// it should also ensure that the id in the object representing
// the post matches the id of the path variable, and that the
// following required fields are in request body: `id`, `title`,
// `content`, `author`, `publishDate`
router.put('/:id', jsonParser, (req, res) => {
	const requiredFields = ['id','title', 'content', 'author', 'publishDate'];
	for (let i=0; i<requiredFields.length; i++) {
		const field = requiredFields[i]; 
		if (!(field in req.body)) {
			const message = `Missing "${field}" in request body`;
			console.error(message); 
			return res.status(400).send(message); 
		}
	}

	if (req.params.id !== req.body.id) {
		const message = `Request path id "${req.params.id}" and request body id (${req.body.id}) must match`;
		console.error(message); 
		return res.status(400).send(message); 
	}
	console.log(`Updating blog list item "${req.params.id}"`);
	BlogPosts.update({
		id: req.params.id, 
		title: req.body.title,
		content: req.body.content,
		author: req.body.author, 
		publishDate: req.body.publishDate 
	});

	res.status(204).end(); 
});

module.exports = router; 


// add endpoint for DELETE requests. These requests should
// have an id as a URL path variable and call
// `BlogPosts.delete()`
router.delete('/:id', (req, res) => {
	BlogPosts.delete(req.params.id); 
	console.log(`Deleted blog post "${req.params.id}"`);
	res.status(204).end();  
});









