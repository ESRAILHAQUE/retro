let posts; // Define the posts array in the global scope

const loadPosts = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/posts"
    );
    const data = await res.json();
    posts = data.posts;
    console.log(posts);

    postContainer = document.getElementById("post-section");
    posts.forEach((post) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="bg-[#f3f3f5]  mb-4 rounded-lg p-6 ">
              <div class="flex gap-2 relative"><img class="w-10 h-12 rounded-lg bg-cover" src="${
                post.image
              }" alt="" 
       style="background-color: ${post.isActive === true ? "green" : "red"}" />
  ${
    post.isActive === true
      ? '<span class="indicator active"></span>'
      : '<span class="indicator inactive"></span>'
  }
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
                    <p><i class="fa-regular fa-comment-dots"></i> <span>${
                      post.comment_count
                    }</span></p>
                    <p><i class="fa-regular fa-eye"></i> <span>${
                      post.view_count
                    }</span></p>
                    <p><i class="fa-regular fa-clock"></i> <span>${
                      post.posted_time
                    } min </span></p>
                  </div>
                  <div class="bg-[#10b981] flex justify-end rounded-full p-0.5"><p class="w-6 text-center h-6" onclick="addItem(${posts.indexOf(
                    post
                  )})"><i class="fa-regular fa-envelope-open  text-white"></i></p></div>
                </div>
            </div>`;
      postContainer.appendChild(div);
      console.log(post.isActive);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
function addItem(index) {
  const clickedPost = posts[index];
  const totalRead = document.getElementById("totalRead");

  let totalReadValue = parseInt(totalRead.innerText);
  totalReadValue++;
  totalRead.innerText = totalReadValue;

  console.log("Clicked post:", clickedPost);

  // Create a new list item element
  const li = document.createElement("li");
  li.classList.add(
    "flex",
    "justify-between",
    "gap-3",
    "bg-white",
    "rounded-lg",
    "p-2"
  );

  
  const titleElement = document.createElement("h2");
  titleElement.classList.add("text-xl", "font-bold");
  titleElement.innerText = clickedPost.title;

  const viewCountElement = document.createElement("span");
  viewCountElement.innerHTML = `
    <i class="fa-regular fa-eye"></i>
    <span>${clickedPost.view_count}</span>
  `;


  li.appendChild(titleElement);
  li.appendChild(viewCountElement);

  const listMenu = document.getElementById("listMenu");
  listMenu.appendChild(li);
}

loadPosts();

const spinner = document.getElementById("spinner");
function hideSpinner() {
  spinner.classList.remove("hidden");
  setTimeout(() => {
    spinner.classList.add("hidden");
  }, 2000); 
}

function searchBtn() {
  hideSpinner();
}




const latestPost = async () => {
  try {
    const res = await fetch(
      "https://openapi.programming-hero.com/api/retro-forum/latest-posts"
    );
    const data = await res.json();
    console.log(data);
    latestPostContainer = document.getElementById("latestPostContainer");
    data.forEach((latestPost) => {
      const div = document.createElement("div");
      div.innerHTML = `<div class="card  bg-base-100 h-full shadow-xl">
            <figure class="px-10 pt-10">
              <img
                src="${latestPost.cover_image}"
                alt="Shoes"
                class="rounded-xl"
              />
            </figure>
            <div class="card-body ">
              <p><i class="fa-solid fa-calendar-days"></i> <span>${
                latestPost.author.posted_date
                  ? latestPost.author.posted_date
                  : " No publish date"
              }</span></p>
              <h2 class="card-title">${latestPost.title}!</h2>
              <p>${latestPost.description}</p>
              <div class="flex gap-4">
                <img src="${
                  latestPost.profile_image
                }" alt="" class="w-10 h-10 rounded-full">
                <div>
                  <h2>${latestPost.author.name}</h2>
                  <p>${
                    latestPost.author.designation
                      ? latestPost.author.designation
                      : "unknown"
                  }</p>

                </div>
              </div>
              
            </div>
          </div>`;
      latestPostContainer.appendChild(div);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};
latestPost();
