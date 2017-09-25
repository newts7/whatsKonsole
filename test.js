$.ajax({
    type: 'POST',
    url: 'http://localhost:8080/user',
    data: JSON.stringify({"UserId":"fsfsf","GroupId":"ddgdr"}), // or JSON.stringify ({name: 'jonas'}),
    success: function(data) {console.log(data); },
    contentType: "application/json; charset=utf-8",
    dataType: 'json'
});