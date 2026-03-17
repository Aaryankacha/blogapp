app.factory('blogService', function() {
    const initialDummyData = [
        {
            id: 1,
            title: "The Future of Minimalist UI Design",
            authorName: "Alex Morgan",
            authorId: null,
            date: new Date('2024-03-10').toISOString(),
            category: "Design",
            coverImage: "https://images.unsplash.com/photo-1541462608143-67571c6738dd?q=80&w=2670&auto=format&fit=crop",
            content: "Minimalism in UI design is not just a trend; it's a fundamental shift in how we approach digital interfaces. By stripping away non-essential elements, glassmorphism and neat layouts emphasize content over chrome. \n\nThe core principles involve massive empty spaces, bold typography, and a purposeful use of color to guide user actions. We are moving towards deeper empathy for user stress levels by generating interfaces that feel 'breathable'. Exploring the depths of dark mode coupled with high-contrast pastel accents (like Electric Purple or Cyber Yellow) pushes minimalist layouts into high-fidelity experiences."
        },
        {
            id: 2,
            title: "Embracing Vanilla JS in a Framework World",
            authorName: "Sam Dev",
            authorId: null,
            date: new Date('2024-03-12').toISOString(),
            category: "Development",
            coverImage: "https://images.unsplash.com/photo-1555099962-4199c345e5dd?q=80&w=2670&auto=format&fit=crop",
            content: "While React, Vue, and Angular dominate the front-end landscape, there is a serene beauty in writing vanilla JavaScript. It forces you to understand the DOM deeply, optimizing directly without overhead. \n\nModern browser APIs have matured incredibly. You don't necessarily always need a Virtual DOM to build a fast single-page app. Using simple Event Listeners, State Objects, and Template Literals can yield massive performance gains for lightweight applications. Let's rediscover the roots of web development."
        },
        {
            id: 3,
            title: "Coffee and Code: A Workflow",
            authorName: "Jordan Lee",
            authorId: null,
            date: new Date('2024-03-15').toISOString(),
            category: "Lifestyle",
            coverImage: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=2672&auto=format&fit=crop",
            content: "Finding the perfect rhythm between caffeine intake and productive coding blocks is somewhat of an art form. The Pomodoro technique mixed with a high-quality Ethiopian blend has radically altered my productivity graph. \n\nInstead of burning out by 3 PM, taking structured breaks to step away from the screen and reset your visual cortex makes all the difference. This post unpacks my daily schedule and how incorporating deep work sessions is amplified by the right environment."
        }
    ];

    return {
        getPosts: function() {
            let storedPosts = localStorage.getItem('lumina_posts');
            if (storedPosts) {
                return JSON.parse(storedPosts);
            } else {
                this.savePosts(initialDummyData);
                return initialDummyData;
            }
        },
        getPost: function(id) {
            let posts = this.getPosts();
            return posts.find(p => p.id == id);
        },
        savePosts: function(posts) {
            localStorage.setItem('lumina_posts', JSON.stringify(posts));
        },
        addPost: function(post) {
            let posts = this.getPosts();
            posts.unshift(post);
            this.savePosts(posts);
        },
        deletePost: function(id) {
            let posts = this.getPosts();
            posts = posts.filter(p => p.id !== id);
            this.savePosts(posts);
        }
    };
});
