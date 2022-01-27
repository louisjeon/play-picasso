import styled from "@emotion/styled";
import {
  ChangeEvent,
  MouseEvent,
  TouchEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { axiosInstance } from "../config";

import { useColors } from "../hooks/useColors";
import { useFeelings } from "../hooks/useFeelings";

const Draw: React.FC = () => {
  const feelings = useFeelings();
  const colors = useColors();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [ctx, setCtx] = useState<CanvasRenderingContext2D>();
  const [feeling, setFeeling] = useState("happy");
  const [eraseOn, setEraseOn] = useState(false);
  const [brushColor, setBrushColor] = useState("#2c2c2c");
  const [brushWidth, setBrushWidth] = useState(2.5);
  const [mouseDown, setMouseDown] = useState(false);
  const [touchStart, setTouchStart] = useState(false);
  const [desc, setDesc] = useState("");

  useEffect(() => {
    if (canvasRef.current) {
      setCtx(canvasRef.current.getContext("2d")!);
      canvasRef.current.height = canvasRef.current.clientHeight;
      canvasRef.current.width = canvasRef.current.clientWidth;
      if (ctx) {
        ctx.fillStyle = "white";
        ctx.fillRect(0, 0, canvasRef.current.height, canvasRef.current.width);
        ctx.strokeStyle = "#2c2c2c";
        ctx.lineWidth = 2.5;
      }
    }
  }, [ctx]);

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFeeling(e.currentTarget.value);
  };

  // Mouse Devices
  const handleMouseDown = () => {
    setMouseDown(true);
  };

  const handleMouseMove = (e: MouseEvent) => {
    const x = e.nativeEvent.offsetX;
    const y = e.nativeEvent.offsetY;
    if (!mouseDown) {
      ctx?.beginPath();
      ctx?.moveTo(x, y);
    } else {
      if (eraseOn) {
        ctx?.fillRect(x, y, brushWidth * 8, brushWidth * 8);
      } else {
        ctx?.lineTo(x, y);
        ctx?.stroke();
      }
    }
  };

  const handleMouseUp = () => {
    setMouseDown(false);
  };

  // Touch Devices
  const handleTouchStart = () => {
    setTouchStart(true);
  };

  const handleTouchMove = (e: TouchEvent<HTMLCanvasElement>) => {
    const x = e.touches[0].clientX - e.currentTarget.offsetLeft;
    const y = e.touches[0].clientY - e.currentTarget.offsetTop;
    if (touchStart) {
      ctx?.beginPath();
      ctx?.moveTo(x, y);
      setTouchStart(false);
    } else {
      if (eraseOn) {
        ctx?.fillRect(x, y, brushWidth * 8, brushWidth * 8);
      } else {
        ctx?.lineTo(x, y);
        ctx?.stroke();
      }
    }
  };

  // Post
  const handlePost = async () => {
    let img = "";
    if (canvasRef.current) {
      // convert current drawing to URL
      img = canvasRef.current.toDataURL("image/png");
    }

    const newPost = {
      username: "demoUser",
      userId: "demoID",
      desc,
      img,
      feeling,
    };

    try {
      await axiosInstance.post("/posts", newPost);
      window.alert("Post has been successfully created.");
      window.location.replace("/feed");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <DrawContainer>
      <div className="top">
        <p>I'm {feeling}.</p>
        <select
          onChange={handleChange}
          defaultValue="happy"
          name="emoji"
          id="emoji"
        >
          {Object.entries(feelings).map(([text, emoji], index) => (
            <option key={index} value={text}>
              {emoji}
            </option>
          ))}
        </select>
      </div>
      <canvas
        id="drawing_board"
        ref={canvasRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
      ></canvas>
      <div id="controls">
        <div id="controls__colors">
          {colors.map((color, index) => (
            <div
              key={index}
              className="controls__color"
              style={{
                backgroundColor: color,
                borderRadius: "10px",
                border: "3px solid white",
                borderColor: brushColor === color ? color : "crimson",
              }}
              onClick={() => {
                setBrushColor(color);
                if (eraseOn) {
                  setEraseOn(false);
                }
                if (ctx) {
                  ctx.strokeStyle = color;
                }
              }}
            ></div>
          ))}
        </div>
        <div id="controls__range">
          <input
            type="range"
            id="range"
            min="0.1"
            max="5.0"
            value={brushWidth}
            step="0.1"
            onChange={(e) => {
              setBrushWidth(+e.currentTarget.value);
              if (ctx) {
                ctx.lineWidth = +e.currentTarget.value;
              }
            }}
          />
        </div>
        <div id="controls__btns">
          <button
            id="erase"
            style={{
              backgroundColor: eraseOn ? "white" : "inherit",
              color: eraseOn ? "red" : "white",
            }}
            onClick={() => {
              setEraseOn((state) => !state);
            }}
          >
            Erase
          </button>
          <button
            id="clear"
            onClick={() => {
              if (window.confirm("Clear the canvas?") && canvasRef.current) {
                ctx?.fillRect(
                  0,
                  0,
                  canvasRef.current.height,
                  canvasRef.current.width
                );
              }
            }}
          >
            Clear
          </button>
          <button
            id="save"
            onClick={() => {
              if (canvasRef.current) {
                const link = document.createElement("a");
                link.href = canvasRef.current.toDataURL("image/png");
                link.download = "PLAY_PICASSO";
                link.click();
              }
            }}
          >
            Save
          </button>
        </div>
      </div>
      <textarea
        placeholder="Type..."
        onChange={(e) => {
          setDesc(e.currentTarget.value);
        }}
      />
      <button onClick={handlePost}>Post</button>
    </DrawContainer>
  );
};

const DrawContainer = styled.div`
  overflow: hidden;
  font-size: 16px;
  color: black;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  box-shadow: 10px 5px 5px lightgray;
  border: 3px solid red;
  border-radius: 30px;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;

  .top {
    display: flex;
    justify-content: space-evenly;
    background-color: red;
    color: white;
    font-weight: bold;

    p {
      font-size: 22px;
    }

    select {
      width: 54px;
      background-color: transparent;
      font-size: 30px;
    }
  }

  #drawing_board {
    border-top: 3px solid crimson;
    border-bottom: 3px solid red;
    height: 80vw;
    width: 80vw;
    max-width: 50vh;
    max-height: 50vh;
    margin: auto;
  }

  #controls {
    #controls__colors {
      display: flex;
      border-bottom: 3px solid crimson;
      overflow: hidden;
      background-color: red;
      .controls__color {
        width: 50px;
        height: 50px;
      }
    }
    #controls__range {
      display: flex;
      background-color: red;
      #range {
        width: 90%;
        margin: 10px auto;
      }
    }
    #controls__btns {
      background-color: red;
      display: flex;
      justify-content: space-evenly;
      button {
        background-color: transparent;
        border: 3px solid crimson;
        color: white;
        width: 50%;
        border-radius: 10px;
        font-size: 20px;
        font-weight: bold;
      }
    }
  }

  textarea {
    height: 100px;
    padding: 10px;
    border: 3px solid crimson;
    &::placeholder {
      color: gray;
    }
  }

  button {
    background-color: red;
    height: 50px;
    font-size: 24px;
    color: white;
  }
`;

export default Draw;
