# To-Do Backend
  1. DATABASE: We’re using Docker Compose to run our local database, expecting to use this database for development, not as a live production data source. If we use this database for testing, the test that we’ll run here will impact the local database by leaving a new set of test data behind every time we run them. This shouldn’t be an issue in most cases, but I just wanted to implement what's done in the ideal world.

 2. The GET todos endpoint controller has been refactored to accept a  query parameter that will be used for pagination to load more todos has the use scrolls on the web page. 
    
 3. The POST todos endpoint controller now takes due_date from the request body to and saves it along with the todo.

 4. # Testing:
  For the testing, supertest was used for the integration test, and chai was used for the assertions. For test coverage istanbujs was used.

# To-Do Frontend
  1. The Todo application has been refactored into multiple component, and a reuseable hookks has also used for management todos.

  2. More test was supposed to be written to to test the interaction of the createTodo form and the  TodoList component, to ensure proper functionality, but I was unable to due to deliberable I need to deliver in current job.

Thanks 🙏 for this oppourtunity.

