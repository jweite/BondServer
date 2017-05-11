Bond Data Server

- Based on ArticleServer, which is base on the design/impl of https://www.codementor.io/olatundegaruba/nodejs-restful-apis-in-10-minutes-q0sgsfhbd
- Adapted for a different datatypes: bond data
- See that project's readme for design summary
- Data sourced to mongo from my bonds.csv (which is really a tsv), created by querying the BAML db.  It is denormal with latestX fields.
- Data imported with mongoimport to db bonddata, collection bonds

- Postman
	- Use postman to easily interact with the article server.
	- Get all articles:  GET http://localhost:3000/bonds.	(Empty array if there's no data yet.)
	- Post a new Article:	POST to http://localhost:3000/articles
		- Set a request header specifying JSON payload: Content-Type = application/json
		- You'll see the mongo-defined fields (like _id) in the response
	- Get that article by it's mongo-defined _id:  GET http://localhost:3000/articles/<_idValue>
	- Query for bond:
		- http://localhost:3000/articles?query={"ParentSector":"Basic Industry"}

			
			
			
		
		
	
		
		
			
		
		

