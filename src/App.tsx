import { useState } from 'react';
import './App.css';

interface IClickedProps{
  pageX: number;
  pageY: number;
}

function App() {

  const [pointColor, setPointColor] = useState('#FF0000');
  const [clickedPoints, setClickedPoints] = useState<IClickedProps[]>([]);
  const [lastClickedPoint, setLastClickedPoint] = useState<IClickedProps[]>([]);

  const handleUndo = () => {
    const newClickedPoints = [...clickedPoints];
    const newLastClickedPoint = [...lastClickedPoint, newClickedPoints.pop()] as IClickedProps[];
    setClickedPoints(newClickedPoints);
    setLastClickedPoint(newLastClickedPoint);
    
  }

  const handleRedo = () => {
    const lastClick = [...clickedPoints, lastClickedPoint.pop()] as IClickedProps[];
    setClickedPoints(lastClick);
  }

  const getCordinates = (e: React.MouseEvent<HTMLElement>) => {
    const {pageX, pageY } = e;
    setClickedPoints([...clickedPoints, {pageX, pageY}]);
    setLastClickedPoint([]);
  }

  const handleColor = (e: any) => setPointColor(e.target.value);

  return (
      <div className="container">
        
        <h1>Click e se divirta</h1>

        <div className="buttons">
          <button disabled={clickedPoints.length === 0} onClick={handleUndo}>desfazer</button>
          <button disabled={lastClickedPoint.length === 0} onClick={handleRedo}>refazer</button>
        </div>

        <input type="color" onChange={handleColor}/>

        <div className="App" onClick={getCordinates}>
          {clickedPoints.map(click => (
            <div 
              key={(click.pageX + click.pageY).toString()}
              style={{
                top: click.pageY, 
                left: click.pageX,
                position: 'absolute',
                width: 50,
                height: 50,
                backgroundColor: pointColor,
                borderRadius: '200px',
                transformOrigin: -200,
                transform: "translate(-50%, -50%)"
              }}
            >
            </div>
          ))}
          
        </div>
      </div>
  )
}

export default App
