import { useDataContext } from "../../hooks/useDataContext";
import { useEffect } from "react";
const StrikesByMass = function () {
    const meteorData = useDataContext().data;

    useEffect(() => {

        console.log('meteorData', meteorData)

        function sort(a, b) {
            return a - b
        }

    }, [])

    let largestArray = []
    let smallestArray = []
    meteorData.forEach((meteor) => {
        if (meteor['mass (g)'] > 500000) {
            largestArray.push(meteor['mass (g)'])
        }

        if (meteor['mass (g)'] < .1 && meteor['mass (g)'] && meteor['mass (g)'] != "0") {
            smallestArray.push(meteor['mass (g)'])
        }


    })

    largestArray.sort(function sort(a, b) {
        return b - a
    })
    console.log(largestArray)
    console.log('smallest', smallestArray)

    let topTen = largestArray.slice(0, 10)
    console.log('topTen', topTen)

    const topTenList = topTen.map((meteor, index) => {
        return <p key={index}>{meteor} grams</p>

    })

    smallestArray.sort(function (a, b) {
        return a - b
    })

    let smallestArraySlice = smallestArray.slice(0, 10)
    const bottomTenList = smallestArraySlice.map((meteor, index) => {
        return <p key={index}>{meteor} grams</p>
    })

    return (
        <div>
            <h1>Largest Meteors</h1>
            {topTenList}
            <h1>Smallest Meteors</h1>
            {bottomTenList}
        </div>
    )
}

export default StrikesByMass