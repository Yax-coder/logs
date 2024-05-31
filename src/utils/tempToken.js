export const getToken = async () => {
  const url = "https://api.ums.flexisafapps-dev.com/oauth2/token";
  const headers = {
    accept: "*/*",
    "Content-Type": "application/x-www-form-urlencoded",
  };
  const formData = new URLSearchParams();
  formData.append("grant_type", "client_credentials");
  formData.append("client_id", "safrecords_client");
  formData.append("client_secret", "secret");

  try {
    let res = await fetch(url, {
      method: "POST",
      headers: headers,
      body: formData.toString(),
    });
    let data = await res.json();
    return data.access_token;
  } catch (error) {
    console.log(error);
  }
};
