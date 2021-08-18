import API from './API'

const GeneralFunctions = {
  toTitleCase: (str) => {
    if (str !== undefined) {
      str = str.split(" ");

      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }

      return str.join(" ");
    }

    return "Error Item";
  },
  getIcon: (str, returnAsString) => {
    let icon_file = null;
    let filename = "24px-";

    if (str !== undefined) {
      str = str.split(" ");

      for (var i = 0; i < str.length; i++) {
        str[i] = str[i].charAt(0).toUpperCase() + str[i].slice(1);
      }

      str = str.join(" ");
    } else {
      str = "Error Item";
    }

    filename = filename.replace("'", "").replace(",", "");
    filename = filename.includes(" ")
      ? filename.split(" ").join("_")
      : filename;

    try {
      icon_file = require(`../assets/item_icons/${filename}.png`);
      filename = `../assets/item_icons/${filename}`;
    } catch (err) {
      icon_file = require("../assets/item_icons/Error_Item.png");
      filename = "../assets/item_icons/Error_Item.png";
    }

    if (returnAsString) {
      return filename;
    } else {
      return icon_file;
    }
  },
  userAuth: (authToken) => {
    return API.getAuthToken(authToken)
      .then((res) => {
        const user = {
          name: res.data.name,
          username: res.data.username,
          email: res.data.email,
          admin: res.data.admin,
          isLoggedIn: true,
        };

        return user;
      })
      .catch((err) => {
        console.log(err);
        localStorage.removeItem("svgifting-token");
        
        return {
          name: "",
          username: "",
          email: "",
          admin: false,
          isLoggedIn: false
        };
      });
  },
};

export default GeneralFunctions;
