/*Exercise 1
Date: 4/15/2020
Use jQuery to do the following things with the https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises API.
1. Create buttons that do each of the tasks below
2. Render the results to the page in html elements.
3. Hide the results from the previous actions
    -Get all posts
    -Get post with id of 10
    -Get the comments from post with id of 12 
    -note: comments are part of a different data model, you'll need to structure your endpoint to ask for all of the comments that belong to post #12
    -Get all the posts from user with id of 2
    -Create a new post and log the id generated for it by the server
    -Replace the post with id of 12 and render the responseJSON
    -Update the title of post with id of 12 and render responseJSON
    -Delete the post with id of 12 and render a success message
    -Display a list of posts.
        -When the user clicks on a post, display all the comments from that post
        -Display a link back to all posts
*/

// $.get('https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises', function(todos){
// 	console.log(todos);
// })

//#1
$('#button1').on('click', function(){
    console.log('click button happened');
    $.ajax({
        url : "https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/posts",
        type: "get",
        success: function(data)
        {
            console.log(data);
            var output = "";
            for(var i = 0; i < data.length; i++){
                output += JSON.stringify(data[i])
            }
            $('#output').text(output);
        },
        error: function (jqXHR, textStatus, errorThrown)
        {
            alert("ERROR");
        }
    });
});



//#2
// $.get('https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/posts/10', function(data){
// 	console.log(data);
// });
$('#button2').on('click', function(){
    $.ajax({
        url: "https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/posts",
        type: 'get',
        success: function(data)
        {
            var output = "";
            for(var i = 0; i < data.length; i++){
                if(data[i].id == 10)
                output += JSON.stringify(data[i])
            }
            $('#output').text(output);
        },
        error: function()
        {
            alert('error');
        }
    });
});

////#3
$('#button3').on('click', function(){
    $.ajax({
        url: "https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/comments",
        type: 'get',
        success: function(data){
            var output = "";
            for(var a= 0; a < data.length; a++){
                if(data[a].id == 12)
                    output += JSON.stringify(data[a])
            }
            $('#output').text(output);
            // post.Id = 15         //post primary key
            // comment.postId = 15  //post foreign key
            // id => comment.Id { not same as postId} // comment primarykey
        },
        error: function()
        {
            alert('error');
        }
    });
});

//#4
$('#button4').on('click', function(){
    $.ajax({
        url:"https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/posts",
        type: 'get',
        success: function(data){
            var output = "";
            for (i = 0; i < data.length; i++){
                if(data[i].id == 2)
                output += JSON.stringify(data[i])
            }
            $('#output').text(output);
        }
    });
});

//#5
$('#button5').on('click', function(){
    $.post('https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/posts', {		
        body: "test 123",
		title: "New Post",
        userId: 1
    }, 
	function(data){
        console.log(data);
        // post id from server
        $('#output').text(data.id);
        //Handle response, which usually contains the updated object including new ID's
    })
});

//#6
$('#button6').on('click', function(){
    $.ajax({
        method: 'PUT',
        url: 'https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/posts/12',
        data: {		
            body: "test 123",
            title: "New Post",
            userID: 1
        },
        complete: function(data){
            if(data.status == 404) // does not exists
                $('#output').text("Error: post 12 does not exist");
            else
                $('#output').text(JSON.stringify(data.responseJSON));
                
            //handle response which usually includes the updated object.
        },
        // error: function(){
        //     $('#output').text("does not exists");
        //     console.log("Error: post 12 does not exist")
        // }
    })
    
});


    

//7
$('#button7').on('click', function(){
    $.ajax({
        method: 'PATCH',
        url: 'https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/posts/12',
        data:{
            title: "title update",  
        },
        complete: function(data){
            if(data.status == 404)
                $('#output').text("Error: post 12 does not exist");
            else{
                $('#output').text(JSON.stringify(data.responseJSON));
                console.log(data.responseJSON);
            }
        },
    })
});

//7b this one works cuz 12 does not exists
$('#button7b').on('click', function(){
    $.ajax({
        method: 'PATCH',
        url: 'https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/posts/10',
        data:{
            title: "title update",  
        },
        complete: function(data){
            if(data.status == 404)
                $('#output').text("Error: post 12 does not exist");
            else{
                $('#output').text(JSON.stringify(data.responseJSON));
                console.log(data.responseJSON);
            }
        },
    })
});

//#8
$('#button8').on('click', function(){
    var newObject = $.ajax({
        method: 'DELETE',
        url: 'https://my-json-server.typicode.com/zachhall/WIN2020_AjaxPromises/posts/12',
        complete: function(data){
            //handle response
            if(data.status == 404)
                $('#output').text("Error: post 12 does not exist");
            else{
                $('#output').text('message has been deleted');
            }
        }
        
    })
});

//#9


