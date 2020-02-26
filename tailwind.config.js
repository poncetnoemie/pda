module.exports = {
  theme: {
    extend: {
      colors: {
        red: {
          full: "rgba(220,41,41,1)",
          dark: "rgba(220,41,41, .95)",
          default: "rgba(220,41,41, .85)",
          light: "rgba(220,41,41, .75)"
        },
        grey: {
          dark: "rgba(34,34,34,.85)",
          default: "#999",
          light: "#ccc",
          lighter: "#eee",
          lightest: "#f3f3f3"
        },
        black: {
          default: "rgba(0,0,0,1)",
          "75": "rgba(0,0,0,.75)",
          "50": "rgba(0,0,0,.50)",
          "25": "rgba(0,0,0,.25)"
        },
        blue: {
          dark: "rgba(42, 130, 147,1)",
          default: "rgba(111,203,220,.85)"
        },
        green: {
          full: "rgba(106,185,43,1)",
          default: "rgba(106,185,43,.85)"
        },
        yellow: {
          full: "rgba(244,233,50,1)",
          default: "rgba(244,233,50,.85)"
        },
        white: {
          default: "rgba(255,255,255,1)",
          "75": "rgba(255,255,255,.75)",
          "50": "rgba(255,255,255,.50)",
          "25": "rgba(255,255,255,.25)"
        }
      },
      borderWidth: {
        "3": "3px",
        "5": "5px"
      },
      height: {
        "28": "8rem",
        player: "375px",
        "player-sm": "200px",
        "screen-20": "20vh",
        "screen-40": "40vh",
        "screen-60": "60vh",
        "screen-80": "80vh"
      },
      inset: {
        "1/2": "50%"
      },
      margin: {
        "screen-10": "10vw",
        "h-header": "76px"
      },
      maxHeight: theme => ({
        auto: "auto",
        md: "20rem",
        75: "75%",
        ...theme("spacing")
      }),
      maxWidth: theme => ({
        auto: "auto",
        "screen-80": "80vw",
        ...theme("spacing")
      }),
      minWidth: theme => ({
        auto: "auto",
        ...theme("spacing")
      }),
      opacity: {
        "85": ".85"
      }
    }
  },
  variants: {
    fontWeight: ["responsive", "first", "hover", "focus"],
    margin: ["responsive", "last", "hover", "focus"],
    opacity: ["responsive", "first", "hover", "focus", "group-hover"]
  },
  plugins: []
};
