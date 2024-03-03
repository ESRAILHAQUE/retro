const api = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    const posts = data.posts;
    console.log(posts);

    postContainer = document.getElementById("post-section");
    posts.forEach((post) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="bg-[#f3f3f5] my-4 rounded-lg p-6 ">
              <div class="flex gap-2"> <img class="w-10 h-12 rounded-lg bg-cover" src="${post.image}" alt="" />
              <div class="space-x-3">
                <div class="flex gap-8">
                  <p>#<span>${post.category}</span></p>
                  <p>Author: <span>${post.author.name}</span></p>
                </div>
                <h3 class="text-xl font-bold">
                  ${post.title}
                </h3>
                <p class="border-b-2 border-dashed pb-4">
                   ${post.description}
                </p>
              
              </div>
              </div>
                <div class="flex px-4 ml-8 justify-between my-5">
                  <div class="flex gap-6">
                    <p><i class="fa-regular fa-comment-dots"></i> <span>${post.comment_count}</span></p>
                    <p><i class="fa-regular fa-eye"></i> <span>${post.view_count}</span></p>
                    <p><i class="fa-regular fa-clock"></i> <span>${post.posted_time} min </span></p>
                  </div>
                  <div class="bg-[#10b981] flex justify-end rounded-full p-0.5"><p class="w-6 text-center h-6"><i class="fa-regular fa-envelope-open  text-white"></i></p></div>
                </div>
            </div>`;
      postContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

api();
