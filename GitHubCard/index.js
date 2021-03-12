import axios from "axios";
/*
  STEP 1: using axios, send a GET request to the following URL
    (replacing the placeholder with your Github name):
    https://api.github.com/users/<your name>
*/
axios
  .get("https://api.github.com/users/kennytran275")
  .then((futureData) => {
    console.log("2. here is the future data: ", futureData);
  })
  .catch((err) => {
    console.log(err);
  });
/*
  STEP 2: Inspect and study the data coming back, this is YOUR
    github info! You will need to understand the structure of this
    data in order to use it to build your component function

    Skip to STEP 3.
*/

/*
  STEP 4: Pass the data received from Github into your function,
    and append the returned markup to the DOM as a child of .cards
*/

const entryPoint = document.querySelector(".cards");

axios
  .get("https://api.github.com/users/kennytran275")
  .then((res) => {
    // console.log("RESPONSE: \n \n", res);
    // console.log("res.data: \n \n", res.data);
    const imgURL = res.data.avatar_url;
    const name = res.data.name;
    const username = res.data.login;
    const location = res.data.location;
    const profileLink = res.data.html_url;
    const followers = res.data.followers;
    const following = res.data.following;
    const bio = res.data.bio;

    const card = cardMaker({
      imgURL: imgURL,
      fullName: name,
      username: username,
      location: location,
      profileURL: profileLink,
      followers: followers,
      following: following,
      bio: bio,
    });

    entryPoint.append(card);
    console.log(entryPoint);
  })
  .catch((err) => {
    console.log(err);
  });

/*
  STEP 5: Now that you have your own card getting added to the DOM, either
    follow this link in your browser https://api.github.com/users/<Your github name>/followers,
    manually find some other users' github handles, or use the list found at the
    bottom of the page. Get at least 5 different Github usernames and add them as
    Individual strings to the friendsArray below.

    Using that array, iterate over it, requesting data for each user, creating a new card for each
    user, and adding that card to the DOM.
*/

const followersArray = [
  "tetondan",
  "dustinmyers",
  "justsml",
  "luishrd",
  "bigknell",
];

followersArray.forEach(function (user) {
  axios
    .get(`https://api.github.com/users/${user}`)
    .then((res) => {
      const imgURL = res.data.avatar_url;
      const name = res.data.name;
      const username = res.data.login;
      const location = res.data.location;
      const profileLink = res.data.html_url;
      const followers = res.data.followers;
      const following = res.data.following;
      const bio = res.data.bio;

      const card = cardMaker({
        imgURL: imgURL,
        fullName: name,
        username: username,
        location: location,
        profileURL: profileLink,
        followers: followers,
        following: following,
        bio: bio,
      });

      entryPoint.append(card);
      console.log(entryPoint);
    })
    .catch((err) => {
      console.log(err);
    });
});

/*
  STEP 3: Create a function that accepts a single object as its only argument.
    Using DOM methods and properties, create and return the following markup:

    <div class="card">
      <img src={image url of user} />
      <div class="card-info">
        <h3 class="name">{users name}</h3>
        <p class="username">{users user name}</p>
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

function cardMaker({
  imgURL,
  fullName,
  username,
  location,
  profileURL,
  followers,
  following,
  bio,
}) {
  // instantiating the elements
  const card = document.createElement("div");
  const img = document.createElement("img");
  const cardInfo = document.createElement("div");
  const gitName = document.createElement("h3");
  const login = document.createElement("p");
  const gitLocation = document.createElement("p");
  const profile = document.createElement("p");
  const profileLink = document.createElement("a");
  const gitFollowers = document.createElement("p");
  const gitFollowing = document.createElement("p");
  const gitBio = document.createElement("p");

  // setting class names, attributes and text
  card.classList.add("card");
  img.src = imgURL;
  cardInfo.classList.add("card-info");
  gitName.classList.add("name");
  gitName.textContent = fullName;
  login.classList.add("username");
  login.textContent = username;
  gitLocation.textContent = `Location: ${location}`;
  profile.textContent = `Profile: ${profileURL}`;
  profileLink.href = profileURL;
  gitFollowers.textContent = `Followers: ${followers}`;
  gitFollowing.textContent = `Following: ${following}`;
  gitBio.textContent = `Bio: ${bio}`;

  // creating the hierarchy
  card.appendChild(img);
  card.appendChild(cardInfo);
  cardInfo.appendChild(gitName);
  cardInfo.appendChild(login);
  cardInfo.appendChild(gitLocation);
  cardInfo.appendChild(profile);
  profile.appendChild(profileLink);
  cardInfo.appendChild(gitFollowers);
  cardInfo.appendChild(gitFollowing);
  cardInfo.appendChild(gitBio);

  return card;
}

/*
  List of LS Instructors Github username's:
    tetondan
    dustinmyers
    justsml
    luishrd
    bigknell
*/
