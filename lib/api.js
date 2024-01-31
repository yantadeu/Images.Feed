const API_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJhZG1pbiIsImp0aSI6ImUyNTU0NWY3LTEyNzUtNDg1Ni1hZjNkLWI5M2ZhMjc1MTY5ZCIsIk5hbWUiOiJBZG1pbiIsIlVzZXJJZCI6ImUyNTU0NWY3LTEyNzUtNDg1Ni1hZjNkLWI5M2ZhMjc1MTY5ZCIsImh0dHA6Ly9zY2hlbWFzLm1pY3Jvc29mdC5jb20vd3MvMjAwOC8wNi9pZGVudGl0eS9jbGFpbXMvcm9sZSI6IkFkbWluaXN0cmF0b3IiLCJleHAiOjE3NjY3MTMyMDksImlzcyI6InVwaWsiLCJhdWQiOiJodHRwOi8vbG9jYWxob3N0OjgwODAifQ.Qs9f-Tn68Sywr7hL2RKwoBt2AfPn1JWSGYLR_t3TEmU";

export const getImages = async () => {
  const res = await fetch(
    `http://localhost:8080/api/v1/Images`,
    {
      headers: {
        Authorization: "Bearer " + API_KEY,
      },
    }
  );
  const responseJson = await res.json();
  for (const data of responseJson) {
      const likes = await getLikesCount(data.id)
      data.likes = likes.count
  }
  return responseJson;
};

export const likeImage = (imageId, liked) => {
  fetch(
      `http://localhost:3000/likes`,
      {
          headers: {
              Authorization: API_KEY,
              Accept: 'application/json',
              'Content-Type': 'application/json',
          },
          method: 'POST',
          body: JSON.stringify({
              imageId: imageId,
               liked: liked
          })
      }
  ).then(r => console.log(r));
};

export const getLikesCount = async (imageId) => {
  const url = `http://localhost:3000/likes/counts/${imageId}`
  const res = await fetch(
      url,
    {
      headers: {
        Authorization: API_KEY,
      },
    }
  );
  const responseJson = await res.json();
  return responseJson;
};
