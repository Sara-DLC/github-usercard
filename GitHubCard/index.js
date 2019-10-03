/* Step 1: using axios, send a GET request to the following URL 
           (replacing the palceholder with your Github name):
           https://api.github.com/users/sara-dlc>
*/

/* Step 2: Inspect and study the data coming back, this is YOUR 
   github info! You will need to understand the structure of this 
   data in order to use it to build your component function 

   Skip to Step 3.
*/

/* Step 4: Pass the data received from Github into your function, 
           create a new component and add it to the DOM as a child of .cards
*/

/* Step 5: Now that you have your own card getting added to the DOM, either 
          follow this link in your browser https://api.github.com/users/<Your github name>/followers 
          , manually find some other users' github handles, or use the list found 
          at the bottom of the page. Get at least 5 different Github usernames and add them as
          Individual strings to the friendsArray below.
          
          Using that array, iterate over it, requesting data for each user, creating a new card for each
          user, and adding that card to the DOM.
*/

/* Step 3: Create a function that accepts a single object as its only argument,
          Using DOM methods and properties, create a component that will return the following DOM element:

<div class="card">
  <img src={image url of user} />
  <div class="card-info">
    <h3 class="name">{users name}</h3>
    <p class="username">User name: {users user name}</p>
    <p>Location: {users location}</p>
    <p>Profile:  
      <a href={address to users github page}>{address to users github page}</a>
    </p>
    <p>Followers: {users followers count}</p>
    <p>Following: {users following count}</p>
    <p>Bio: {users bio}</p>
  </div>
</div>

*/
const allData = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/sara-dlc")

  .then(response => {
    console.log(response);
    const newData = newCard(response.data);
    allData.appendChild(newData);
  })
  .catch(error => {
    console.log("Could not fetch GitHub Data", error);
  });

function newCard(obj) {
  //create elements
  const card = document.createElement("div");
  const calendar = document.createElement("div");
  const img = document.createElement("img");
  const cardInfo = document.createElement("div");
  const name = document.createElement("h3");
  const userName = document.createElement("p");
  const location = document.createElement("p");
  const gitHandle = document.createElement("a");
  const profile = document.createElement("p");
  const followers = document.createElement("p");
  const following = document.createElement("p");
  const bio = document.createElement("p");

  //assigning to children to elements
  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(name);
  cardInfo.appendChild(userName);
  cardInfo.appendChild(location);
  cardInfo.appendChild(profile);
  cardInfo.appendChild(followers);
  cardInfo.appendChild(following);
  cardInfo.appendChild(bio);
  profile.appendChild(gitHandle);
  card.appendChild(calendar);

  //assigning classes
  card.classList.add("card");
  cardInfo.classList.add("card-info");
  name.classList.add("name");
  userName.classList.add("username");
  calendar.classList.add("calendar");

  //set content
  img.src = obj.avatar_url;
  name.textContent = obj.name;
  userName.textContent = `Username: ${obj.login}`;
  location.textContent = `Location: ${obj.location}`;
  profile.textContent = `Profile: ${obj.html_url}`;
  gitHandle.href = obj.url;
  gitHandle.textContent = obj.html_url;
  followers.textContent = `Followers: ${obj.followers}`;
  following.textContent = `Following: ${obj.following}`;
  bio.textContent = obj.bio;

  return card;
}

let followersArray = [];
followersArray = [
  "briworkman",
  "easyas123l1",
  "Joshua-Edgerton",
  "jregner20",
  "primelos"
];

followersArray.forEach(follower =>
  axios
    .get(`https://api.github.com/users/${follower}`)
    .then(response => {
      allData.appendChild(newCard(response.data));
    })
    .catch(error => console.log("Could not fetch GitHub Data", error))
);
