export function kmeans(data, k, maxIterations) {
  // initialize k centroids
  let centroids = [
    [34.95, -100.25], //NA
    [-10.11667, -39.2], //latam
    [81.16667, -49], // greenland
    [-80.28555, -81.81348],
    [-76.82225, 158.183],
    [30.28306, 3.62],
    [7.95, 8.08333], // africa equator
    [22.01833, 26.08778], //africa middle
    [-19.58333, 17.91667], // south africa
    [19.18222, 56.43056], // arabia
    [41.76611, -8.58361], // spain/portugal
    [48.48333, 3.58333], // west europe
    [19.25, 77], // india
    [57.78333, 55.26667],
    [47, 88], // russia/ouzbe
    [24.2, 113.4], //china
    [46.16, 134.65333], // japan
    [66.8, 178.2], // extreme siberia
    [-30.78333, 127.55], //australia,
  ];

  const minCentroidDistance = 15;

  const rest = k - centroids.length;
  console.log("K", k);
  console.log("rest", rest);
  // let centroids = [];
  // for (let i = 0; i < rest; i++) {
  //   centroids.push(data[Math.floor(Math.random() * data.length)]);
  // }
  // debugger;
  const initialCentroidIndex = Math.floor(Math.random() * data.length);
  centroids.push(data[initialCentroidIndex]);

  while (centroids.length < k) {
    let maxDist = -1;
    let nextCentroid;

    for (const point of data) {
      const minDistances = centroids.map((centroid) =>
        euclideanDistance(point, centroid)
      );

      const minDistance = Math.min(...minDistances);

      if (minDistance > maxDist) {
        maxDist = minDistance;
        nextCentroid = point;
      }
    }

    centroids.push(nextCentroid);
  }

  // for (let i = 0; i < rest; i++) {
  //   let newCentroid;

  //   do {
  //     newCentroid = data[Math.floor(Math.random() * data.length)];
  //   } while (
  //     centroids.some(
  //       (centroid) =>
  //         euclideanDistance(newCentroid, centroid) < minCentroidDistance
  //     )
  //   );

  //   centroids.push(newCentroid);
  // }

  console.log("centeroids", centroids);
  for (let iteration = 0; iteration < maxIterations; iteration++) {
    // Assign each data point to the nearest centroid
    const clusters = new Array(k).fill().map(() => []);

    for (const point of data) {
      const distances = centroids.map((centroid) =>
        euclideanDistance(point, centroid)
      );
      // debugger;
      const closestClusterIndex = distances.indexOf(Math.min(...distances));
      // console.log(closestClusterIndex);
      clusters[closestClusterIndex].push(point);
    }

    // console.log("Clusters", clusters);

    // Calculate new centroids
    const newCentroids = clusters
      .filter((cluster) => cluster.length)
      .map((cluster) => calculateMean(cluster));

    // Check for convergence
    if (
      centroids.every(
        (centroid, i) => euclideanDistance(centroid, newCentroids[i]) < 0.001
      )
    ) {
      // console.log(centroids);
      // console.log(clusters);
      console.log(iteration);
      // console.log(iteration < maxIterations);
      let f = centroids.map((c, i) => {
        return {
          centroid: c,
          points: clusters[i],
        };
      });
      const res = {
        centroids,
        clusters: f,
        iteration,
        converge: iteration < maxIterations,
      };
      return res;
      // return clusters;
    }

    centroids = newCentroids;
  }

  return null; // Algorithm didn't converge within maxIterations
}

function euclideanDistance(point1, point2) {
  const squaredDistances = point1.map((coord, i) => (coord - point2[i]) ** 2);
  const sumOfSquaredDistances = squaredDistances.reduce(
    (acc, val) => acc + val,
    0
  );
  return Math.sqrt(sumOfSquaredDistances);
}

function calculateMean(points) {
  // debugger;
  const numDimensions = points[0].length;
  const mean = new Array(numDimensions).fill(0);

  for (const point of points) {
    for (let i = 0; i < numDimensions; i++) {
      mean[i] += point[i];
    }
  }

  for (let i = 0; i < numDimensions; i++) {
    mean[i] /= points.length;
  }

  return mean;
}
