export function textColor(
  bgColor = "#6d28d9",
  background = false,
  opacity = 1,
  lightColor = "#f8fafc",
  darkColor = "#0f172a"
) {
  if (!bgColor) bgColor = "#6d28d9";

  if (!bgColor.includes("rgb")) bgColor = hexToRgbA(bgColor, opacity);
  if (!lightColor.includes("rgb")) lightColor = hexToRgbA(lightColor);
  if (!darkColor.includes("rgb")) darkColor = hexToRgbA(darkColor);

  let textColor = textColorFromRGB(bgColor);

  return textColor == "dark"
    ? {
        style: {
          color: darkColor,
          "background-color": background ? bgColor : "",
        },
      }
    : {
        style: {
          color: lightColor,
          "background-color": background ? bgColor : "",
        },
      };
}

function textColorFromRGB(bgColor) {
  const rgbaPattern = /rgba\((\d{1,3}),(\d{1,3}),(\d{1,3}),([01](\.\d+)?)\)/;
  const rgbaValues = bgColor.match(rgbaPattern);

  var r = rgbaValues[1];
  var g = rgbaValues[2];
  var b = rgbaValues[3];
  var yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? "dark" : "light";
}

export function hexToRgbA(hex, opacity = 1) {
  var c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split("");
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = "0x" + c.join("");
    return `rgba(${[(c >> 16) & 255, (c >> 8) & 255, c & 255].join(
      ","
    )},${opacity})`;
  }
  throw new Error("Bad Hex");
}
