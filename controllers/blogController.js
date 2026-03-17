app.controller('BlogController', ['$scope', '$routeParams', '$location', '$timeout', 'blogService', 'authService', function($scope, $routeParams, $location, $timeout, blogService, authService) {
    
    $scope.searchQuery = '';
    $scope.showSuccessMsg = false;
    $scope.posts = blogService.getPosts();
    
    // Check if we are in the viewer route
    if ($routeParams.id) {
        $scope.currentPost = blogService.getPost($routeParams.id);
    }

    $scope.viewPost = function(post) {
        $location.path('/viewer/' + post.id);
    };

    $scope.isPostOwner = function(authorId) {
        const user = authService.getCurrentUser();
        return user && user.id === authorId;
    };

    // Creator State
    $scope.newPost = {
        title: '',
        category: '',
        coverImage: '',
        content: ''
    };

    $scope.addPost = function(isValid) {
        if (!isValid) return;

        const user = authService.getCurrentUser();

        const postEntry = {
            id: Date.now(),
            title: $scope.newPost.title,
            authorName: user.name,
            authorId: user.id,
            category: $scope.newPost.category,
            coverImage: $scope.newPost.coverImage,
            content: $scope.newPost.content,
            date: new Date().toISOString()
        };

        blogService.addPost(postEntry);
        $scope.posts = blogService.getPosts();
        
        // Show success, reset and navigate
        $scope.showSuccessMsg = true;
        
        $timeout(function() {
            $scope.showSuccessMsg = false;
            $scope.newPost = { title: '', category: '', coverImage: '', content: '' };
            if ($scope.postForm) {
                $scope.postForm.$setPristine();
                $scope.postForm.$setUntouched();
            }
            $location.path('/feed');
        }, 1500);
    };

    $scope.deletePost = function(post) {
        if (confirm('Are you sure you want to delete this story?')) {
            blogService.deletePost(post.id);
            $scope.posts = blogService.getPosts();
        }
    };

}]);
