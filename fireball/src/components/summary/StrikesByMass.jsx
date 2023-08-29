import { useDataContext } from "../../hooks/useDataContext";
import { useEffect } from "react";
const StrikesByMass = function () {
    const meteorData = useDataContext().data;

    useEffect(() => {
        let largestArray = []
        let smallestArray = []
        console.log('meteorData', meteorData)
        meteorData.forEach((meteor) => {
            if (meteor['mass (g)'] > 500000) {
                largestArray.push(meteor['mass (g)'])
            }

            if (meteor['mass (g)'] < .1 && meteor['mass (g)'] && meteor['mass (g)'] != "0") {
                smallestArray.push(meteor['mass (g)'])
            }


        })
        function sort(a, b) {
            return a - b
        }

        largestArray.sort(function sort(a, b) {
            return b - a
        })

        console.log(largestArray)
        console.log('smallest', smallestArray)

        let topTen = largestArray.slice(0, 10)
        console.log('topTen', topTen)

    }, [])


    return (
        <div>
            <h1>Strikes By Mass</h1>
        </div>
    )
}

export default StrikesByMass