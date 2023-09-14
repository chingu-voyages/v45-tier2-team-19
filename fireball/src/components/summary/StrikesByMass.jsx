import { useDataContext } from "../../hooks/useDataContext";
import { useEffect, useState } from "react";
import './StrikesByMass.css'
const StrikesByMass = function () {
  const meteorData = useDataContext().data;

  const [meteorState, setMeteorState] = useState(meteorData)

  useEffect(() => {
    setMeteorState(meteorData)
  }, [meteorData])


  let descendingMeteorData = meteorState.sort(function sort(a, b) {
    return b['mass (g)'] - a['mass (g)']

  }

  )
  let ascendingMeteorData = descendingMeteorData.reverse()


  let topTen = descendingMeteorData.slice(0, 10)
  let bottomTen = ascendingMeteorData.slice(0, 10)
  console.log('top and bottom', topTen, bottomTen)

  const topTenList = topTen.map((meteor, index) => {
    return (
      <div className='meteorContainer' key={index}>
        <p className='meteorName' ><em>Name: </em>{meteor.name}</p> - <p className='meteorMass'><em>Mass: </em>{meteor['mass (g)']}</p>

      </div>)


  })

  const bottomTenList = bottomTen.map((meteor, index) => {
    return (
      <div className='meteorContainer' key={index}>
        <p className='meteorName' ><em>Name: </em>{meteor.name}</p> - <p className='meteorMass'><em>Mass: </em>{meteor['mass (g)']}</p>

      </div>)


  })





  return (
    <div className='mass-container  '>
      <div className="data-text largest-smallest">

        <div className='dataBox'>
          <h1>Top Ten</h1>
          {topTenList}

        </div>

        <div className='dataBox'>
          <h1>Bottom Ten</h1>
          {bottomTenList}

        </div>
      </div>
    </div>
  )
}

export default StrikesByMass;